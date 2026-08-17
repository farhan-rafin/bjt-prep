"use client";
import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";

type Profile = Tables<"profiles">;

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authError: string | null;
  retryAutoLogin: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = React.useMemo(() => createClient(), []);
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const loadProfile = React.useCallback(
    async (uid: string) => {
      const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      setProfile(data ?? null);
    },
    [supabase],
  );

  // Single-user personal app: silently provision an anonymous session instead of showing a
  // login/signup screen. Data still persists across reloads on this device via the persisted
  // Supabase session, and is fully RLS-scoped to this user.
  const autoLogin = React.useCallback(async () => {
    setAuthError(null);
    const { data: anon, error } = await supabase.auth.signInAnonymously();
    if (error) {
      setAuthError(error.message);
      return;
    }
    if (anon.user) {
      setUser(anon.user);
      await loadProfile(anon.user.id);
    }
  }, [supabase, loadProfile]);

  React.useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!mounted) return;
      if (data.user) {
        setUser(data.user);
        await loadProfile(data.user.id);
        setLoading(false);
        return;
      }
      await autoLogin();
      if (!mounted) return;
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      else setProfile(null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, loadProfile]);

  const refreshProfile = React.useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  const updateProfile = React.useCallback(
    async (patch: Partial<Profile>) => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .update(patch)
        .eq("id", user.id)
        .select()
        .single();
      if (data) setProfile(data);
    },
    [user, supabase],
  );

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, authError, retryAutoLogin: autoLogin, refreshProfile, updateProfile, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
