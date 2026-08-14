"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
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

const TEST_LINKS = [
  { label: "Tất cả đề thi", href: "/online-test" },
  { label: "5 Topics", href: "/tests/5-topics-worksheet.html" },
  { label: "Sports Benefits", href: "/tests/sports-benefits-worksheet.html" },
  { label: "Field Notes", href: "/tests/field-notes-worksheet.html" },
];

export default function SiteHeader() {
  const [testMenuOpen, setTestMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Khoá cuộn trang khi menu mobile đang mở, để trải nghiệm giống app hơn
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function toggleTestMenu() {
    if (!testMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 240;
      let left = rect.left;
      if (left + menuWidth > window.innerWidth - 8) {
        left = window.innerWidth - menuWidth - 8;
      }
      setMenuPos({ top: rect.bottom + 6, left });
    }
    setTestMenuOpen((v) => !v);
  }

  const teacherHref = "/giao-vien/ket-qua.html";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar: logo + tagline + search + login */}
      <div className="border-b border-brand-sand">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/brand/logo-header.jpg"
              alt="Hương Lan English"
              width={48}
              height={48}
              priority
              className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-cream-soft sm:h-11 sm:w-11"
            />
            <div className="leading-tight">
              <div className="text-sm font-black text-brand-navy sm:text-lg">
                Hương Lan
              </div>
              <div className="text-xs font-bold tracking-widest text-brand-wine">
                ENGLISH
              </div>
            </div>
          </Link>

          <p className="hidden flex-1 text-sm font-semibold text-brand-wine md:block">
            Luyện đề Tiếng Anh online — nghe, nói, đọc, viết
          </p>

          <div className="hidden flex-1 max-w-xs items-center gap-2 rounded-full border border-brand-sand px-4 py-2 text-sm text-gray-400 lg:flex">
            <Search size={16} strokeWidth={2} className="shrink-0" />
            Tìm kiếm...
          </div>

          {isTeacher ? (
            <Link
              href={teacherHref}
              className="shrink-0 rounded-lg bg-brand-navy px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-navy-hover sm:px-5 sm:text-sm"
            >
              <span className="hidden sm:inline">Khu vực giáo viên</span>
              <span className="sm:hidden">Giáo viên</span>
            </Link>
          ) : (
            <Link
              href="/dang-nhap"
              className="shrink-0 rounded-lg bg-brand-cream-soft px-3.5 py-2 text-xs font-bold text-brand-wine transition hover:bg-brand-cream-hover sm:px-5 sm:text-sm"
            >
              Đăng nhập
            </Link>
          )}

          {/* Nút mở menu — chỉ hiện trên mobile/tablet nhỏ */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-brand-navy hover:bg-brand-cream-soft md:hidden"
            aria-label="Mở menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Nav row — desktop: hàng ngang cuộn được; mobile: ẩn, dùng menu trượt thay thế */}
      <nav className="scrollbar-hide mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-6 md:flex">
        {PLACEHOLDER_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="shrink-0 whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-cream-soft hover:text-brand-wine"
          >
            {item.label}
          </a>
        ))}

        {/* Test online dropdown */}
        <div className="shrink-0" ref={menuRef}>
          <button
            ref={buttonRef}
            onClick={toggleTestMenu}
            className="flex items-center gap-1 whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-cream-soft hover:text-brand-wine"
          >
            Test online
            <ChevronDown
              size={15}
              strokeWidth={2.5}
              className={`transition-transform ${testMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {testMenuOpen && (
            <div
              className="fixed z-50 w-60 overflow-hidden rounded-xl border border-brand-sand bg-white py-1.5 shadow-lg"
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              {TEST_LINKS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="block px-4 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-cream-soft hover:text-brand-wine"
                  onClick={() => setTestMenuOpen(false)}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {isTeacher && (
          <Link
            href={teacherHref}
            className="shrink-0 whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-cream-soft hover:text-brand-wine"
          >
            Kết quả test
          </Link>
        )}
      </nav>

      {/* Menu mobile dạng panel trượt từ phải, thay cho nav cuộn ngang chật chội */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-sand px-5 py-4">
              <span className="text-sm font-bold text-brand-navy">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-brand-navy hover:bg-brand-cream-soft"
                aria-label="Đóng menu"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col px-2 py-3">
              {PLACEHOLDER_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-brand-navy hover:bg-brand-cream-soft"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-2 border-t border-brand-sand pt-2">
                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Test online
                </p>
                {TEST_LINKS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-brand-navy hover:bg-brand-cream-soft"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>

              {isTeacher && (
                <div className="mt-2 border-t border-brand-sand pt-2">
                  <Link
                    href={teacherHref}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-brand-wine hover:bg-brand-cream-soft"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kết quả test
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
