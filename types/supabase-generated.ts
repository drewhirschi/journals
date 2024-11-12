
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  basejump: {
    Tables: {
      account_user: {
        Row: {
          account_id: string
          account_role: Database["basejump"]["Enums"]["account_role"]
          user_id: string
        }
        Insert: {
          account_id: string
          account_role: Database["basejump"]["Enums"]["account_role"]
          user_id: string
        }
        Update: {
          account_id?: string
          account_role?: Database["basejump"]["Enums"]["account_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_user_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string | null
          personal_account: boolean
          primary_owner_user_id: string
          private_metadata: Json | null
          public_metadata: Json | null
          slug: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string | null
          personal_account?: boolean
          primary_owner_user_id?: string
          private_metadata?: Json | null
          public_metadata?: Json | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string | null
          personal_account?: boolean
          primary_owner_user_id?: string
          private_metadata?: Json | null
          public_metadata?: Json | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      billing_customers: {
        Row: {
          account_id: string
          active: boolean | null
          email: string | null
          id: string
          provider: string | null
        }
        Insert: {
          account_id: string
          active?: boolean | null
          email?: string | null
          id: string
          provider?: string | null
        }
        Update: {
          account_id?: string
          active?: boolean | null
          email?: string | null
          id?: string
          provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_customers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_subscriptions: {
        Row: {
          account_id: string
          billing_customer_id: string
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          plan_name: string | null
          price_id: string | null
          provider: string | null
          quantity: number | null
          status: Database["basejump"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          account_id: string
          billing_customer_id: string
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          plan_name?: string | null
          price_id?: string | null
          provider?: string | null
          quantity?: number | null
          status?: Database["basejump"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          account_id?: string
          billing_customer_id?: string
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          plan_name?: string | null
          price_id?: string | null
          provider?: string | null
          quantity?: number | null
          status?: Database["basejump"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_subscriptions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_subscriptions_billing_customer_id_fkey"
            columns: ["billing_customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      config: {
        Row: {
          billing_provider: string | null
          enable_personal_account_billing: boolean | null
          enable_team_account_billing: boolean | null
          enable_team_accounts: boolean | null
        }
        Insert: {
          billing_provider?: string | null
          enable_personal_account_billing?: boolean | null
          enable_team_account_billing?: boolean | null
          enable_team_accounts?: boolean | null
        }
        Update: {
          billing_provider?: string | null
          enable_personal_account_billing?: boolean | null
          enable_team_account_billing?: boolean | null
          enable_team_accounts?: boolean | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          account_id: string
          account_name: string | null
          account_role: Database["basejump"]["Enums"]["account_role"]
          created_at: string | null
          id: string
          invitation_type: Database["basejump"]["Enums"]["invitation_type"]
          invited_by_user_id: string
          token: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          account_name?: string | null
          account_role: Database["basejump"]["Enums"]["account_role"]
          created_at?: string | null
          id?: string
          invitation_type: Database["basejump"]["Enums"]["invitation_type"]
          invited_by_user_id: string
          token?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          account_name?: string | null
          account_role?: Database["basejump"]["Enums"]["account_role"]
          created_at?: string | null
          id?: string
          invitation_type?: Database["basejump"]["Enums"]["invitation_type"]
          invited_by_user_id?: string
          token?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_token: {
        Args: {
          length: number
        }
        Returns: string
      }
      get_accounts_with_role: {
        Args: {
          passed_in_role?: Database["basejump"]["Enums"]["account_role"]
        }
        Returns: string[]
      }
      get_config: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_role_on_account: {
        Args: {
          account_id: string
          account_role?: Database["basejump"]["Enums"]["account_role"]
        }
        Returns: boolean
      }
      is_set: {
        Args: {
          field_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      account_role: "owner" | "member"
      invitation_type: "one_time" | "24_hour"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
          account_id: string
          content: string | null
          created_at: string
          date: string
        }
        Insert: {
          account_id: string
          content?: string | null
          created_at?: string
          date: string
        }
        Update: {
          account_id?: string
          content?: string | null
          created_at?: string
          date?: string
        }
        Relationships: []
      }
      entry_proposal: {
        Row: {
          account_id: string
          content: string | null
          created_at: string
          date: string
        }
        Insert: {
          account_id: string
          content?: string | null
          created_at?: string
          date: string
        }
        Update: {
          account_id?: string
          content?: string | null
          created_at?: string
          date?: string
        }
        Relationships: [
          {
            foreignKeyName: "entry_proposal_account_id_date_fkey"
            columns: ["account_id", "date"]
            isOneToOne: true
            referencedRelation: "entries"
            referencedColumns: ["account_id", "date"]
          },
        ]
      }
      entry_src: {
        Row: {
          account_id: string
          created_at: string
          date: string
          file_id: string
          path: string | null
        }
        Insert: {
          account_id: string
          created_at?: string
          date: string
          file_id: string
          path?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string
          date?: string
          file_id?: string
          path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entry_src_account_id_date_fkey"
            columns: ["account_id", "date"]
            isOneToOne: false
            referencedRelation: "entries"
            referencedColumns: ["account_id", "date"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invitation: {
        Args: {
          lookup_invitation_token: string
        }
        Returns: Json
      }
      create_account: {
        Args: {
          slug?: string
          name?: string
        }
        Returns: Json
      }
      create_invitation: {
        Args: {
          account_id: string
          account_role: Database["basejump"]["Enums"]["account_role"]
          invitation_type: Database["basejump"]["Enums"]["invitation_type"]
        }
        Returns: Json
      }
      current_user_account_role: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      delete_invitation: {
        Args: {
          invitation_id: string
        }
        Returns: undefined
      }
      gen_entry_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_account: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      get_account_billing_status: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      get_account_by_slug: {
        Args: {
          slug: string
        }
        Returns: Json
      }
      get_account_id: {
        Args: {
          slug: string
        }
        Returns: string
      }
      get_account_invitations: {
        Args: {
          account_id: string
          results_limit?: number
          results_offset?: number
        }
        Returns: Json
      }
      get_account_members: {
        Args: {
          account_id: string
          results_limit?: number
          results_offset?: number
        }
        Returns: Json
      }
      get_accounts: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_personal_account: {
        Args: Record<PropertyKey, never>
        Returns: Json
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
      lookup_invitation: {
        Args: {
          lookup_invitation_token: string
        }
        Returns: Json
      }
      remove_account_member: {
        Args: {
          account_id: string
          user_id: string
        }
        Returns: undefined
      }
      service_role_upsert_customer_subscription: {
        Args: {
          account_id: string
          customer?: Json
          subscription?: Json
        }
        Returns: undefined
      }
      update_account: {
        Args: {
          account_id: string
          slug?: string
          name?: string
          public_metadata?: Json
          replace_metadata?: boolean
        }
        Returns: Json
      }
      update_account_user_role: {
        Args: {
          account_id: string
          user_id: string
          new_account_role: Database["basejump"]["Enums"]["account_role"]
          make_primary_owner?: boolean
        }
        Returns: undefined
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
