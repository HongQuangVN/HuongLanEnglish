import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hương Lan English",
  description: "Luyện đề Tiếng Anh online",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f7f3ec] font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
