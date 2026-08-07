import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client này chạy TRÊN SERVER (trong API routes), KHÔNG BAO GIỜ gửi về browser.
// Vẫn dùng anon key (không phải service_role) để tôn trọng RLS —
// nếu học sinh chưa đăng nhập, RLS vẫn áp dụng đúng như bên client.
// Ưu điểm so với gọi Supabase trực tiếp từ browser: code chạy ở đây
// (ví dụ: đáp án đúng của bài tập) KHÔNG BAO GIỜ bị gửi xuống browser
// của học sinh trước khi họ nộp bài.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll được gọi từ Server Component - có thể bỏ qua nếu có
            // middleware refresh session riêng.
          }
        },
      },
    }
  );
}
