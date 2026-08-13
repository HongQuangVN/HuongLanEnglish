"use client";

import { useState } from "react";
import Link from "next/link";
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

    router.push("/giao-vien/ket-qua.html");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f3ec] px-6">
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 text-sm font-bold text-[#c0392b] hover:underline"
      >
        <span aria-hidden>←</span> Về trang chủ
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-[#e7ddc9] bg-white p-10 text-center shadow-lg">
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-[#c0392b] px-4 py-2 text-lg font-black text-white">
          Hương Lan English
        </div>
        <h1 className="mb-2 text-xl font-bold text-[#1c2b39]">
          Khu vực giáo viên
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Đăng nhập để xem kết quả bài làm của học viên.
        </p>

        <input
          type="email"
          placeholder="Email giáo viên"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-xl border-2 border-[#eee1c6] px-4 py-3 text-center outline-none focus:border-[#c0392b]"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="mb-4 w-full rounded-xl border-2 border-[#eee1c6] px-4 py-3 text-center outline-none focus:border-[#c0392b]"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full bg-[#c0392b] py-3 font-bold text-white shadow-md transition hover:bg-[#a5301f] disabled:opacity-50"
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
