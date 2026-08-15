import Link from "next/link";
import {
  Headphones,
  Trophy,
  NotebookPen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const TESTS = [
  {
    href: "/tests/5-topics-worksheet.html",
    Icon: Headphones,
    title: "5 Topics – Authentic Listening",
    desc: "5 chủ đề: Dream House · Favorite Food · First Job · Travel · Shopping",
  },
  {
    href: "/tests/sports-benefits-worksheet.html",
    Icon: Trophy,
    title: "Sports & Health Benefits",
    desc: "Lợi ích của thể thao đối với cơ thể và trí não",
  },
  {
    href: "/tests/field-notes-worksheet.html",
    Icon: NotebookPen,
    title: "Field Notes: Resilient Communities",
    desc: "Từ vựng & ngữ pháp thì hiện tại hoàn thành, luyện nghe cộng đồng bền vững",
  },
];

const FEATURES = [
  "Đề thi bám sát cấu trúc luyện nghe – nói thực tế",
  "Chấm điểm và tổng hợp kết quả tự động",
  "Học mọi lúc, mọi nơi trên máy tính hoặc điện thoại",
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Announcement bar */}
      <div className="border-b border-brand-sand bg-brand-cream-soft">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wine text-white sm:h-9 sm:w-9">
            <Sparkles size={16} strokeWidth={2} />
          </span>
          <p
            className="text-sm leading-snug sm:text-sm"
            style={{ color: "#5a4a2f" }}
          >
            <span className="font-bold">Đã có đề thi mới!</span> Luyện ngay
            3{"\u00A0"}bộ đề nghe – nói miễn phí bên dưới, cập nhật thường
            xuyên.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-brand-navy-hover">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.07,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-brand-honey">
              <Sparkles size={13} strokeWidth={2} />
              Học cùng Hương Lan
            </span>

            <h1
              className="mt-5 font-black text-white"
              style={{ fontSize: "2.1rem", lineHeight: 1.1 }}
            >
              <span className="sm:text-5xl lg:text-6xl">
                Luyện Tiếng Anh
              </span>
              <br />
              <span className="text-brand-honey sm:text-5xl lg:text-6xl">
                nghe – nói
              </span>{" "}
              <span className="sm:text-5xl lg:text-6xl">thực chiến</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Đề thi bám sát tình huống giao tiếp thật, chấm điểm tự động
              ngay sau khi nộp bài — học đến đâu, biết mình đến đó.
            </p>

            <ul className="mt-7 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={19}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-brand-honey"
                  />
                  <span className="text-sm text-white/85">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="/online-test"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-honey px-6 py-3 text-sm font-bold text-brand-navy shadow-lg shadow-black/20 transition hover:brightness-105 sm:px-7"
              >
                Xem tất cả đề thi
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <p className="basis-full text-sm leading-snug text-white/60 sm:basis-auto">
                <span className="text-lg font-black text-white">100%</span>
                {" "}miễn phí
              </p>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-brand-cream sm:h-32"
          aria-hidden
        />
      </section>

      {/* Tests */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-9 text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-wine">
            Miễn phí — không giới hạn
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-navy sm:text-3xl">
            Chọn đề thi để bắt đầu
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TESTS.map(({ href, Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-brand-sand bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className="flex flex-1 items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cream-soft text-brand-wine sm:h-12 sm:w-12">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-bold leading-snug text-brand-navy">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 self-start pt-3 text-sm font-bold text-brand-wine">
                    Vào thi
                    <ArrowRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/online-test"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream-soft px-6 py-2.5 text-sm font-bold text-brand-wine transition hover:bg-brand-cream-hover"
          >
            Xem tất cả đề thi
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
