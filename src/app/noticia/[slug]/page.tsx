import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllNews, getNewsById, extractFirstImage, stripFirstImageBlock, formatDate, getRelativeDate, TAG_COLORS } from "@/lib/news-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

type Props = { params: { slug: string } };

export const dynamicParams = false;

// Required for output: "export" — generates static pages for all posts
export function generateStaticParams() {
  return getAllNews().map((post) => ({ slug: post.id }));
}

export default function NoticiaPage({ params }: Props) {
  const { slug } = params;
  const post = getNewsById(slug);

  if (!post) notFound();

  const imageUrl = extractFirstImage(post.content);
  // Remove the first image from content to avoid showing it twice (once as hero, once in text)
  const cleanContent = imageUrl ? stripFirstImageBlock(post.content) : post.content;
  const usefulTags = post.tags.filter((t) => !t.startsWith("http"));
  const allPosts = getAllNews();
  const related = allPosts
    .filter((p) => p.id !== post.id && p.tags.some((t) => usefulTags.includes(t)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f3f6f9] font-sans">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 group" aria-label="Voltar à home">
            {/* Logo — same treatment as main header */}
            <div className="relative h-[72px] w-[240px] shrink-0">
              <Image
                src="/logo-cabecalho.jpg"
                alt="Família Aquática"
                fill
                sizes="240px"
                priority
                className="object-contain object-left mix-blend-multiply contrast-[1.1] scale-[1.25] origin-left [clip-path:inset(4px)]"
              />
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-sky-600 font-bold gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-[860px] mx-auto px-6 py-12">

        {/* Tags */}
        {usefulTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {usefulTags.map((tag, i) => (
              <Badge key={tag} className={`${TAG_COLORS[i % TAG_COLORS.length]} border-none font-bold text-xs`}>
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-heading font-black text-3xl md:text-5xl text-slate-900 leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-slate-500 text-sm font-semibold mb-10 pb-8 border-b border-slate-200">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-500" />
            {formatDate(post.published)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            {getRelativeDate(post.published)}
          </span>
        </div>

        {/* Hero Image */}
        {imageUrl && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[520px] object-cover object-center"
            />
          </div>
        )}

        {/* Article Content */}
        <article
          className="blogger-content"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white rounded-full px-8 font-bold gap-2">
              <ArrowLeft className="w-5 h-5" />
              Ver todas as notícias
            </Button>
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading font-black text-2xl text-slate-800 mb-6 tracking-tight">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => {
                const relImg = extractFirstImage(rel.content);
                const relTags = rel.tags.filter((t) => !t.startsWith("http"));
                return (
                  <Link key={rel.id} href={`/noticia/${rel.id}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="h-40 relative bg-slate-100 overflow-hidden">
                        {relImg ? (
                          <Image src={relImg} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        {relTags[0] && (
                          <Badge className={`${TAG_COLORS[i % TAG_COLORS.length]} border-none text-[10px] font-bold mb-2`}>
                            {relTags[0]}
                          </Badge>
                        )}
                        <h3 className="font-heading font-black text-slate-800 text-sm leading-snug group-hover:text-sky-700 transition-colors line-clamp-3">
                          {rel.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2 block">
                          {getRelativeDate(rel.published)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
