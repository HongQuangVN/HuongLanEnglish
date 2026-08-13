"use client";

import Link from "next/link";
import Image from "next/image";
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
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!testMenuOpen) return;
    function closeOnScrollOrResize() {
      setTestMenuOpen(false);
    }
    window.addEventListener("scroll", closeOnScrollOrResize, true);
    window.addEventListener("resize", closeOnScrollOrResize);
    return () => {
      window.removeEventListener("scroll", closeOnScrollOrResize, true);
      window.removeEventListener("resize", closeOnScrollOrResize);
    };
  }, [testMenuOpen]);

  function toggleTestMenu() {
    if (!testMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 256; // w-64
      let left = rect.left;
      if (left + menuWidth > window.innerWidth - 8) {
        left = window.innerWidth - menuWidth - 8;
      }
      setMenuPos({ top: rect.bottom + 4, left });
    }
    setTestMenuOpen((v) => !v);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar: logo + tagline + search + login */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/brand/logo-header.jpg"
              alt="Hương Lan English"
              width={48}
              height={48}
              priority
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#fbe1de] sm:h-12 sm:w-12"
            />
            <div className="leading-tight">
              <div className="text-base font-black text-[#1c2b39] sm:text-lg">
                Hương Lan
              </div>
              <div className="text-[10px] font-bold tracking-wide text-[#c0392b] sm:text-xs">
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
              href="/giao-vien/ket-qua.html"
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

      {/* Nav row — single scrollable row on mobile so it doesn't eat vertical space */}
      <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PLACEHOLDER_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="shrink-0 whitespace-nowrap px-4 py-3 text-sm font-bold text-[#1c2b39] transition hover:text-[#c0392b]"
          >
            {item.label}
          </a>
        ))}

        {/* Test online dropdown */}
        <div className="shrink-0" ref={menuRef}>
          <button
            ref={buttonRef}
            onClick={toggleTestMenu}
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
            <div
              className="fixed z-50 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              <Link
                href="/online-test"
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
              <Link
                href="/tests/field-notes-worksheet.html"
                className="block px-4 py-2.5 text-sm text-[#1c2b39] hover:bg-[#fbe1de] hover:text-[#c0392b]"
                onClick={() => setTestMenuOpen(false)}
              >
                📝 Field Notes
              </Link>
            </div>
          )}
        </div>

        {isTeacher && (
          <Link
            href="/giao-vien/ket-qua.html"
            className="shrink-0 whitespace-nowrap px-4 py-3 text-sm font-bold text-[#1c2b39] transition hover:text-[#c0392b]"
          >
            Kết quả test
          </Link>
        )}
      </nav>
    </header>
  );
}
