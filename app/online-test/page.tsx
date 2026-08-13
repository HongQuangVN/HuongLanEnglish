import Link from "next/link";
import { getTestCards } from "@/lib/tests-scanner";

export const metadata = {
  title: "Đề thi trực tuyến",
};

// Luôn quét lại thư mục public/tests/ mỗi lần có request, để bài test mới
// thêm vào (hoặc xoá đi) xuất hiện ngay mà không cần rebuild thủ công.
export const dynamic = "force-dynamic";

export default function OnlineTestPage() {
  const { real, comingSoon } = getTestCards();

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#1c2b39]">
      <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-6">
        <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#c0392b] text-sm text-white">
              HL
            </span>
            Hương Lan English
          </Link>
          <Link href="/" className="text-sm font-bold text-[#c0392b] hover:underline">
            ← Về trang chủ
          </Link>
        </div>

        <div className="mb-9 flex gap-2 rounded-[18px] border border-[#eee1c6] bg-white p-2.5 shadow-sm">
          <div className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#fbe1de] p-4 text-base font-extrabold text-[#c0392b]">
            <span className="text-xl">📋</span> Đề thi trên máy
          </div>
          <div className="flex flex-1 items-center justify-center gap-2.5 rounded-xl p-4 text-base font-extrabold text-[#5b6b78] transition hover:bg-[#f7f3ec]">
            <span className="text-xl">📄</span> Tài liệu tải được
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="inline-block border-b-[3px] border-[#c0392b] pb-2.5 text-2xl font-black">
            Đề thi miễn phí
          </h2>
        </div>

        {real.length === 0 && comingSoon.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Chưa có đề thi nào. Thêm file .html vào thư mục public/tests/ để
            hiển thị tại đây.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {real.map((t) => (
              <Link
                key={t.slug}
                href={t.href}
                className="flex flex-col rounded-[20px] border border-[#eee1c6] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-1.5 flex items-start gap-3">
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#fbe1de] text-lg text-[#c0392b]">
                    {t.icon}
                  </span>
                  <h3 className="m-0 text-[17px] font-extrabold">{t.title}</h3>
                </div>
                {t.desc && (
                  <p className="mb-4 ml-[46px] text-[13.5px] text-gray-500">
                    {t.desc}
                  </p>
                )}
                <div className="mb-[18px] flex flex-wrap gap-2.5 rounded-xl bg-[#fbe1de] px-4 py-3.5">
                  {t.stats.map((s) => (
                    <span
                      key={s}
                      className="whitespace-nowrap text-[13px] font-bold text-[#8a4a3f]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2.5">
                  <span className="rounded-[10px] bg-[#eef0f2] px-3.5 py-2 text-[12.5px] font-extrabold text-[#5b6b78]">
                    Miễn phí
                  </span>
                  <span className="rounded-[10px] bg-[#fbe1de] px-4 py-2 text-[13px] font-extrabold text-[#c0392b]">
                    Vào thi ›
                  </span>
                </div>
              </Link>
            ))}

            {comingSoon.map((c, i) => (
              <div
                key={i}
                className="relative flex flex-col rounded-[20px] border border-[#eee1c6] bg-white p-6 opacity-60 shadow-sm"
              >
                <span className="absolute right-4 top-4 rounded-full bg-[#1c2b39] px-2.5 py-1 text-[11px] font-extrabold text-white">
                  Sắp ra mắt
                </span>
                <div className="mb-1.5 flex items-start gap-3">
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#fbe1de] text-lg text-[#c0392b]">
                    {c.icon}
                  </span>
                  <h3 className="m-0 text-[17px] font-extrabold">{c.title}</h3>
                </div>
                {c.desc && (
                  <p className="mb-4 ml-[46px] text-[13.5px] text-gray-500">
                    {c.desc}
                  </p>
                )}
                <div className="mb-[18px] flex flex-wrap gap-2.5 rounded-xl bg-[#fbe1de] px-4 py-3.5">
                  {c.stats.map((s) => (
                    <span
                      key={s}
                      className="whitespace-nowrap text-[13px] font-bold text-[#8a4a3f]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2.5">
                  <span className="rounded-[10px] bg-[#eef0f2] px-3.5 py-2 text-[12.5px] font-extrabold text-[#5b6b78]">
                    Miễn phí
                  </span>
                  <span className="cursor-not-allowed rounded-[10px] bg-[#eef0f2] px-4 py-2 text-[13px] font-extrabold text-[#9aa2a9]">
                    Vào thi ›
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
