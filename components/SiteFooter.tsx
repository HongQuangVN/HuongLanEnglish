import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#eee1c6] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-[#1c2b39]">
              Hương Lan English
            </h3>
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo-footer.png"
                alt="Hương Lan Talks — Hương Lan English"
                width={700}
                height={250}
                className="h-auto w-full max-w-[300px]"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Khóa học Tiếng Anh – Giao tiếp online: nghe, nói, đọc,{"\u00A0"}viết.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-[#1c2b39]">
              Liên hệ
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href="mailto:huonglan.workspace@gmail.com"
                  className="hover:text-[#c0392b]"
                >
                  huonglan.workspace@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:0368344648" className="hover:text-[#c0392b]">
                  0368 344 648
                </a>
              </li>
              <li>Phường Bình Thạnh, TP.{"\u00A0"}HCM</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-[#1c2b39]">
              Kết nối với chúng tôi
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href="https://www.facebook.com/huonglan21vt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#c0392b]"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-xs font-bold text-white"
                    aria-hidden
                  >
                    f
                  </span>
                  Hương Lan English
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@huonglantalks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#c0392b]"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1c2b39] text-xs font-bold text-white"
                    aria-hidden
                  >
                    ♪
                  </span>
                  @huonglantalks
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#eee1c6] pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Hương Lan English. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
