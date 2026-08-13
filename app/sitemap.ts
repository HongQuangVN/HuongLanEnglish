import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE_URL = "https://huonglanenglish.vercel.app";

function getTestFiles(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "tests");
    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".html"))
      .sort();
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/online-test`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const testPages: MetadataRoute.Sitemap = getTestFiles().map((filename) => ({
    url: `${SITE_URL}/tests/${filename}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...testPages];
}
