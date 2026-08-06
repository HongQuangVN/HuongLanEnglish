-- ============================================================
-- MIGRATION: chuyển từ "passcode ở client" sang Supabase Auth thật
-- Chạy đoạn này trong Supabase SQL Editor SAU KHI đã xử lý xong
-- lỗ hổng "anon can read submissions" (đã xóa ở bước trước).
-- ============================================================

-- 1. Dọn lại policy trùng lặp (2 policy INSERT cũ làm cùng 1 việc)
--    Giữ 1 cái, xóa cái thừa để dễ quản lý sau này.
DROP POLICY IF EXISTS "Cho phép nộp bài" ON submissions;

-- 2. Đảm bảo học sinh (chưa đăng nhập) vẫn insert được bài làm
--    (nếu policy "anon can insert submissions" từ trước vẫn còn thì
--    bước này không đổi gì, chỉ đảm bảo có nếu thiếu)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'submissions' AND policyname = 'anon can insert submissions'
  ) THEN
    CREATE POLICY "anon can insert submissions" ON submissions
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- 3. Policy SELECT MỚI — chỉ cho role "authenticated" (tức là đã
--    đăng nhập qua Supabase Auth) đọc, KHÔNG cho "anon" nữa.
--    Đây là thay thế đúng cách cho ô "nhập passcode" cũ.
CREATE POLICY "authenticated can read submissions" ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- SAU KHI CHẠY XONG: cần tạo 1 tài khoản giáo viên trong
-- Supabase Dashboard → Authentication → Users → Add user
-- (nhập email + mật khẩu thật, không phải "passcode2026" cũ)
-- rồi dùng chính email/mật khẩu đó để đăng nhập ở trang
-- /giao-vien/dang-nhap của ứng dụng Next.js mới.
-- ============================================================
