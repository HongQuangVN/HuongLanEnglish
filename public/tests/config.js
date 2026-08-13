// ============================================================
// ⚙️ CẤU HÌNH SUPABASE — chỉ cần sửa 2 dòng bên dưới
// ============================================================
// Lấy 2 giá trị này ở: supabase.com → mở project → Settings → API
//   - "Project URL"        -> điền vào SUPABASE_URL
//   - "anon public" key    -> điền vào SUPABASE_ANON_KEY
//
// LƯU Ý QUAN TRỌNG:
// Dùng đúng key "anon public", TUYỆT ĐỐI không dùng key "service_role"
// (key bí mật, có toàn quyền, bỏ qua mọi luật bảo mật) ở đây.
// Key "anon public" được thiết kế để lộ ra ngoài trình duyệt là bình
// thường — thứ thật sự bảo vệ dữ liệu là Row Level Security (RLS) đã
// được bật trong file supabase-schema.sql, không phải việc giấu key này.
// ============================================================

const SUPABASE_URL = "https://youyvaplxylaejhvoiya.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXl2YXBseHlsYWVqaHZvaXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDAxMDcsImV4cCI6MjEwMTQ3NjEwN30.C4lH3SlvA77Gvui3szSTociMgK_rBiq-322Cbtmh7f0";

// ---- Không cần sửa phần dưới đây ----

try {
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
  console.error("Không khởi tạo được Supabase client:", e);
  window.supabaseClient = null;
}

// Danh sách 5 chủ đề, dùng chung cho worksheet và trang kết quả
window.WORKSHEET_TOPICS = ["houses", "food", "firstjob", "travel", "shopping"];
