import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hương Lan English",
  description: "Luyện đề Tiếng Anh online",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
