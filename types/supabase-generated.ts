
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  pgboss: {
    Tables: {
      archive: {
        Row: {
          archived_on: string
          completed_on: string | null
          created_on: string
          data: Json | null
          dead_letter: string | null
          expire_in: unknown
          id: string
          keep_until: string
          name: string
          output: Json | null
          policy: string | null
          priority: number
          retry_backoff: boolean
          retry_count: number
          retry_delay: number
          retry_limit: number
          singleton_key: string | null
          singleton_on: string | null
          start_after: string
          started_on: string | null
          state: Database["pgboss"]["Enums"]["job_state"]
        }
        Insert: {
          archived_on?: string
          completed_on?: string | null
          created_on: string
          data?: Json | null
          dead_letter?: string | null
          expire_in: unknown
          id: string
          keep_until: string
          name: string
          output?: Json | null
          policy?: string | null
          priority: number
          retry_backoff: boolean
          retry_count: number
          retry_delay: number
          retry_limit: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after: string
          started_on?: string | null
          state: Database["pgboss"]["Enums"]["job_state"]
        }
        Update: {
          archived_on?: string
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name?: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Relationships: []
      }
      j3f168501ed9816b51a9f5765e0742e1eb034ab6bf72c9ae3f3a975e3: {
        Row: {
          completed_on: string | null
          created_on: string
          data: Json | null
          dead_letter: string | null
          expire_in: unknown
          id: string
          keep_until: string
          name: string
          output: Json | null
          policy: string | null
          priority: number
          retry_backoff: boolean
          retry_count: number
          retry_delay: number
          retry_limit: number
          singleton_key: string | null
          singleton_on: string | null
          start_after: string
          started_on: string | null
          state: Database["pgboss"]["Enums"]["job_state"]
        }
        Insert: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Update: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name?: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Relationships: [
          {
            foreignKeyName: "dlq_fkey"
            columns: ["dead_letter"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "q_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
        ]
      }
      j9abd9a35b5b26fedd527fe734a8913d3098970b18d7e8c5a8df5ecc9: {
        Row: {
          completed_on: string | null
          created_on: string
          data: Json | null
          dead_letter: string | null
          expire_in: unknown
          id: string
          keep_until: string
          name: string
          output: Json | null
          policy: string | null
          priority: number
          retry_backoff: boolean
          retry_count: number
          retry_delay: number
          retry_limit: number
          singleton_key: string | null
          singleton_on: string | null
          start_after: string
          started_on: string | null
          state: Database["pgboss"]["Enums"]["job_state"]
        }
        Insert: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Update: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name?: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Relationships: [
          {
            foreignKeyName: "dlq_fkey"
            columns: ["dead_letter"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "q_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
        ]
      }
      job: {
        Row: {
          completed_on: string | null
          created_on: string
          data: Json | null
          dead_letter: string | null
          expire_in: unknown
          id: string
          keep_until: string
          name: string
          output: Json | null
          policy: string | null
          priority: number
          retry_backoff: boolean
          retry_count: number
          retry_delay: number
          retry_limit: number
          singleton_key: string | null
          singleton_on: string | null
          start_after: string
          started_on: string | null
          state: Database["pgboss"]["Enums"]["job_state"]
        }
        Insert: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Update: {
          completed_on?: string | null
          created_on?: string
          data?: Json | null
          dead_letter?: string | null
          expire_in?: unknown
          id?: string
          keep_until?: string
          name?: string
          output?: Json | null
          policy?: string | null
          priority?: number
          retry_backoff?: boolean
          retry_count?: number
          retry_delay?: number
          retry_limit?: number
          singleton_key?: string | null
          singleton_on?: string | null
          start_after?: string
          started_on?: string | null
          state?: Database["pgboss"]["Enums"]["job_state"]
        }
        Relationships: []
      }
      queue: {
        Row: {
          created_on: string
          dead_letter: string | null
          expire_seconds: number | null
          name: string
          partition_name: string | null
          policy: string | null
          retention_minutes: number | null
          retry_backoff: boolean | null
          retry_delay: number | null
          retry_limit: number | null
          updated_on: string
        }
        Insert: {
          created_on?: string
          dead_letter?: string | null
          expire_seconds?: number | null
          name: string
          partition_name?: string | null
          policy?: string | null
          retention_minutes?: number | null
          retry_backoff?: boolean | null
          retry_delay?: number | null
          retry_limit?: number | null
          updated_on?: string
        }
        Update: {
          created_on?: string
          dead_letter?: string | null
          expire_seconds?: number | null
          name?: string
          partition_name?: string | null
          policy?: string | null
          retention_minutes?: number | null
          retry_backoff?: boolean | null
          retry_delay?: number | null
          retry_limit?: number | null
          updated_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "queue_dead_letter_fkey"
            columns: ["dead_letter"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
        ]
      }
      schedule: {
        Row: {
          created_on: string
          cron: string
          data: Json | null
          name: string
          options: Json | null
          timezone: string | null
          updated_on: string
        }
        Insert: {
          created_on?: string
          cron: string
          data?: Json | null
          name: string
          options?: Json | null
          timezone?: string | null
          updated_on?: string
        }
        Update: {
          created_on?: string
          cron?: string
          data?: Json | null
          name?: string
          options?: Json | null
          timezone?: string | null
          updated_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_name_fkey"
            columns: ["name"]
            isOneToOne: true
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
        ]
      }
      subscription: {
        Row: {
          created_on: string
          event: string
          name: string
          updated_on: string
        }
        Insert: {
          created_on?: string
          event: string
          name: string
          updated_on?: string
        }
        Update: {
          created_on?: string
          event?: string
          name?: string
          updated_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "queue"
            referencedColumns: ["name"]
          },
        ]
      }
      version: {
        Row: {
          cron_on: string | null
          maintained_on: string | null
          monitored_on: string | null
          version: number
        }
        Insert: {
          cron_on?: string | null
          maintained_on?: string | null
          monitored_on?: string | null
          version: number
        }
        Update: {
          cron_on?: string | null
          maintained_on?: string | null
          monitored_on?: string | null
          version?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_queue: {
        Args: {
          queue_name: string
          options: Json
        }
        Returns: undefined
      }
      delete_queue: {
        Args: {
          queue_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      job_state:
        | "created"
        | "retry"
        | "active"
        | "completed"
        | "cancelled"
        | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      entries: {
        Row: {
          created_at: string
          date: string
          text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          text?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      entry_src: {
        Row: {
          created_at: string
          date: string
          file_id: string
          path: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          file_id: string
          path?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          file_id?: string
          path?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entry_src_entries_fkey"
            columns: ["user_id", "date"]
            isOneToOne: false
            referencedRelation: "entries"
            referencedColumns: ["user_id", "date"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gen_entry_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_uid_jobs: {
        Args: {
          p_uid: string
        }
        Returns: {
          id: number
          name: string
          data: Json
          created_at: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
