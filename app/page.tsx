import Link from "next/link";

const WORKSHEETS = [
  {
    href: "/worksheets/five-topics",
    icon: "🎧",
    title: "5 Topics - Authentic Listening",
    desc: "5 chủ đề: Dream House · Favorite Food · First Job · Travel · Shopping",
  },
  {
    href: "/worksheets/sports-benefits",
    icon: "🏅",
    title: "Sports & Health Benefits",
    desc: "Lợi ích của thể thao đối với cơ thể và trí não",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-pink-500">Hương Lan English</h1>
        <p className="mt-2 text-gray-500">Luyện đề Tiếng Anh online</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {WORKSHEETS.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-3xl">{w.icon}</span>
            <div>
              <h2 className="font-bold text-gray-800">{w.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{w.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/giao-vien/dang-nhap"
          className="inline-block rounded-full bg-pink-100 px-6 py-2 text-sm font-bold text-pink-600 hover:bg-pink-200"
        >
          👩‍🏫 Khu vực giáo viên
        </Link>
      </div>
    </main>
  );
}
