import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileText,
  Headphones,
  Trophy,
  NotebookPen,
  BookOpen,
  Target,
  type LucideIcon,
} from "lucide-react";
import { getTestCards } from "@/lib/tests-scanner";

export const metadata = {
  title: "Đề thi trực tuyến",
};

// Luôn quét lại thư mục public/tests/ mỗi lần có request, để bài test mới
// thêm vào (hoặc xoá đi) xuất hiện ngay mà không cần rebuild thủ công.
export const dynamic = "force-dynamic";

// Tra tên icon (khai báo dạng string trong tests-meta.json, hoặc mặc định
// "FileText") sang component Lucide thực sự. Thêm icon mới ở đây khi cần
// dùng tên khác trong tests-meta.json.
const ICONS: Record<string, LucideIcon> = {
  FileText,
  Headphones,
  Trophy,
  NotebookPen,
  BookOpen,
  Target,
};

function resolveIcon(name: string): LucideIcon {
  return ICONS[name] || FileText;
}

export default function OnlineTestPage() {
  const { real, comingSoon } = getTestCards();

  return (
    <main className="min-h-screen bg-brand-cream text-brand-navy">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-6">
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-wine text-sm text-white">
              HL
            </span>
            Hương Lan English
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-brand-wine hover:underline"
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
            Về trang chủ
          </Link>
        </div>

        <div className="mb-8 flex items-center gap-2.5 rounded-2xl border border-brand-sand bg-white p-4 shadow-sm sm:mb-9">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-cream-soft text-brand-wine">
            <ClipboardList size={18} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-brand-navy sm:text-base">
              Đề thi trên máy
            </p>
            <p className="text-xs text-gray-500">
              Làm bài trực tiếp, chấm điểm tự động ngay khi nộp
            </p>
          </div>
        </div>

        <div className="mb-8 text-center sm:mb-10">
          <h2 className="inline-block border-b-2 border-brand-wine pb-2.5 text-xl font-black sm:text-2xl">
            Đề thi miễn phí
          </h2>
        </div>

        {real.length === 0 && comingSoon.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Chưa có đề thi nào. Thêm file .html vào thư mục public/tests/ để
            hiển thị tại đây.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {real.map((t) => {
              const Icon = resolveIcon(t.icon);
              return (
                <Link
                  key={t.slug}
                  href={t.href}
                  className="group flex min-w-0 flex-col rounded-2xl border border-brand-sand bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="mb-1.5 flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-cream-soft text-brand-wine">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <h3 className="m-0 min-w-0 text-base font-extrabold leading-snug">
                      {t.title}
                    </h3>
                  </div>
                  {t.desc && (
                    <p className="mb-4 ml-12 text-sm leading-relaxed text-gray-500">
                      {t.desc}
                    </p>
                  )}
                  <div className="mb-4 flex flex-wrap gap-2 rounded-xl bg-brand-cream-soft px-4 py-3.5">
                    {t.stats.map((s) => (
                      <span
                        key={s}
                        className="whitespace-nowrap text-xs font-bold text-brand-stat-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2.5">
                    <span className="rounded-lg bg-brand-muted-bg px-3.5 py-2 text-xs font-extrabold text-brand-muted-text">
                      Miễn phí
                    </span>
                    <span className="flex items-center gap-1 rounded-lg bg-brand-cream-soft px-4 py-2 text-sm font-extrabold text-brand-wine">
                      Vào thi
                      <ArrowRight
                        size={14}
                        strokeWidth={2.5}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}

            {comingSoon.map((c, i) => {
              const Icon = resolveIcon(c.icon);
              return (
                <div
                  key={i}
                  className="relative flex min-w-0 flex-col rounded-2xl border border-brand-sand bg-white p-5 opacity-60 shadow-sm sm:p-6"
                >
                  <span className="absolute right-4 top-4 rounded-full bg-brand-navy px-2.5 py-1 text-xs font-extrabold text-white">
                    Sắp ra mắt
                  </span>
                  <div className="mb-1.5 flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-cream-soft text-brand-wine">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <h3 className="m-0 min-w-0 text-base font-extrabold leading-snug">
                      {c.title}
                    </h3>
                  </div>
                  {c.desc && (
                    <p className="mb-4 ml-12 text-sm leading-relaxed text-gray-500">
                      {c.desc}
                    </p>
                  )}
                  <div className="mb-4 flex flex-wrap gap-2 rounded-xl bg-brand-cream-soft px-4 py-3.5">
                    {c.stats.map((s) => (
                      <span
                        key={s}
                        className="whitespace-nowrap text-xs font-bold text-brand-stat-text"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2.5">
                    <span className="rounded-lg bg-brand-muted-bg px-3.5 py-2 text-xs font-extrabold text-brand-muted-text">
                      Miễn phí
                    </span>
                    <span className="cursor-not-allowed rounded-lg bg-brand-muted-bg px-4 py-2 text-sm font-extrabold text-brand-disabled-text">
                      Vào thi
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
