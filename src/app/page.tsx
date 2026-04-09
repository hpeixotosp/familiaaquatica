import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarSection } from "@/components/CalendarSection";
import { HeaderSearch } from "@/components/HeaderSearch";
import { MobileNav } from "@/components/MobileNav";
import { ArrowRight, ChevronRight, Clock, Flame, Newspaper, TrendingUp } from "lucide-react";
import { getAllNews, extractFirstImage, getRelativeDate, TAG_COLORS } from "@/lib/news-utils";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? "").toLowerCase().trim();
  const allNews = getAllNews();
  const news = q
    ? allNews.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q))
      )
    : allNews;
  const featured = news[0];
  const recentCards = news.slice(0, 4);
  const trending = news.slice(4, 8);
  return (
    <div className="min-h-screen bg-[#f3f6f9] font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. HEADER */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2
          flex items-center justify-between
          lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6">

          {/* Logo — maior no mobile */}
          <Link href="/" className="shrink-0 block">
            <Image
              src="/logo-cabecalho.jpg"
              alt="Família Aquática"
              width={220}
              height={74}
              priority
              className="object-contain h-[62px] lg:h-[74px] w-auto mix-blend-multiply contrast-[1.05]"
            />
          </Link>

          {/* Nav — só em lg+ */}
          <nav className="hidden lg:flex justify-center items-center gap-6 xl:gap-10 text-sm font-bold text-slate-500 uppercase tracking-wider">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">Página Inicial</Link>
            <Link href="/quem-somos" className="hover:text-slate-900 transition-colors whitespace-nowrap">Quem Somos</Link>
            <Link href="/fotos" className="hover:text-slate-900 transition-colors">Fotos</Link>
            <Link href="/contato" className="hover:text-slate-900 transition-colors">Contato</Link>
          </nav>

          {/* Direita: busca só em lg+, botão + hamburger no mobile */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden lg:block">
              <HeaderSearch />
            </div>
            <Link href="/contato">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full font-bold px-4 lg:px-6 text-sm lg:text-base shadow-md shadow-sky-600/20">
                Fale Conosco
              </Button>
            </Link>
            {/* Hamburger — só mobile */}
            <MobileNav />
          </div>

        </div>
      </header>

      <main className="flex flex-col gap-10 lg:gap-16 pb-20">
        {/* 2. HERO SECTION - Split Layout */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
          <Link href={`/noticia/${featured.id}`} className="group block">
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 min-h-[60vh] grid lg:grid-cols-2">

              {/* Left: Text Content */}
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 lg:p-12">
                {/* Background gradient only on left side */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c4a6e] to-[#011a2e]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/0 to-[#011a2e] hidden lg:block" />

                <div className="relative z-10">
                  <Badge className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-4 py-1 mb-5 text-xs font-black uppercase tracking-widest border-none w-fit">
                    <Flame className="w-4 h-4 mr-2 inline" />
                    Destaque Oficial
                  </Badge>
                  <h1 className="font-heading text-2xl md:text-4xl lg:text-[2.25rem] xl:text-5xl font-black text-white leading-[1.15] mb-5 tracking-tight group-hover:text-sky-100 transition-colors line-clamp-4">
                    {featured.title}
                  </h1>
                  {featured.tags.filter(t => !t.startsWith('http')).length > 0 && (
                    <p className="text-sm md:text-base text-sky-100/70 font-medium mb-8 leading-relaxed border-l-4 border-sky-500 pl-4 line-clamp-2">
                      {featured.tags.filter(t => !t.startsWith('http')).join(' • ')}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center bg-sky-500 group-hover:bg-sky-400 text-white rounded-full px-7 py-3 text-sm font-bold transition-all shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] gap-2">
                      Ler matéria
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="flex items-center gap-2 text-sky-200 text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full">
                      <Clock className="w-3.5 h-3.5" /> {getRelativeDate(featured.published)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Featured Image — visível também no mobile */}
              <div className="relative h-52 lg:h-auto overflow-hidden">
                {(() => {
                  // gstatic.com images require Google referer — skip them for external use
                  const allImgs = (() => {
                    const pattern = /src=["']([^"']+)["']/gi;
                    const out: string[] = [];
                    let m;
                    while ((m = pattern.exec(featured.content)) !== null) {
                      const u = m[1];
                      if (u.startsWith('http') && !u.includes('gstatic.com') && !u.includes('.svg') && !u.includes('favicon')) {
                        out.push(u);
                      }
                    }
                    return out;
                  })();
                  const imgUrl = allImgs[0] ?? null;

                  return imgUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#011a2e] via-transparent to-transparent" />
                    </>
                  ) : (
                    /* Branded fallback — local swimming hero image */
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/hero-swimming.png"
                        alt="Natação"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#011a2e] via-[#011a2e]/40 to-transparent" />
                    </>
                  );
                })()}
              </div>

            </div>
          </Link>
        </section>

        {/* 3. TRENDING TAGS ROW - Substitui o "Explore" enorme solto */}
        <div className="w-full max-w-[1400px] mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-6 bg-white py-4 px-6 md:px-8 rounded-2xl shadow-sm border border-slate-200">
             <span className="font-heading font-black text-slate-800 uppercase tracking-widest text-sm shrink-0">Explore Rápido</span>
             <div className="h-4 w-px bg-slate-300 hidden md:block" />
              <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full">
                {["Copa FINA", "Maria Lenk", "José Finkel", "Universíades", "Clube Pinheiros", "Olimpíadas 2024", "NCAA Americano"].map(tag => (
                  <Link key={tag} href={`/?q=${encodeURIComponent(tag)}`} className="inline-block touch-manipulation">
                    <Badge variant="secondary" className="bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-600 rounded-full px-4 py-1.5 font-bold transition-colors cursor-pointer border border-transparent active:scale-95">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
           </div>
        </div>

        {/* 4. MAIN CONTENT GRID (Tight Columns) */}
        <section id="noticias" className="w-full max-w-[1400px] mx-auto px-6 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Últimas Coberturas</h2>
            <div className="flex-1 h-1 bg-slate-200 rounded-full"></div>
            <Link href="#noticias" className="hidden sm:flex text-sky-600 font-bold items-center text-sm uppercase tracking-widest hover:text-sky-800">
              Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentCards.map((item, idx) => {
              const imgUrl = extractFirstImage(item.content);
              const tag = item.tags.filter(t => !t.startsWith('http'))[0] || 'Notícia';
              return (
                <Link key={item.id} href={`/noticia/${item.id}`} className="group block">
                  <Card className="overflow-hidden bg-white rounded-[1.5rem] border-slate-200 group-hover:border-sky-300 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:shadow-sky-900/10 transition-all duration-400 ease-out flex flex-col h-fit">
                    <div className="h-48 relative overflow-hidden bg-slate-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          unoptimized
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Newspaper className="w-10 h-10 text-slate-300 group-hover:text-sky-400 transition-colors" />
                          </div>
                        </>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`${TAG_COLORS[idx % TAG_COLORS.length]} font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded shadow-sm border-none`}>
                          {tag}
                        </Badge>
                      </div>
                      <h3 className="font-heading font-black text-xl text-slate-800 leading-[1.3] group-hover:text-sky-700 transition-colors line-clamp-3">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{getRelativeDate(item.published)}</span>
                        <ChevronRight className="w-5 h-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5. BOTTOM SECTION: Calendar vs Top Lidas (50/50 Split para evitar vazios) */}
        <section className="w-full max-w-[1400px] mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <h2 className="font-heading text-2xl font-black text-slate-900 tracking-tight">Radar de Competições</h2>
              </div>
              <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-800 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                <CalendarSection />
              </div>
            </div>

            <div id="em-alta" className="flex flex-col gap-6 scroll-mt-24">
              <div className="flex items-center gap-3">
                 <TrendingUp className="w-6 h-6 text-amber-500" />
                 <h2 className="font-heading text-2xl font-black text-slate-900 tracking-tight">Em Alta na Semana</h2>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-xl overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                 <ul className="space-y-6 relative z-10">
                   {trending.map((item, idx) => (
                     <li key={item.id} className="group relative border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                       <Link href={`/noticia/${item.id}`} className="flex items-start gap-5">
                         <span className="font-mono font-black text-2xl text-amber-500/30 group-hover:text-amber-400 transition-colors select-none">
                           0{idx + 1}
                         </span>
                         <div>
                           <span className="font-heading font-bold text-slate-300 group-hover:text-amber-400 transition-colors leading-snug text-lg block">
                             {item.title}
                           </span>
                           <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-2 block">
                             <Clock className="w-3 h-3 inline mr-1 -mt-0.5" /> {getRelativeDate(item.published)}
                           </span>
                         </div>
                       </Link>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 6. FOOTER - Maximum Alignment */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
             
             {/* Logo Column */}
             <div className="flex flex-col items-center gap-4">
                <Image
                  src="/logo-cabecalho.jpg"
                  alt="Família Aquática"
                  width={300}
                  height={100}
                  className="object-contain h-[100px] w-auto mix-blend-multiply contrast-[1.1] scale-[1.3] origin-center [clip-path:inset(3px)]"
                />
                <p className="text-slate-500 font-semibold leading-relaxed mt-2 text-justify">
                  O maior portal e acervo de coberturas e opiniões sinceras sobre o ecossistema da Natação Nacional e Internacional.
                </p>
             </div>
             
             {/* Navigation */}
             <div className="flex flex-col gap-4 lg:pl-8">
                 <h4 className="font-heading font-black text-slate-900 text-sm uppercase tracking-[0.2em] mb-2 border-b-2 border-sky-500 pb-2 inline-block w-fit">Navegação</h4>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Página Inicial</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Últimas Notícias</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Calendário Oficial</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Artigos de Opinião</a>
             </div>
               
             {/* Suporte */}
             <div className="flex flex-col gap-4">
                 <h4 className="font-heading font-black text-slate-900 text-sm uppercase tracking-[0.2em] mb-2 border-b-2 border-sky-500 pb-2 inline-block w-fit">Suporte</h4>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Fale Conosco</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Time Editorial</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Parcerias de Evento</a>
                 <a href="#" className="font-semibold text-slate-500 hover:text-sky-600 transition-colors">Anuncie Conosco</a>
             </div>

             {/* Fique por dentro */}
             <div className="flex flex-col gap-4">
                 <h4 className="font-heading font-black text-slate-900 text-sm uppercase tracking-[0.2em] mb-2 border-b-2 border-sky-500 pb-2 inline-block w-fit">Fator Água</h4>
                 <p className="text-slate-500 font-medium text-sm">Sua dose semanal de braçadas limpas direto na caixa de entrada.</p>
                 <div className="flex mt-1">
                    <input type="email" placeholder="Seu melhor e-mail..." className="bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-l-xl px-4 py-3 w-full focus:outline-none focus:border-sky-500 transition-colors" />
                    <button className="bg-sky-600 hover:bg-sky-700 text-white px-5 rounded-r-xl transition-colors flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
             </div>
             
           </div>
           
           <div className="bg-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 font-bold text-xs uppercase tracking-widest gap-4">
              <span>© {new Date().getFullYear()} Família Aquática.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-slate-900 transition-colors">Privacidade</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Termos de Uso</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

