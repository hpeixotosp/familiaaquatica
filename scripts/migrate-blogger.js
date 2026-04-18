const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

const BLOGGER_FEED_URL = 'http://www.familaquatica.net/feeds/posts/default?alt=atom&max-results=500';

async function fetchFeed(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar feed: ${response.status}`);
  return response.text();
}

async function migrate() {
  console.log("Buscando feed do Blogger...");

  let xmlData;
  try {
    xmlData = await fetchFeed(BLOGGER_FEED_URL);
  } catch (e) {
    console.error("Erro ao buscar feed:", e);
    return;
  }

  const parser = new xml2js.Parser();
  console.log("Efetuando o parsing XML...");

  let result;
  try {
    result = await parser.parseStringPromise(xmlData);
  } catch (e) {
    console.error("Erro fatal no parsing do XML:", e);
    return;
  }

  const entries = result.feed.entry || [];
  console.log(`Total de ${entries.length} posts encontrados.`);

  const newsList = [];
  for (const e of entries) {
    try {
      const titleNode = e.title ? e.title[0] : null;
      const contentNode = e.content ? e.content[0] : null;
      if (!titleNode || !contentNode) continue;

      const title = typeof titleNode === 'string' ? titleNode : (titleNode._ || '');
      const content = typeof contentNode === 'string' ? contentNode : (contentNode._ || '');
      const published = e.published ? e.published[0] : new Date().toISOString();
      const updated = e.updated ? e.updated[0] : published;

      let tags = [];
      if (e.category) {
        tags = e.category
          .map(c => c.$.term)
          .filter(t => !t.includes("schemas.google.com"));
      }

      const slug = title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `post-${Date.now()}`;

      newsList.push({ id: slug, title, published, updated, tags, content });
    } catch (err) {
      // ignora post quebrado
    }
  }

  newsList.sort((a, b) => new Date(b.published) - new Date(a.published));
  console.log(`${newsList.length} posts extraídos com sucesso!`);

  const outDir = path.join(__dirname, '..', 'src', 'app', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'news.json'), JSON.stringify(newsList, null, 2));
  console.log("news.json atualizado com sucesso!");
}

migrate();