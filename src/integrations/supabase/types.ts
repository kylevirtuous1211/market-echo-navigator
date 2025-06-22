export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beauty_agent_simulations: {
        Row: {
          agent_concerns: string
          agent_demographics: Json
          agent_motivations: string
          agent_name: string
          agent_type: string
          brand_loyalty: number
          created_at: string
          feedback_categories: Json | null
          id: string
          price_sensitivity: number
          product_name: string
          purchase_intent: number
          recommendations: Json | null
          response_text: string
          risk_factors: string[] | null
          simulation_date: string
          simulation_id: string
        }
        Insert: {
          agent_concerns: string
          agent_demographics: Json
          agent_motivations: string
          agent_name: string
          agent_type: string
          brand_loyalty: number
          created_at?: string
          feedback_categories?: Json | null
          id?: string
          price_sensitivity: number
          product_name: string
          purchase_intent: number
          recommendations?: Json | null
          response_text: string
          risk_factors?: string[] | null
          simulation_date?: string
          simulation_id: string
        }
        Update: {
          agent_concerns?: string
          agent_demographics?: Json
          agent_motivations?: string
          agent_name?: string
          agent_type?: string
          brand_loyalty?: number
          created_at?: string
          feedback_categories?: Json | null
          id?: string
          price_sensitivity?: number
          product_name?: string
          purchase_intent?: number
          recommendations?: Json | null
          response_text?: string
          risk_factors?: string[] | null
          simulation_date?: string
          simulation_id?: string
        }
        Relationships: []
      }
      beauty_analysis_results: {
        Row: {
          analysis_data: Json | null
          analysis_type: string
          created_at: string
          id: string
          marketing_channels: string[] | null
          optimal_price_max: number | null
          optimal_price_min: number | null
          overall_intent: number | null
          product_name: string
          restock_recommendation_max: number | null
          restock_recommendation_min: number | null
          risk_factors: string[] | null
          success_probability: number | null
          target_segments: string[] | null
          total_demand: number | null
          updated_at: string
        }
        Insert: {
          analysis_data?: Json | null
          analysis_type: string
          created_at?: string
          id?: string
          marketing_channels?: string[] | null
          optimal_price_max?: number | null
          optimal_price_min?: number | null
          overall_intent?: number | null
          product_name: string
          restock_recommendation_max?: number | null
          restock_recommendation_min?: number | null
          risk_factors?: string[] | null
          success_probability?: number | null
          target_segments?: string[] | null
          total_demand?: number | null
          updated_at?: string
        }
        Update: {
          analysis_data?: Json | null
          analysis_type?: string
          created_at?: string
          id?: string
          marketing_channels?: string[] | null
          optimal_price_max?: number | null
          optimal_price_min?: number | null
          overall_intent?: number | null
          product_name?: string
          restock_recommendation_max?: number | null
          restock_recommendation_min?: number | null
          risk_factors?: string[] | null
          success_probability?: number | null
          target_segments?: string[] | null
          total_demand?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      beauty_products_history: {
        Row: {
          brand: string
          category: string
          certifications: string[] | null
          cost: number
          created_at: string
          description: string | null
          id: string
          ingredients: Json | null
          inventory_level: number | null
          launch_date: string | null
          life_cycle_months: number
          packaging_type: string | null
          price: number
          product_name: string
          profit_margin: number
          sales_velocity: number
          seasonal_factor: number | null
          skin_type: string | null
          subcategory: string | null
          target_age_group: string | null
          updated_at: string
        }
        Insert: {
          brand: string
          category: string
          certifications?: string[] | null
          cost: number
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: Json | null
          inventory_level?: number | null
          launch_date?: string | null
          life_cycle_months: number
          packaging_type?: string | null
          price: number
          product_name: string
          profit_margin: number
          sales_velocity: number
          seasonal_factor?: number | null
          skin_type?: string | null
          subcategory?: string | null
          target_age_group?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string
          category?: string
          certifications?: string[] | null
          cost?: number
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: Json | null
          inventory_level?: number | null
          launch_date?: string | null
          life_cycle_months?: number
          packaging_type?: string | null
          price?: number
          product_name?: string
          profit_margin?: number
          sales_velocity?: number
          seasonal_factor?: number | null
          skin_type?: string | null
          subcategory?: string | null
          target_age_group?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      beauty_sentiment_analysis: {
        Row: {
          analysis_date: string
          brand: string | null
          created_at: string
          demographic_data: Json | null
          hashtags: string[] | null
          id: string
          influencer_mentions: number | null
          keyword: string
          mention_count: number | null
          product_category: string | null
          regional_data: Json | null
          sentiment_label: string
          sentiment_score: number
          source: string
          trending_score: number | null
        }
        Insert: {
          analysis_date?: string
          brand?: string | null
          created_at?: string
          demographic_data?: Json | null
          hashtags?: string[] | null
          id?: string
          influencer_mentions?: number | null
          keyword: string
          mention_count?: number | null
          product_category?: string | null
          regional_data?: Json | null
          sentiment_label: string
          sentiment_score: number
          source: string
          trending_score?: number | null
        }
        Update: {
          analysis_date?: string
          brand?: string | null
          created_at?: string
          demographic_data?: Json | null
          hashtags?: string[] | null
          id?: string
          influencer_mentions?: number | null
          keyword?: string
          mention_count?: number | null
          product_category?: string | null
          regional_data?: Json | null
          sentiment_label?: string
          sentiment_score?: number
          source?: string
          trending_score?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
