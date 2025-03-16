import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get query parameters
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const difficulty = url.searchParams.get("difficulty");
    const prizeRange = url.searchParams.get("prizeRange");
    const deadline = url.searchParams.get("deadline");

    // Build the query
    let query = supabaseClient.from("competitions").select("*");

    // Apply filters if provided
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) throw error;

    // Apply client-side filtering for more complex filters
    let filteredData = data;

    // Filter by prize range if provided
    if (prizeRange && prizeRange !== "all") {
      filteredData = filteredData.filter((comp) => {
        const value = parseInt(comp.prize_value.replace(/[^0-9]/g, ""));
        if (prizeRange === "low") return value < 2000;
        if (prizeRange === "medium") return value >= 2000 && value < 5000;
        if (prizeRange === "high") return value >= 5000;
        return true;
      });
    }

    // Filter by deadline if provided
    if (deadline && deadline !== "all") {
      const now = new Date();
      const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      filteredData = filteredData.filter((comp) => {
        if (comp.deadline === "Ongoing") {
          return deadline === "later";
        }

        const date = new Date(comp.deadline);
        if (deadline === "week") return date <= oneWeek;
        if (deadline === "month") return date <= oneMonth && date > oneWeek;
        if (deadline === "later") return date > oneMonth;
        return true;
      });
    }

    return new Response(JSON.stringify(filteredData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
