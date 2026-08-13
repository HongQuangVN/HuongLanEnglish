import Link from "next/link";

const TESTS = [
  {
    href: "/tests/5-topics-worksheet.html",
    icon: "🎧",
    title: "5 Topics – Authentic Listening",
    desc: "5 chủ đề: Dream House · Favorite Food · First Job · Travel · Shopping",
  },
  {
    href: "/tests/sports-benefits-worksheet.html",
    icon: "🏅",
    title: "Sports & Health Benefits",
    desc: "Lợi ích của thể thao đối với cơ thể và trí não",
  },
  {
    href: "/tests/field-notes-worksheet.html",
    icon: "📝",
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
      <div className="border-b border-[#eee1c6] bg-[#fdf4e3]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c0392b] text-lg">
            📣
          </div>
          <p className="text-sm text-[#5a4a2f]">
            <span className="font-bold">Đã có đề thi mới!</span> Luyện ngay 2
            bộ đề nghe – nói miễn phí bên dưới, cập nhật thường xuyên.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#eaf2f2]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#c0392b] sm:text-5xl">
              Hệ thống luyện thi
              <br />
              Tiếng Anh trực tuyến
            </h1>
            <p className="mt-3 text-2xl font-bold text-[#1c2b39]">
              Nghe – Nói thực chiến, chấm điểm ngay
            </p>

            <ul className="mt-8 space-y-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c0392b] text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-[#1c2b39]">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/online-test"
              className="mt-8 inline-block rounded-lg bg-[#c0392b] px-7 py-3 font-bold text-white shadow-md transition hover:bg-[#a5301f]"
            >
              Xem tất cả đề thi
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black text-[#c0392b]">3</p>
              <p className="text-sm text-gray-500">Bộ đề nghe – nói miễn phí</p>
            </div>
            <div className="rounded-2xl bg-[#1c2b39] p-6 text-white shadow-sm">
              <p className="text-2xl font-black">100%</p>
              <p className="text-xs opacity-80">Miễn phí</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-2xl font-black text-[#c0392b]">Tự động</p>
              <p className="text-xs text-gray-500">Chấm điểm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tests */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-[#1c2b39]">
            Đề thi miễn phí
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-[#c0392b]" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group block rounded-2xl border border-[#eee1c6] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fbe1de] text-2xl">
                  {t.icon}
                </span>
                <div>
                  <h3 className="font-bold text-[#1c2b39]">{t.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t.desc}</p>
                  <span className="mt-3 inline-block text-sm font-bold text-[#c0392b] group-hover:underline">
                    Vào thi →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/online-test"
            className="inline-block rounded-full bg-[#fbe1de] px-6 py-2 text-sm font-bold text-[#c0392b] hover:bg-[#f6cac5]"
          >
            Xem tất cả đề thi →
          </Link>
        </div>
      </section>
    </main>
  );
}
