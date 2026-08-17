"use client";
import * as React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const supabase = React.useMemo(() => createClient(), []);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/settings`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  }

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a reset link">
      {done ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-muted p-6 text-center text-sm text-muted-foreground">
          <CheckCircle2 className="size-8 text-success" />
          Check <span className="font-medium text-foreground">{email}</span> for a reset link.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary hover:underline">Back to login</Link>
      </p>
    </AuthShell>
  );
}
