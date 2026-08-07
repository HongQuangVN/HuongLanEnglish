import { createBrowserClient } from "@supabase/ssr";

// Client này chạy TRONG BROWSER của người dùng.
// Dùng NEXT_PUBLIC_SUPABASE_ANON_KEY — key này được thiết kế để lộ ra ngoài,
// giống hệt config.js cũ. Cái bảo vệ dữ liệu thật là RLS trong Supabase,
// không phải việc giấu key này.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
