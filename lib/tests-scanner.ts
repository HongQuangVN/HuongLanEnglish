import fs from "fs";
import path from "path";

export type TestCardData = {
  slug: string; // tên file không đuôi .html, dùng làm key + phần cuối URL
  href: string; // /tests/xxx.html
  title: string;
  desc: string;
  icon: string;
  stats: string[];
  comingSoon?: false;
};

export type ComingSoonCardData = {
  title: string;
  desc: string;
  icon: string;
  stats: string[];
  comingSoon: true;
};

type TestMetaOverride = {
  title?: string;
  desc?: string;
  icon?: string;
  stats?: string[];
};

type TestsMetaFile = Record<string, TestMetaOverride | unknown> & {
  _comingSoon?: TestMetaOverride[];
};

const TESTS_DIR = path.join(process.cwd(), "public", "tests");
const META_PATH = path.join(process.cwd(), "public", "tests-meta.json");

function readMetaFile(): TestsMetaFile {
  try {
    const raw = fs.readFileSync(META_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Lấy nội dung thẻ <title> của 1 file .html để tự sinh tiêu đề khi
// không có khai báo thủ công trong tests-meta.json.
function extractTitle(filePath: string): string | null {
  try {
    // Chỉ cần đọc vài KB đầu file là đủ tìm <title>, tránh đọc hết file
    // rất nặng (một số worksheet nhúng audio base64 nhiều MB).
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(4096);
    fs.readSync(fd, buffer, 0, 4096, 0);
    fs.closeSync(fd);
    const head = buffer.toString("utf-8");
    const match = head.match(/<title>([^<]*)<\/title>/i);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

// Biến tên file (vd: "5-topics-worksheet") thành tiêu đề đọc được
// (vd: "5 Topics Worksheet") khi không có <title> lẫn override nào dùng được.
function titleFromSlug(slug: string): string {
  return slug
    .replace(/-worksheet$/i, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function cleanAutoTitle(raw: string): string {
  // Loại bỏ tiền tố kiểu "CHỦ ĐỀ: ", hậu tố " - Phiếu Bài Tập..." hay gạch nối kép
  // thường thấy trong <title> gốc, để tiêu đề card gọn hơn khi tự sinh.
  return raw
    .replace(/^CHỦ ĐỀ:\s*/i, "")
    .replace(/\s*[-–]\s*Phiếu Bài Tập.*$/i, "")
    .trim();
}

const DEFAULT_ICON = "FileText";
const DEFAULT_STATS = ["Miễn phí", "Không giới hạn"];

export function getTestCards(): { real: TestCardData[]; comingSoon: ComingSoonCardData[] } {
  const meta = readMetaFile();

  let files: string[] = [];
  try {
    files = fs
      .readdirSync(TESTS_DIR)
      .filter((f) => f.toLowerCase().endsWith(".html"))
      .sort();
  } catch {
    files = [];
  }

  const real: TestCardData[] = files.map((filename) => {
    const slug = filename.replace(/\.html$/i, "");
    const override = (meta[slug] as TestMetaOverride) || {};

    let title = override.title;
    if (!title) {
      const rawTitle = extractTitle(path.join(TESTS_DIR, filename));
      title = rawTitle ? cleanAutoTitle(rawTitle) : titleFromSlug(slug);
    }

    return {
      slug,
      href: `/tests/${filename}`,
      title,
      desc: override.desc || "",
      icon: override.icon || DEFAULT_ICON,
      stats: override.stats && override.stats.length ? override.stats : DEFAULT_STATS,
    };
  });

  const comingSoon: ComingSoonCardData[] = (meta._comingSoon || []).map((c) => ({
    title: c.title || "Sắp ra mắt",
    desc: c.desc || "",
    icon: c.icon || DEFAULT_ICON,
    stats: c.stats && c.stats.length ? c.stats : DEFAULT_STATS,
    comingSoon: true as const,
  }));

  return { real, comingSoon };
}
