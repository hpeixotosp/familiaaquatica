const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

async function migrate() {
  console.log("Iniciando leitura do feed.atom...");
  if (!fs.existsSync('./feed.atom')) {
    console.error("Arquivo feed.atom não encontrado na raiz!");
    return;
  }
  
  const xmlData = fs.readFileSync('./feed.atom', 'utf8');
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
  console.log(`Total de ${entries.length} nós encontrados no XML.`);
  
  const newsList = [];
  
  for (const e of entries) {
    try {
      // O Blogger tem <category term="http://schemas.google.com/blogger/2008/kind#post" />
      // Mas podemos checar apenas se tem title e content
      const titleNode = e.title ? e.title[0] : null;
      const contentNode = e.content ? e.content[0] : null;
      
      if (!titleNode || !contentNode) continue;
      
      const title = typeof titleNode === 'string' ? titleNode : (titleNode._ || '');
      const content = typeof contentNode === 'string' ? contentNode : (contentNode._ || '');
      const published = e.published ? e.published[0] : new Date().toISOString();
      const updated = e.updated ? e.updated[0] : published;
      
      // Filtrar apenas tags úteis
      let tags = [];
      if (e.category) {
        tags = e.category
          .map(c => c.$.term)
          .filter(t => !t.includes("schemas.google.com"));
      }
      
      // Criar um slug seguro para URL
      const slug = title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
      newsList.push({
        id: slug,
        title,
        published,
        updated,
        tags,
        content
      });
      
    } catch (err) {
      // Ignora erro em algum nó quebrado isolado
    }
  }
  
  console.log(`Sucesso: ${newsList.length} notícias reais extraídas e limpas!`);
  
  // Ordena da mais recente para a mais antiga
  newsList.sort((a, b) => new Date(b.published) - new Date(a.published));
  
  const outDir = path.join(__dirname, '..', 'src', 'app', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(outDir, 'news.json'), JSON.stringify(newsList, null, 2));
  console.log("Arquivo src/app/data/news.json gerado brilhantemente com toda a base Histórica!");
}

migrate();
