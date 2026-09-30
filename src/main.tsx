import React from 'react';
import {createRoot} from 'react-dom/client';
const root=createRoot(document.getElementById('root')!);
async function start(){
 if(location.pathname.startsWith('/demo/')){const {default:Demo}=await import('./DemoRuntime');root.render(<Demo/>)}
 else{await import('./style.css');if(location.pathname.startsWith('/components')||location.pathname.startsWith('/v1/')){const {default:Gallery}=await import('./Gallery');root.render(<Gallery/>)}else{const {default:App}=await import('./App');root.render(<React.StrictMode><App/></React.StrictMode>)}}
}
start().catch(()=>root.render(<p>페이지를 불러오지 못했습니다. 새로고침해 주세요.</p>));
