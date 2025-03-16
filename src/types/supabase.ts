export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      competition_entries: {
        Row: {
          competition_id: string;
          created_at: string;
          id: string;
          status: string;
          submission_data: Json | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          competition_id: string;
          created_at?: string;
          id?: string;
          status?: string;
          submission_data?: Json | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          competition_id?: string;
          created_at?: string;
          id?: string;
          status?: string;
          submission_data?: Json | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "competition_entries_competition_id_fkey";
            columns: ["competition_id"];
            isOneToOne: false;
            referencedRelation: "competitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "competition_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      competitions: {
        Row: {
          category: string;
          created_at: string;
          deadline: string;
          difficulty: string;
          id: string;
          image_url: string;
          prize_value: string;
          requirements: string;
          rules: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          deadline: string;
          difficulty: string;
          id?: string;
          image_url: string;
          prize_value: string;
          requirements: string;
          rules: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          deadline?: string;
          difficulty?: string;
          id?: string;
          image_url?: string;
          prize_value?: string;
          requirements?: string;
          rules?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      saved_competitions: {
        Row: {
          competition_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          competition_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          competition_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "saved_competitions_competition_id_fkey";
            columns: ["competition_id"];
            isOneToOne: false;
            referencedRelation: "competitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "saved_competitions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          created_at: string | null;
          id: string;
          status: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          status: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          status?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database["public"];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName]["Row"]
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions]["Row"]
    : never;
