const fs = require('fs');
const xml2js = require('xml2js');

async function testParse() {
  const xmlData = fs.readFileSync('./feed.atom', 'utf8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xmlData);
  const entries = result.feed.entry;
  
  const posts = entries.filter(e => e.title && e.content).map(e => ({
    title: (typeof e.title[0] === 'string' ? e.title[0] : (e.title[0]._ || '')),
    published: e.published ? e.published[0] : null,
    tags: e.category ? e.category.map(c => c.$.term).filter(t => !t.includes("schemas.google.com")) : []
  }));
  
  fs.writeFileSync('posts-summary.json', JSON.stringify({ count: posts.length, sample: posts.slice(0, 3) }, null, 2));
}
testParse();
