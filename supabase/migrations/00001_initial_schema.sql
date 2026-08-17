-- BJT Quest schema: user-generated data only (curriculum content lives in app code).
-- Every table is owned by a single user and locked down with RLS.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text default 'Learner',
  target_level text default 'J2',
  target_score int default 420,
  exam_date date,
  study_days int[] default '{1,3,5,0}', -- 0=Sun..6=Sat, default Mon/Wed/Fri/Sun
  session_duration int default 3, -- hours: 2,3,4,5
  onboarded boolean default false,
  theme text default 'system',
  show_furigana boolean default true,
  explanation_language text default 'english',
  program_start_date date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.session_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  week int not null,
  day int not null,
  status text not null default 'not_started', -- not_started | in_progress | completed
  duration_choice int default 3,
  planned_minutes int,
  actual_minutes int default 0,
  completed_tasks text[] default '{}',
  xp_earned int default 0,
  notes text,
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique(user_id, week, day)
);

create table if not exists public.vocab_status (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  vocab_id text not null,
  status text default 'new', -- new | learning | learned | difficult
  is_bookmarked boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, vocab_id)
);

create table if not exists public.kanji_status (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  kanji_id text not null,
  status text default 'new', -- new | learning | learned | difficult
  is_bookmarked boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, kanji_id)
);

create table if not exists public.grammar_status (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  grammar_id text not null,
  status text default 'new', -- new | learned
  is_bookmarked boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, grammar_id)
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  source_type text not null, -- vocab | kanji | grammar | keigo | phrase | listening
  source_id text not null,
  front text not null,
  back text not null,
  example text,
  is_starred boolean default false,
  interval_days numeric default 0,
  ease numeric default 2.5,
  repetitions int default 0,
  due_at timestamptz default now(),
  state text default 'new', -- new | young | mature | difficult
  created_at timestamptz default now(),
  unique(user_id, source_type, source_id)
);

create table if not exists public.flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  flashcard_id uuid references public.flashcards(id) on delete cascade not null,
  rating text not null, -- again | hard | good | easy
  reviewed_at timestamptz default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  quiz_type text not null, -- grammar | keigo | scenario | bjt_practice | weekly_test
  quiz_id text,
  question_id text,
  is_correct boolean not null,
  week int,
  category text,
  created_at timestamptz default now()
);

create table if not exists public.weekly_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  week int not null,
  score_pct numeric not null,
  band text,
  breakdown jsonb default '{}',
  taken_at timestamptz default now(),
  unique(user_id, week)
);

create table if not exists public.monthly_checkpoint_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  month int not null,
  self_assessment jsonb default '{}',
  status text, -- on_track | mostly_on_track | behind
  recorded_at timestamptz default now(),
  unique(user_id, month)
);

create table if not exists public.mock_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  test_date date not null default current_date,
  score_type text not null default 'estimated_bjt', -- raw_percentage | estimated_bjt | actual_bjt
  total_score numeric,
  part1_score numeric,
  part2_score numeric,
  part3_score numeric,
  time_taken_minutes int,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  week int,
  question_type text,
  question text,
  my_answer text,
  correct_answer text,
  error_category text not null,
  why_wrong text,
  what_learned text,
  review_again_on date,
  is_resolved boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  note_type text not null default 'general', -- grammar | vocabulary | phrase | general
  linked_type text,
  linked_id text,
  fields jsonb default '{}',
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.mission_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  week int not null,
  is_completed boolean default false,
  observation text,
  japanese_heard text,
  completed_at timestamptz,
  unique(user_id, week)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  item_type text not null, -- lesson | phrase | vocabulary | grammar | kanji | resource
  item_id text not null,
  created_at timestamptz default now(),
  unique(user_id, item_type, item_id)
);

create table if not exists public.study_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  week int,
  day int,
  log_date date not null default current_date,
  minutes int not null default 0,
  xp int default 0,
  activity_type text,
  created_at timestamptz default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  achievement_key text not null,
  unlocked_at timestamptz default now(),
  unique(user_id, achievement_key)
);

create table if not exists public.checklist_status (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  item_id text not null,
  is_checked boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, item_id)
);

create table if not exists public.listening_workflow_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resource_id text,
  week int,
  situation_notes text,
  speaker_notes text,
  key_info jsonb default '{}',
  unknown_words text,
  difficulty text, -- easy | medium | hard
  created_at timestamptz default now()
);

create table if not exists public.reading_timings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  passage_id text not null,
  completion_seconds int not null,
  accuracy_pct numeric,
  words_per_minute numeric,
  created_at timestamptz default now()
);

-- Row Level Security: every table restricted to its owning user.
alter table public.profiles enable row level security;
alter table public.session_progress enable row level security;
alter table public.vocab_status enable row level security;
alter table public.kanji_status enable row level security;
alter table public.grammar_status enable row level security;
alter table public.flashcards enable row level security;
alter table public.flashcard_reviews enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.weekly_tests enable row level security;
alter table public.monthly_checkpoint_results enable row level security;
alter table public.mock_tests enable row level security;
alter table public.mistakes enable row level security;
alter table public.notes enable row level security;
alter table public.mission_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.study_logs enable row level security;
alter table public.achievements enable row level security;
alter table public.checklist_status enable row level security;
alter table public.listening_workflow_logs enable row level security;
alter table public.reading_timings enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own session_progress" on public.session_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own vocab_status" on public.vocab_status for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own kanji_status" on public.kanji_status for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own grammar_status" on public.grammar_status for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own flashcards" on public.flashcards for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own flashcard_reviews" on public.flashcard_reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own quiz_attempts" on public.quiz_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own weekly_tests" on public.weekly_tests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own monthly_checkpoint_results" on public.monthly_checkpoint_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mock_tests" on public.mock_tests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mistakes" on public.mistakes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own notes" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mission_progress" on public.mission_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own bookmarks" on public.bookmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own study_logs" on public.study_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own achievements" on public.achievements for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own checklist_status" on public.checklist_status for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own listening_workflow_logs" on public.listening_workflow_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own reading_timings" on public.reading_timings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Learner'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
