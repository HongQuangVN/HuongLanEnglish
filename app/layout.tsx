import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const SITE_URL = "https://huonglanenglish.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hương Lan English — Luyện đề Tiếng Anh online",
    template: "%s — Hương Lan English",
  },
  description:
    "Luyện đề Tiếng Anh online miễn phí: nghe, nói, đọc, viết. Đề thi bám sát cấu trúc thực tế, chấm điểm và tổng hợp kết quả tự động.",
  keywords: [
    "luyện thi tiếng anh",
    "đề thi tiếng anh online",
    "luyện nghe nói tiếng anh",
    "Hương Lan English",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Hương Lan English",
    title: "Hương Lan English — Luyện đề Tiếng Anh online",
    description:
      "Luyện đề Tiếng Anh online miễn phí: nghe, nói, đọc, viết. Chấm điểm và tổng hợp kết quả tự động.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden bg-brand-cream font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
