"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push("/onboarding");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <AuthShell title="Check your email" subtitle="Confirm your address to start studying">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-muted p-6 text-center text-sm text-muted-foreground">
          <CheckCircle2 className="size-8 text-success" />
          We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Click it to
          activate your account.
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Start your journey" subtitle="24 weeks. Target: BJT J2, 420+.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password (min 6 characters)"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-1">
          {loading && <Loader2 className="animate-spin" />}
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
      </p>
    </AuthShell>
  );
}
