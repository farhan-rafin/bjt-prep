# BJT Quest — Your 24-Week Journey to J2

A personal, interactive Business Japanese learning platform built from the *BJT J2 — 6-Month Business Japanese Training Program*. Target: **BJT J2, 420+**.

Not a static copy of the source document — the curriculum (24-week roadmap, the 16 fully-detailed Week 1–4 sessions, minute-by-minute Day 1, grammar/vocab/kanji/keigo content, BJT question-type strategy, resources, Japan missions, weekly tests, monthly checkpoints, final-8-weeks and final-30-day plans, and the master checklist) is parsed into structured TypeScript data in `src/content/` and rendered as a Duolingo/Notion/Anki-style interactive app with a Supabase backend for progress.

**No accounts.** This is a single-user personal app — there's no login/signup screen. On first load, the app silently opens an anonymous Supabase session (`supabase.auth.signInAnonymously()`) scoped by Row Level Security, and every page goes straight to the Dashboard. Progress persists across reloads on the same browser via the persisted Supabase session. See "Anonymous sign-in setup" below — it needs one toggle enabled in the Supabase dashboard.

## Tech stack

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, hand-built UI primitives (Radix UI primitives underneath) — no external component library, so the design system stays restrained and on-brand
- **Charts**: Recharts
- **Icons**: Lucide
- **Auth + Database**: Supabase (Postgres + Auth + Row Level Security)
- **Deployment**: Vercel

## Architecture

- **Curriculum content is static, typed data**, not database rows. See `src/content/*.ts` — each file maps to a part of the source document (roadmap, weeks 1–4 detail, grammar, vocabulary, kanji, keigo, scenarios, BJT question types, resources, missions, checkpoints, four-day time-boxed system). This keeps the curriculum fast, versioned in git, and trivially editable without a CMS.
- **User-generated data lives in Supabase**: progress per session, vocab/kanji/grammar learned-status, flashcards + SRS state, quiz attempts, weekly test results, mock test scores, mistake log, notes, mission progress, bookmarks, study logs, achievements, checklist state. Every table is RLS-locked to `auth.uid()`.
- **Practice vs official content is labelled.** Quiz questions generated from curriculum content (not literal source-document questions) are tagged `PRACTICE` in the UI; the two official Kanken/BJT books and the official CBT demo/sample links are tagged `OFFICIAL`; everything else is `EXTERNAL`.

## Project structure

```
src/
  app/                    Next.js routes
    (app)/                Authenticated app shell (sidebar + mobile nav)
      dashboard/ today/ journey/ vocabulary/ kanji/ grammar/ keigo/
      listening/ reading/ bjt/ flashcards/ tests/ mock-tests/ mistakes/
      missions/ resources/ notes/ progress/ countdown/ checklist/ settings/
    onboarding/
  components/             UI primitives + feature components
  content/                Curriculum data (source of truth), typed
  lib/                    Supabase clients, hooks, progress/session helpers, SRS, quiz generators
supabase/
  migrations/             SQL schema + RLS policies (applied to the live project already)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project's values (Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

These are the **publishable** URL and anon key — safe to expose client-side. Never put the `service_role` key in this app.

## Anonymous sign-in setup (required, one-time)

Supabase ships with Anonymous Sign-ins **disabled** by default. This app depends on it (see above), so before first use:

1. Supabase dashboard → your project → **Authentication → Sign In / Providers**.
2. Enable **Allow anonymous sign-ins**.
3. Reload the app. If it still shows "Couldn't start your session," it'll tell you what's wrong and offer a **Retry** button — no need to redeploy.

There's intentionally no sign-out button in the app: signing out of an anonymous session would abandon that browser's data (a fresh reload creates a brand-new anonymous user with nothing in it). Use Settings → **Data Export** to back up before clearing browser storage or switching devices/browsers, since anonymous sessions don't sync across them.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects straight to the Dashboard.

## Database setup (already applied to the linked Supabase project)

The schema in `supabase/migrations/00001_initial_schema.sql` and `00002_lock_down_handle_new_user.sql` creates all user-data tables with RLS, plus a trigger that creates a `profiles` row on signup. To apply it to a **different** Supabase project (e.g. after migrating off this one):

1. Create a new Supabase project.
2. Run the two migration files in `supabase/migrations/` against it, in order, via the SQL editor or `supabase db push`.
3. Update `.env.local` (and your Vercel project's environment variables) with the new project's URL/anon key.
4. Enable **Anonymous Sign-ins** in the new project's Auth settings (see below).

## Deployment (Vercel)

This repo is linked to a Vercel project (`bjt-quest`), production branch `main`. To finish wiring it up:

1. In the Vercel project → **Settings → Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same values as `.env.local`) for Production, Preview, and Development.
2. Push to `main` (or promote a deployment to Production from the dashboard).

## What's deliberately simplified for v1

- **PWA**: a `manifest.json` + icon are included for "Add to Home Screen," but there's no service-worker offline cache yet (the spec explicitly said this shouldn't block core functionality).
- **AI Tutor**: not implemented, by design — the app works with zero external AI API cost. The content/data model (separate curriculum content from user progress) is structured so a tutor could be layered on later.
- **Reading passages & some quiz banks** are labelled `PRACTICE` — generated from the curriculum's vocabulary/grammar/keigo/scenarios, since the source document describes what to practice without supplying a full official question bank (this mirrors the source document's own instruction on how to handle that gap).
- **Keigo bookmark/status** currently reuses the `grammar_status` table (keyed by keigo phrase id) rather than a dedicated table, to keep the schema smaller — functionally correct, just not perfectly named.

## Content fidelity

Every number, phrase, table, and link in `src/content/` was transcribed from the source document (24-week roadmap, Weeks 1–4 session-by-session detail, Day 1 minute-by-minute, grammar tiers, keigo phrase table, business scenarios, all 9 BJT question types, the verified resource/YouTube list with real URLs, the 24 Japan missions, weekly test spec + score bands, monthly checkpoints, mock test program, final-8-weeks allocation, final-30-day countdown, and the master checklist). Nothing was invented except explicitly-labelled `PRACTICE` quiz questions, per the source document's own instruction for that case.
