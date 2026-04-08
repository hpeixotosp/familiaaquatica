import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

async function testParse() {
  const xmlData = fs.readFileSync('./feed.atom', 'utf8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  });
  
  let result = parser.parse(xmlData);
  const feed = result.feed;
  if (!feed) {
    console.error("No <feed> element found.");
    return;
  }
  
  const entries = feed.entry || [];
  console.log(`Found ${entries.length} entries.`);
  
  // Just print the first useful post (filtering out non-POST things like settings or templates if any)
  let found = 0;
  for (const entry of entries) {
    if (found >= 2) break;
    console.log("-------------------");
    console.log("Title:", entry.title);
    console.log("Published:", entry.published);
    let cats = [];
    if (Array.isArray(entry.category)) {
      cats = entry.category.map(c => c['@_term']);
    } else if (entry.category) {
      cats = [entry.category['@_term']];
    }
    console.log("Categories:", cats);
    console.log("Content Keys:", entry.content ? Object.keys(entry.content) : "No Content Element");
    console.log("Snippet:", entry.content && entry.content['#text'] ? entry.content['#text'].substring(0, 100) : "No Text");
    found++;
  }
}

testParse();
