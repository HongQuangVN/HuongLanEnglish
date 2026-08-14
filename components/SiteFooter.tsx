import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-sand bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-sm font-bold text-brand-navy">
              Hương Lan English
            </h3>
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo-footer.png"
                alt="Hương Lan Talks — Hương Lan English"
                width={700}
                height={250}
                className="h-auto w-full max-w-xs"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Khóa học Tiếng Anh – Giao tiếp online: nghe, nói, đọc,{"\u00A0"}viết.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-brand-navy">
              Liên hệ
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a
                  href="mailto:huonglan.workspace@gmail.com"
                  className="flex items-center gap-2 hover:text-brand-wine"
                >
                  <Mail size={15} strokeWidth={2} className="shrink-0 text-gray-400" />
                  huonglan.workspace@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:0368344648"
                  className="flex items-center gap-2 hover:text-brand-wine"
                >
                  <Phone size={15} strokeWidth={2} className="shrink-0 text-gray-400" />
                  0368 344 648
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} strokeWidth={2} className="shrink-0 text-gray-400" />
                Phường Bình Thạnh, TP.{"\u00A0"}HCM
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-brand-navy">
              Kết nối với chúng tôi
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a
                  href="https://www.facebook.com/huonglan21vt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-wine"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-facebook text-xs font-bold text-white"
                    aria-hidden
                  >
                    f
                  </span>
                  Hương Lan
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@huonglantalks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-wine"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white"
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

        <div className="mt-10 border-t border-brand-sand pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Hương Lan English. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
