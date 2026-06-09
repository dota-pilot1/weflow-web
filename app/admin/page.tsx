import { supabaseAdmin } from "@/lib/supabase/server";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "관리자 대시보드 | WEFLOW",
};

export default async function AdminPage() {
  const [{ data: reservations }, { data: inquiries }] = await Promise.all([
    supabaseAdmin
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      initialReservations={reservations ?? []}
      initialInquiries={inquiries ?? []}
    />
  );
}
