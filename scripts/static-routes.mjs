import {readFile,mkdir,writeFile} from 'node:fs/promises';
const catalogue=JSON.parse(await readFile('src/catalogue.json','utf8'));
const html=await readFile('dist/index.html','utf8');
const routes=['components',...catalogue.map(x=>`v1/wayve${x.id}`),...catalogue.filter(x=>![12,14,36].includes(x.id)).map(x=>`demo/wayve${x.id}`)];
await Promise.all(routes.map(async route=>{await mkdir(`dist/${route}`,{recursive:true});await writeFile(`dist/${route}/index.html`,html)}));
console.log(`Generated ${routes.length} direct-entry routes.`);
