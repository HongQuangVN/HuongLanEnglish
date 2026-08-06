"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

// Trang này thay cho ô "Nhập mật khẩu" cũ (so sánh TEACHER_PASSCODE ở client).
// Giờ việc xác thực do SERVER CỦA SUPABASE xử lý qua signInWithPassword —
// không có chuỗi mật khẩu nào nằm trong code JS để ai đó F12 xem được nữa.
export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email hoặc mật khẩu không đúng.");
      return;
    }

    router.push("/giao-vien/ket-qua");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
      <div className="w-full rounded-3xl bg-white p-10 text-center shadow-lg">
        <h1 className="mb-2 text-xl font-bold">Khu vực giáo viên</h1>
        <p className="mb-6 text-sm text-gray-500">
          Đăng nhập để xem kết quả bài làm của học sinh.
        </p>

        <input
          type="email"
          placeholder="Email giáo viên"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-xl border-2 border-pink-100 px-4 py-3 text-center outline-none focus:border-pink-400"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="mb-4 w-full rounded-xl border-2 border-pink-100 px-4 py-3 text-center outline-none focus:border-pink-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full bg-pink-500 py-3 font-bold text-white shadow-md disabled:opacity-50"
        >
          {loading ? "Đang kiểm tra..." : "Vào xem"}
        </button>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
