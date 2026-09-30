import {build} from 'esbuild';
import {Window} from 'happy-dom';
import fs from 'node:fs/promises';
const window=new Window({url:'http://localhost/wayve/'});
for(const key of ['window','document','navigator','HTMLElement','Element','HTMLVideoElement','HTMLMediaElement','HTMLCanvasElement','customElements','localStorage','getComputedStyle','MutationObserver','ResizeObserver','IntersectionObserver','requestAnimationFrame','cancelAnimationFrame']){if(window[key]!==undefined)Object.defineProperty(globalThis,key,{value:typeof window[key]==='function'&&['getComputedStyle','requestAnimationFrame','cancelAnimationFrame'].includes(key)?window[key].bind(window):window[key],configurable:true})}
const React=await import('react');
const {renderToString}=await import('react-dom/server');
const {ThemeProvider}=await import('next-themes');
const {TooltipProvider}=await import('@radix-ui/react-tooltip');
const ids=(await fs.readdir('src/demos')).filter(x=>/^wayve\d+\.tsx$/.test(x)).map(x=>Number(x.match(/\d+/)[0])).sort((a,b)=>a-b);
let failures=[];
await fs.mkdir('.demo-check',{recursive:true});
for(const id of ids){try{await build({entryPoints:[`src/demos/wayve${id}.tsx`],outfile:`.demo-check/${id}.mjs`,bundle:true,format:'esm',platform:'node',packages:'external',jsx:'automatic',loader:{'.css':'empty'},logLevel:'silent',plugins:[{name:'css',setup(b){b.onResolve({filter:/^(swiper\/css|.*\.css$)/},a=>({path:a.path,namespace:'empty'}));b.onLoad({filter:/.*/,namespace:'empty'},()=>({contents:'',loader:'js'}))}}]});const m=await import(`../.demo-check/${id}.mjs`);const D=m[`Wayve${id===101?102:id}`];if(typeof D!=='function')throw Error('Missing component export');renderToString(React.createElement(ThemeProvider,{attribute:'class'},React.createElement(TooltipProvider,null,React.createElement(D))));}catch(e){failures.push({id,error:e.message})}}
console.log(JSON.stringify({checked:ids.length,passed:ids.length-failures.length,failures},null,2));
await window.happyDOM.abort();process.exit(failures.length?1:0);
