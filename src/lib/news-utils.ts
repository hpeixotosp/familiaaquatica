import newsData from "@/app/data/news.json";
import { client } from "./sanity";

export type NewsItem = {
  id: string;
  title: string;
  published: string;
  updated: string;
  tags: string[];
  content: string;
  source?: 'blogger' | 'sanity';
};

const bloggerNews = newsData as NewsItem[];

// Busca posts do Sanity e converte para o formato NewsItem
async function getSanityNews(): Promise<NewsItem[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        "id": _id,
        "title": title,
        "published": publishedAt,
        "updated": _updatedAt,
        "tags": categories[]->title,
        "content": pt::text(body),
        "source": "sanity"
      }
    `);
    return posts || [];
  } catch (error) {
    console.error('Erro ao buscar posts do Sanity:', error);
    return [];
  }
}

// Retorna posts do Blogger (síncronos) + Sanity (assíncronos)
export async function getAllNewsAsync(): Promise<NewsItem[]> {
  const sanityNews = await getSanityNews();
  const allNews = [...sanityNews, ...bloggerNews];
  return allNews.sort((a, b) =>
    new Date(b.published).getTime() - new Date(a.published).getTime()
  );
}

// Mantém compatibilidade com código existente (só Blogger)
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