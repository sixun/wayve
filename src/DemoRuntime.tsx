import React,{Component,lazy,Suspense,useEffect,type ReactNode} from 'react';
import {ThemeProvider,useTheme} from 'next-themes';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import './demo.css';
import {DialRoot} from 'dialkit';
import 'dialkit/styles.css';
const modules=import.meta.glob<Record<string,React.ComponentType>>('./demos/wayve*.tsx');
const id=Number(location.pathname.match(/wayve(\d+)/)?.[1]);
const load=modules[`./demos/wayve${id}.tsx`];
const Demo=load?lazy(async()=>{const m=await load();const component=m[`Wayve${id===101?102:id}`];if(!component)throw Error('Demo export missing');return {default:component}}):null;
class DemoError extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}componentDidCatch(error:Error){console.error('Demo failed',id,error.message)}render(){return this.state.failed?<div className="demo-status"><h1>데모를 실행하지 못했습니다.</h1><p>새로고침 후 다시 시도해 주세요.</p><button onClick={()=>location.reload()}>다시 실행</button></div>:this.props.children}}
function ThemeBridge(){const {setTheme}=useTheme();useEffect(()=>{const receive=(e:MessageEvent)=>{if(e.origin===location.origin&&e.data?.type==='demo-theme')setTheme(e.data.theme)};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[setTheme]);return null}
export default function DemoRuntime(){return <ThemeProvider attribute="class" defaultTheme={new URLSearchParams(location.search).get("theme")==="dark"?"dark":"light"} enableSystem={false}><ThemeBridge/><TooltipProvider><DemoError><Suspense fallback={<div className="demo-status">데모 불러오는 중…</div>}>{Demo?<Demo/>:<div className="demo-status">아직 준비되지 않은 데모입니다.</div>}</Suspense></DemoError>{(id===105||id===106)&&<DialRoot/>}</TooltipProvider></ThemeProvider>}
