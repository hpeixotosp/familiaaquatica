import newsData from "@/app/data/news.json";

export type NewsItem = {
  id: string;
  title: string;
  published: string;
  updated: string;
  tags: string[];
  content: string;
};

const news = newsData as NewsItem[];

export function getAllNews(): NewsItem[] {
  return news;
}

export function getNewsById(id: string): NewsItem | undefined {
  return news.find((n) => n.id === id);
}

/** Extracts the first image src from Blogger HTML content */
export function extractFirstImage(html: string): string | null {
  // Handle both double and single quotes in src attributes
  const srcPattern = /src=["']([^"']+)["']/gi;
  let match;

  const priorityDomains = [
    'blogger.googleusercontent.com',
    'bp.blogspot.com',
    'lh',           // lh3, lh4, lh5, lh6.googleusercontent.com
    'gstatic.com',  // encrypted-tbn0/tbn1.gstatic.com (Google licensed images)
  ];

  const candidates: string[] = [];

  while ((match = srcPattern.exec(html)) !== null) {
    const url = match[1];
    if (url.startsWith('http') && !url.includes('favicon') && !url.includes('.svg')) {
      candidates.push(url);
    }
  }

  // Return first candidate from priority domains
  for (const domain of priorityDomains) {
    const found = candidates.find(u => u.includes(domain));
    if (found) return found;
  }

  // Fallback: first image URL with known extension
  const byExt = candidates.find(u => /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u));
  if (byExt) return byExt;

  // Last resort: any candidate
  return candidates[0] ?? null;
}

/**
 * Removes the first image block from Blogger HTML to avoid
 * duplicating the hero image that is already shown above the content.
 * Handles: <div class="separator">...<img>...</div>, <p><img></p> and bare <img> tags.
 */
export function stripFirstImageBlock(html: string): string {
  // 1. Blogger .separator div wrapper
  const withoutSeparator = html.replace(
    /<div[^>]*class="[^"]*separator[^"]*"[^>]*>(?:(?!<\/div>)[\s\S])*<\/div>/i,
    ''
  );
  if (withoutSeparator !== html) return withoutSeparator;

  // 2. <p> tag containing only an <img>
  const withoutP = html.replace(/<p[^>]*>\s*<img[^>]*>\s*(?:&nbsp;)?\s*<\/p>/i, '');
  if (withoutP !== html) return withoutP;

  // 3. Fallback: <a><img></a> or bare <img>
  return html
    .replace(/<a[^>]*>\s*<img[^>]*>\s*<\/a>/i, '')
    .replace(/<img[^>]*>/i, '');
}

export function getRelativeDate(iso: string): string {
  const now = new Date();
  const pub = new Date(iso);
  const diff = Math.floor((now.getTime() - pub.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Publicado Hoje";
  if (diff === 1) return "Há 1 dia";
  if (diff < 7) return `Há ${diff} dias`;
  if (diff < 30) return `Há ${Math.floor(diff / 7)} semana(s)`;
  if (diff < 365) return `Há ${Math.floor(diff / 30)} mês(es)`;
  return `Há ${Math.floor(diff / 365)} ano(s)`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const TAG_COLORS = [
  "text-blue-700 bg-blue-100",
  "text-emerald-700 bg-emerald-100",
  "text-indigo-700 bg-indigo-100",
  "text-amber-700 bg-amber-100",
  "text-rose-700 bg-rose-100",
  "text-sky-700 bg-sky-100",
];
