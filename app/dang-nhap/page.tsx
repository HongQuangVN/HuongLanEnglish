"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-6 flex items-center gap-1.5 text-sm font-bold text-brand-wine hover:underline"
      >
        <ArrowLeft size={15} strokeWidth={2.5} />
        Về trang chủ
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-brand-sand bg-white p-8 text-center shadow-lg sm:p-10">
        <Image
          src="/brand/logo-header.jpg"
          alt="Hương Lan English"
          width={64}
          height={64}
          className="mx-auto h-16 w-16 rounded-full object-cover ring-4 ring-brand-cream-soft"
        />

        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-wine">
          <Lock size={13} strokeWidth={2.5} />
          Khu vực giáo viên
        </div>
        <h1 className="mt-2 text-xl font-black text-brand-navy">
          Đăng nhập để xem kết quả
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Theo dõi bài làm của học viên theo thời gian thực.
        </p>

        <div className="mt-7 space-y-3 text-left">
          <input
            type="email"
            placeholder="Email giáo viên"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-brand-sand px-4 py-3 text-center outline-none transition focus:border-brand-wine"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-xl border-2 border-brand-sand px-4 py-3 text-center outline-none transition focus:border-brand-wine"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-4 w-full rounded-full bg-brand-wine py-3 font-bold text-white shadow-md transition hover:bg-brand-wine-dark disabled:opacity-50"
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
