alter table public.session_progress add column if not exists current_step_index int default 0;
