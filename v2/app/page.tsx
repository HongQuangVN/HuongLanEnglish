import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
        <span className="text-xl font-bold text-pink-500">Hương Lan English</span>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/worksheets/sports-benefits-3">Đề thi</Link>
          <Link href="/giao-vien/dang-nhap" className="rounded-full bg-pink-500 px-5 py-2 font-bold text-white">
            Khu vực giáo viên
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold text-pink-500">
          Luyện đề Tiếng Anh online
        </h1>
        <p className="mb-8 text-gray-500">
          Worksheet, kiểm tra từ vựng, và tài liệu ôn luyện.
        </p>
        <Link
          href="/worksheets/sports-benefits-3"
          className="rounded-full bg-pink-500 px-8 py-3 font-bold text-white shadow-md"
        >
          Bắt đầu làm bài
        </Link>
      </section>
    </main>
  );
}
