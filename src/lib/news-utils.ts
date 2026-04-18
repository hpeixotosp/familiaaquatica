import newsData from "@/app/data/news.json";

export type NewsItem = {
  id: string;
  title: string;
  published: string;
  updated: string;
  tags: string[];
  content: string;
};

const bloggerNews = newsData as NewsItem[];

export function getAllNews(): NewsItem[] {
  return bloggerNews;
}

export function getNewsById(id: string): NewsItem | undefined {
  return bloggerNews.find((n) => n.id === id);
}

export function extractFirstImage(html: string): string | null {
  const srcPattern = /src=["']([^"']+)["']/gi;
  let match;
  const candidates: string[] = [];
  const priorityDomains = [
    'blogger.googleusercontent.com',
    'bp.blogspot.com',
    'lh',
    'gstatic.com',
  ];
  while ((match = srcPattern.exec(html)) !== null) {
    candidates.push(match[1]);
  }
  for (const domain of priorityDomains) {
    const found = candidates.find((src) => src.includes(domain));
    if (found) return found;
  }
  return candidates[0] || null;
}

export const TAG_COLORS: string[] = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-orange-100 text-orange-800",
  "bg-pink-100 text-pink-800",
  "bg-teal-100 text-teal-800",
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
  return `${Math.floor(diffDays / 365)} anos atrás`;
}

export function stripFirstImageBlock(html: string): string {
  return html.replace(/<img[^>]*>/, "").trim();
}