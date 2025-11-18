import { createClient } from "@/lib/supabase/server";
import ResponsiveSinglepage from "@/components/responsive-singlepage";

export default async function Page() {
  const supabase = await createClient();
  
  console.log("[v0] Fetching team members from database");
  const { data: teamMembers, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("[v0] Error fetching team members:", error);
  }

  console.log("[v0] Team members fetched:", teamMembers?.length || 0);

  return <ResponsiveSinglepage teamMembers={teamMembers || []} />;
}
