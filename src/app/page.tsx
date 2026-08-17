import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { bjtKeyFacts } from "@/content";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-5 lg:px-10">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Log in
          </Link>
          <Button asChild size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <span className="jp mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
          ビジネス日本語能力テスト · J2 対策
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Your 24-Week Journey to <span className="text-primary">J2</span>
        </h1>
        <p className="mt-5 max-w-xl text-balance text-muted-foreground">
          A personal learning operating system built from your BJT J2 six-month program — lessons, flashcards,
          quizzes, mock tests, and a mistake log that drives what you study next. Target: BJT J2, {bjtKeyFacts.j2Range[0]}+.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">Start your journey</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">I already have an account</Link>
          </Button>
        </div>
        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-4 text-left sm:grid-cols-4">
          {[
            { label: "Weeks", value: "24" },
            { label: "Study days / week", value: "4" },
            { label: "Business words", value: "~1,800" },
            { label: "Target score", value: "420+" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
