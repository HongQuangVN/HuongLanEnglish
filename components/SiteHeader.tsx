"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

const TEACHER_EMAIL = "huonglan.workspace@gmail.com";

const PLACEHOLDER_ITEMS = [
  { label: "Về chúng tôi", href: "#" },
  { label: "Khóa học TOEIC", href: "#" },
  { label: "Lịch khai giảng", href: "#" },
  { label: "Tự học", href: "#" },
  { label: "Khóa học video", href: "#" },
  { label: "Tin tức", href: "#" },
  { label: "Đăng ký tư vấn", href: "#" },
];

export default function SiteHeader() {
  const [testMenuOpen, setTestMenuOpen] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsTeacher(data.user?.email === TEACHER_EMAIL);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsTeacher(session?.user?.email === TEACHER_EMAIL);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setTestMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar: logo + tagline + search + login */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c0392b] text-lg font-black text-white">
              HL
            </div>
            <div className="leading-tight">
              <div className="text-lg font-black text-[#1c2b39]">
                Hương Lan
              </div>
              <div className="text-xs font-bold tracking-wide text-[#c0392b]">
                ENGLISH
              </div>
            </div>
          </Link>

          <p className="hidden flex-1 text-sm font-bold text-[#c0392b] sm:block md:text-base">
            Luyện đề Tiếng Anh online — nghe, nói, đọc, viết
          </p>

          <div className="hidden flex-1 max-w-xs items-center rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-400 lg:flex">
            Tìm kiếm...
          </div>

          {isTeacher ? (
            <Link
              href="/giao-vien/ket-qua"
              className="shrink-0 rounded-lg bg-[#1c2b39] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#13202b]"
            >
              Khu vực giáo viên
            </Link>
          ) : (
            <Link
              href="/dang-nhap"
              className="shrink-0 rounded-lg bg-[#fbe1de] px-5 py-2 text-sm font-bold text-[#c0392b] transition hover:bg-[#f6cac5]"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* Nav row */}
      <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6">
        {PLACEHOLDER_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="whitespace-nowrap px-4 py-3 text-sm font-bold text-[#1c2b39] transition hover:text-[#c0392b]"
          >
            {item.label}
          </a>
        ))}

        {/* Test online dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setTestMenuOpen((v) => !v)}
            className="flex items-center gap-1 whitespace-nowrap px-4 py-3 text-sm font-bold text-[#1c2b39] transition hover:text-[#c0392b]"
          >
            Test online
            <span
              className={`text-xs transition-transform ${testMenuOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {testMenuOpen && (
            <div className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
              <Link
                href="/online-test.html"
                className="block px-4 py-2.5 text-sm font-bold text-[#1c2b39] hover:bg-[#fbe1de] hover:text-[#c0392b]"
                onClick={() => setTestMenuOpen(false)}
              >
                📋 Tất cả đề thi
              </Link>
              <Link
                href="/tests/5-topics-worksheet.html"
                className="block px-4 py-2.5 text-sm text-[#1c2b39] hover:bg-[#fbe1de] hover:text-[#c0392b]"
                onClick={() => setTestMenuOpen(false)}
              >
                🎧 5 Topics
              </Link>
              <Link
                href="/tests/sports-benefits-worksheet.html"
                className="block px-4 py-2.5 text-sm text-[#1c2b39] hover:bg-[#fbe1de] hover:text-[#c0392b]"
                onClick={() => setTestMenuOpen(false)}
              >
                🏅 Sports Benefits
              </Link>
            </div>
          )}
        </div>

        {isTeacher && (
          <Link
            href="/giao-vien/ket-qua"
            className="whitespace-nowrap px-4 py-3 text-sm font-bold text-[#c0392b] transition hover:underline"
          >
            Kết quả test
          </Link>
        )}
      </nav>
    </header>
  );
}
