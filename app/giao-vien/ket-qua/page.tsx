import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ResultsTable from "./ResultsTable";

// Server Component: chạy trên server TRƯỚC KHI gửi HTML về browser.
// Nếu chưa đăng nhập → redirect ngay, học sinh (hoặc bất kỳ ai chưa
// đăng nhập) sẽ KHÔNG BAO GIỜ nhận được HTML có chứa dữ liệu điểm số.
export default async function TeacherResultsPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/giao-vien/dang-nhap");
  }

  // RLS trên bảng submissions cần có policy SELECT cho phép
  // role authenticated đọc — xem hướng dẫn SQL migration đi kèm.
  const { data: submissions, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <p className="rounded-xl bg-red-50 p-4 text-red-600">
          Không tải được dữ liệu: {error.message}
          <br />
          <span className="text-sm">
            (Kiểm tra lại RLS policy SELECT cho role authenticated trên bảng
            submissions)
          </span>
        </p>
      </main>
    );
  }

  const total = submissions?.length ?? 0;
  const avgPercent = total
    ? Math.round(
        (submissions!.reduce(
          (sum, s) => sum + (s.max_score ? s.total_score / s.max_score : 0),
          0
        ) /
          total) *
          100
      )
    : 0;
  const uniqueStudents = new Set(
    (submissions || []).map((s) => (s.student_name || "").trim().toLowerCase())
  ).size;
  const bestPercent = total
    ? Math.max(
        ...submissions!.map((s) =>
          s.max_score ? Math.round((s.total_score / s.max_score) * 100) : 0
        )
      )
    : 0;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-400 p-8 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Kết quả bài làm học sinh</h1>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-pink-500">{total}</p>
          <p className="text-xs text-gray-500">Lượt nộp bài</p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-pink-500">{uniqueStudents}</p>
          <p className="text-xs text-gray-500">Học sinh</p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-pink-500">{avgPercent}%</p>
          <p className="text-xs text-gray-500">Điểm trung bình</p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-pink-500">{bestPercent}%</p>
          <p className="text-xs text-gray-500">Điểm cao nhất</p>
        </div>
      </div>

      <ResultsTable submissions={submissions || []} />
    </main>
  );
}
