export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged: boolean | null
          created_at: string
          description: string | null
          g_force: number | null
          id: string
          latitude: number | null
          longitude: number | null
          severity: Database["public"]["Enums"]["alert_severity"]
          speed: number | null
          timestamp: string
          trip_id: string
          type: Database["public"]["Enums"]["alert_type"]
          user_id: string
        }
        Insert: {
          acknowledged?: boolean | null
          created_at?: string
          description?: string | null
          g_force?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          severity: Database["public"]["Enums"]["alert_severity"]
          speed?: number | null
          timestamp?: string
          trip_id: string
          type: Database["public"]["Enums"]["alert_type"]
          user_id: string
        }
        Update: {
          acknowledged?: boolean | null
          created_at?: string
          description?: string | null
          g_force?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          speed?: number | null
          timestamp?: string
          trip_id?: string
          type?: Database["public"]["Enums"]["alert_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean | null
          name: string
          phone: string
          relationship: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          name: string
          phone: string
          relationship?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string
          relationship?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sensor_logs: {
        Row: {
          acceleration_x: number | null
          acceleration_y: number | null
          acceleration_z: number | null
          gyro_x: number | null
          gyro_y: number | null
          gyro_z: number | null
          id: string
          latitude: number | null
          longitude: number | null
          speed: number | null
          timestamp: string
          trip_id: string
        }
        Insert: {
          acceleration_x?: number | null
          acceleration_y?: number | null
          acceleration_z?: number | null
          gyro_x?: number | null
          gyro_y?: number | null
          gyro_z?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          speed?: number | null
          timestamp?: string
          trip_id: string
        }
        Update: {
          acceleration_x?: number | null
          acceleration_y?: number | null
          acceleration_z?: number | null
          gyro_x?: number | null
          gyro_y?: number | null
          gyro_z?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          speed?: number | null
          timestamp?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensor_logs_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          avg_speed: number | null
          created_at: string
          distance_km: number | null
          duration_minutes: number | null
          end_location: string | null
          end_time: string | null
          id: string
          max_speed: number | null
          start_location: string | null
          start_time: string
          status: Database["public"]["Enums"]["trip_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avg_speed?: number | null
          created_at?: string
          distance_km?: number | null
          duration_minutes?: number | null
          end_location?: string | null
          end_time?: string | null
          id?: string
          max_speed?: number | null
          start_location?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["trip_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avg_speed?: number | null
          created_at?: string
          distance_km?: number | null
          duration_minutes?: number | null
          end_location?: string | null
          end_time?: string | null
          id?: string
          max_speed?: number | null
          start_location?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["trip_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_type:
        | "distraction"
        | "speeding"
        | "harsh_braking"
        | "sharp_turn"
        | "accident"
      trip_status: "active" | "completed" | "emergency"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      alert_type: [
        "distraction",
        "speeding",
        "harsh_braking",
        "sharp_turn",
        "accident",
      ],
      trip_status: ["active", "completed", "emergency"],
    },
  },
} as const
