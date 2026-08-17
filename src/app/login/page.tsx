"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <AuthShell title="Welcome back" subtitle="Continue your 24-week journey to J2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-1">
          {loading && <Loader2 className="animate-spin" />}
          Log in
        </Button>
      </form>
      <Button variant="outline" className="mt-3 w-full" onClick={handleGoogle}>
        Continue with Google
      </Button>
      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
          Forgot password?
        </Link>
        <p className="text-muted-foreground">
          No account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
        <button
          type="button"
          onClick={() => {
            document.cookie = "bjt_guest_mode=1; path=/; max-age=86400";
            router.push("/dashboard");
          }}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Continue as guest →
        </button>
      </div>
    </AuthShell>
  );
}
