export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      achievements: {
        Row: { achievement_key: string; id: string; unlocked_at: string | null; user_id: string }
        Insert: { achievement_key: string; id?: string; unlocked_at?: string | null; user_id: string }
        Update: { achievement_key?: string; id?: string; unlocked_at?: string | null; user_id?: string }
        Relationships: []
      }
      bookmarks: {
        Row: { created_at: string | null; id: string; item_id: string; item_type: string; user_id: string }
        Insert: { created_at?: string | null; id?: string; item_id: string; item_type: string; user_id: string }
        Update: { created_at?: string | null; id?: string; item_id?: string; item_type?: string; user_id?: string }
        Relationships: []
      }
      checklist_status: {
        Row: { id: string; is_checked: boolean | null; item_id: string; updated_at: string | null; user_id: string }
        Insert: { id?: string; is_checked?: boolean | null; item_id: string; updated_at?: string | null; user_id: string }
        Update: { id?: string; is_checked?: boolean | null; item_id?: string; updated_at?: string | null; user_id?: string }
        Relationships: []
      }
      flashcard_reviews: {
        Row: { flashcard_id: string; id: string; rating: string; reviewed_at: string | null; user_id: string }
        Insert: { flashcard_id: string; id?: string; rating: string; reviewed_at?: string | null; user_id: string }
        Update: { flashcard_id?: string; id?: string; rating?: string; reviewed_at?: string | null; user_id?: string }
        Relationships: []
      }
      flashcards: {
        Row: {
          back: string; created_at: string | null; due_at: string | null; ease: number | null
          example: string | null; front: string; id: string; interval_days: number | null
          is_starred: boolean | null; repetitions: number | null; source_id: string
          source_type: string; state: string | null; user_id: string
        }
        Insert: {
          back: string; created_at?: string | null; due_at?: string | null; ease?: number | null
          example?: string | null; front: string; id?: string; interval_days?: number | null
          is_starred?: boolean | null; repetitions?: number | null; source_id: string
          source_type: string; state?: string | null; user_id: string
        }
        Update: {
          back?: string; created_at?: string | null; due_at?: string | null; ease?: number | null
          example?: string | null; front?: string; id?: string; interval_days?: number | null
          is_starred?: boolean | null; repetitions?: number | null; source_id?: string
          source_type?: string; state?: string | null; user_id?: string
        }
        Relationships: []
      }
      grammar_status: {
        Row: { grammar_id: string; id: string; is_bookmarked: boolean | null; status: string | null; updated_at: string | null; user_id: string }
        Insert: { grammar_id: string; id?: string; is_bookmarked?: boolean | null; status?: string | null; updated_at?: string | null; user_id: string }
        Update: { grammar_id?: string; id?: string; is_bookmarked?: boolean | null; status?: string | null; updated_at?: string | null; user_id?: string }
        Relationships: []
      }
      kanji_status: {
        Row: { id: string; is_bookmarked: boolean | null; kanji_id: string; status: string | null; updated_at: string | null; user_id: string }
        Insert: { id?: string; is_bookmarked?: boolean | null; kanji_id: string; status?: string | null; updated_at?: string | null; user_id: string }
        Update: { id?: string; is_bookmarked?: boolean | null; kanji_id?: string; status?: string | null; updated_at?: string | null; user_id?: string }
        Relationships: []
      }
      listening_workflow_logs: {
        Row: {
          created_at: string | null; difficulty: string | null; id: string; key_info: Json | null
          resource_id: string | null; situation_notes: string | null; speaker_notes: string | null
          unknown_words: string | null; user_id: string; week: number | null
        }
        Insert: {
          created_at?: string | null; difficulty?: string | null; id?: string; key_info?: Json | null
          resource_id?: string | null; situation_notes?: string | null; speaker_notes?: string | null
          unknown_words?: string | null; user_id: string; week?: number | null
        }
        Update: {
          created_at?: string | null; difficulty?: string | null; id?: string; key_info?: Json | null
          resource_id?: string | null; situation_notes?: string | null; speaker_notes?: string | null
          unknown_words?: string | null; user_id?: string; week?: number | null
        }
        Relationships: []
      }
      mission_progress: {
        Row: { completed_at: string | null; id: string; is_completed: boolean | null; japanese_heard: string | null; observation: string | null; user_id: string; week: number }
        Insert: { completed_at?: string | null; id?: string; is_completed?: boolean | null; japanese_heard?: string | null; observation?: string | null; user_id: string; week: number }
        Update: { completed_at?: string | null; id?: string; is_completed?: boolean | null; japanese_heard?: string | null; observation?: string | null; user_id?: string; week?: number }
        Relationships: []
      }
      mistakes: {
        Row: {
          correct_answer: string | null; created_at: string | null; error_category: string; id: string
          is_resolved: boolean | null; my_answer: string | null; question: string | null
          question_type: string | null; review_again_on: string | null; user_id: string
          week: number | null; what_learned: string | null; why_wrong: string | null
        }
        Insert: {
          correct_answer?: string | null; created_at?: string | null; error_category: string; id?: string
          is_resolved?: boolean | null; my_answer?: string | null; question?: string | null
          question_type?: string | null; review_again_on?: string | null; user_id: string
          week?: number | null; what_learned?: string | null; why_wrong?: string | null
        }
        Update: {
          correct_answer?: string | null; created_at?: string | null; error_category?: string; id?: string
          is_resolved?: boolean | null; my_answer?: string | null; question?: string | null
          question_type?: string | null; review_again_on?: string | null; user_id?: string
          week?: number | null; what_learned?: string | null; why_wrong?: string | null
        }
        Relationships: []
      }
      mock_tests: {
        Row: {
          created_at: string | null; id: string; notes: string | null; part1_score: number | null
          part2_score: number | null; part3_score: number | null; score_type: string; test_date: string
          time_taken_minutes: number | null; total_score: number | null; user_id: string
        }
        Insert: {
          created_at?: string | null; id?: string; notes?: string | null; part1_score?: number | null
          part2_score?: number | null; part3_score?: number | null; score_type?: string; test_date?: string
          time_taken_minutes?: number | null; total_score?: number | null; user_id: string
        }
        Update: {
          created_at?: string | null; id?: string; notes?: string | null; part1_score?: number | null
          part2_score?: number | null; part3_score?: number | null; score_type?: string; test_date?: string
          time_taken_minutes?: number | null; total_score?: number | null; user_id?: string
        }
        Relationships: []
      }
      monthly_checkpoint_results: {
        Row: { id: string; month: number; recorded_at: string | null; self_assessment: Json | null; status: string | null; user_id: string }
        Insert: { id?: string; month: number; recorded_at?: string | null; self_assessment?: Json | null; status?: string | null; user_id: string }
        Update: { id?: string; month?: number; recorded_at?: string | null; self_assessment?: Json | null; status?: string | null; user_id?: string }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null; created_at: string | null; fields: Json | null; id: string
          linked_id: string | null; linked_type: string | null; note_type: string; updated_at: string | null; user_id: string
        }
        Insert: {
          content?: string | null; created_at?: string | null; fields?: Json | null; id?: string
          linked_id?: string | null; linked_type?: string | null; note_type?: string; updated_at?: string | null; user_id: string
        }
        Update: {
          content?: string | null; created_at?: string | null; fields?: Json | null; id?: string
          linked_id?: string | null; linked_type?: string | null; note_type?: string; updated_at?: string | null; user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null; exam_date: string | null; explanation_language: string | null; id: string
          name: string | null; onboarded: boolean | null; program_start_date: string | null; session_duration: number | null
          show_furigana: boolean | null; study_days: number[] | null; target_level: string | null
          target_score: number | null; theme: string | null; updated_at: string | null
        }
        Insert: {
          created_at?: string | null; exam_date?: string | null; explanation_language?: string | null; id: string
          name?: string | null; onboarded?: boolean | null; program_start_date?: string | null; session_duration?: number | null
          show_furigana?: boolean | null; study_days?: number[] | null; target_level?: string | null
          target_score?: number | null; theme?: string | null; updated_at?: string | null
        }
        Update: {
          created_at?: string | null; exam_date?: string | null; explanation_language?: string | null; id?: string
          name?: string | null; onboarded?: boolean | null; program_start_date?: string | null; session_duration?: number | null
          show_furigana?: boolean | null; study_days?: number[] | null; target_level?: string | null
          target_score?: number | null; theme?: string | null; updated_at?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: { category: string | null; created_at: string | null; id: string; is_correct: boolean; question_id: string | null; quiz_id: string | null; quiz_type: string; user_id: string; week: number | null }
        Insert: { category?: string | null; created_at?: string | null; id?: string; is_correct: boolean; question_id?: string | null; quiz_id?: string | null; quiz_type: string; user_id: string; week?: number | null }
        Update: { category?: string | null; created_at?: string | null; id?: string; is_correct?: boolean; question_id?: string | null; quiz_id?: string | null; quiz_type?: string; user_id?: string; week?: number | null }
        Relationships: []
      }
      reading_timings: {
        Row: { accuracy_pct: number | null; completion_seconds: number; created_at: string | null; id: string; passage_id: string; user_id: string; words_per_minute: number | null }
        Insert: { accuracy_pct?: number | null; completion_seconds: number; created_at?: string | null; id?: string; passage_id: string; user_id: string; words_per_minute?: number | null }
        Update: { accuracy_pct?: number | null; completion_seconds?: number; created_at?: string | null; id?: string; passage_id?: string; user_id?: string; words_per_minute?: number | null }
        Relationships: []
      }
      session_progress: {
        Row: {
          actual_minutes: number | null; completed_at: string | null; completed_tasks: string[] | null; day: number
          duration_choice: number | null; id: string; notes: string | null; planned_minutes: number | null
          started_at: string | null; status: string; updated_at: string | null; user_id: string; week: number; xp_earned: number | null
        }
        Insert: {
          actual_minutes?: number | null; completed_at?: string | null; completed_tasks?: string[] | null; day: number
          duration_choice?: number | null; id?: string; notes?: string | null; planned_minutes?: number | null
          started_at?: string | null; status?: string; updated_at?: string | null; user_id: string; week: number; xp_earned?: number | null
        }
        Update: {
          actual_minutes?: number | null; completed_at?: string | null; completed_tasks?: string[] | null; day?: number
          duration_choice?: number | null; id?: string; notes?: string | null; planned_minutes?: number | null
          started_at?: string | null; status?: string; updated_at?: string | null; user_id?: string; week?: number; xp_earned?: number | null
        }
        Relationships: []
      }
      study_logs: {
        Row: { activity_type: string | null; created_at: string | null; day: number | null; id: string; log_date: string; minutes: number; user_id: string; week: number | null; xp: number | null }
        Insert: { activity_type?: string | null; created_at?: string | null; day?: number | null; id?: string; log_date?: string; minutes?: number; user_id: string; week?: number | null; xp?: number | null }
        Update: { activity_type?: string | null; created_at?: string | null; day?: number | null; id?: string; log_date?: string; minutes?: number; user_id?: string; week?: number | null; xp?: number | null }
        Relationships: []
      }
      vocab_status: {
        Row: { id: string; is_bookmarked: boolean | null; status: string | null; updated_at: string | null; user_id: string; vocab_id: string }
        Insert: { id?: string; is_bookmarked?: boolean | null; status?: string | null; updated_at?: string | null; user_id: string; vocab_id: string }
        Update: { id?: string; is_bookmarked?: boolean | null; status?: string | null; updated_at?: string | null; user_id?: string; vocab_id?: string }
        Relationships: []
      }
      weekly_tests: {
        Row: { band: string | null; breakdown: Json | null; id: string; score_pct: number; taken_at: string | null; user_id: string; week: number }
        Insert: { band?: string | null; breakdown?: Json | null; id?: string; score_pct: number; taken_at?: string | null; user_id: string; week: number }
        Update: { band?: string | null; breakdown?: Json | null; id?: string; score_pct?: number; taken_at?: string | null; user_id?: string; week?: number }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type DefaultSchema = Database["public"]
export type Tables<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Update"]
