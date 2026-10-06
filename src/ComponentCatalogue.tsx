import { Fragment, useEffect, useRef, useState } from 'react';
import { PanelLeft, RotateCcw, Maximize, Minimize, Copy, Check, ArrowDownUp } from 'lucide-react';
import catalogue from './catalogue.json';
import styles from './catalogue.module.css';

const items = [...catalogue].sort((a, b) => a.id - b.id);
const number = (id: number) => `#${String(id).padStart(2, '0')}`;

export default function ComponentCatalogue() {
  const [selectedId, setSelectedId] = useState(106);
  const [sidebar, setSidebar] = useState(true);
  const [byCollection, setByCollection] = useState(false);
  const [revision, setRevision] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState('');
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const selected = items.find(item => item.id === selectedId)!;
  const groups = byCollection
    ? [...new Set(items.map(item => item.category))].map(category => ({ name: category, items: items.filter(item => item.category === category) }))
    : [{ name: 'All Components', items }];

  useEffect(() => {
    document.title = 'Components — wayve — shpark';
    const readHash = () => {
      const id = Number(location.hash.replace('#component-', ''));
      if (items.some(item => item.id === id)) setSelectedId(id);
    };
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    readHash();
    if (window.matchMedia('(max-width: 767px)').matches) setSidebar(false);
    window.addEventListener('hashchange', readHash);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      window.removeEventListener('hashchange', readHash);
      document.removeEventListener('fullscreenchange', onFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!sidebar) return;
    const timer = window.setTimeout(() => {
      const nav = list.current;
      const active = nav?.querySelector<HTMLElement>('[aria-current="true"]');
      if (!nav || !active) return;
      const top = active.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop - nav.clientHeight / 2;
      nav.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [selectedId, sidebar, byCollection]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault(); setSidebar(value => !value);
      }
    };
    const onOutside = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) setSidebar(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOutside); };
  }, []);

  function select(id: number) {
    setSelectedId(id);
    setRevision(0);
    setCopied(false);
    setManualCopy('');
    history.replaceState(null, '', `#component-${id}`);
    if (window.matchMedia('(max-width: 767px)').matches) setSidebar(false);
  }

  async function copyRequest() {
    const text = `${number(selected.id)} ${selected.name}\n적용할 서비스·화면: \n적용 위치: \n변경할 색상·문구: \n참고: ${location.origin}${import.meta.env.BASE_URL}components/#component-${selected.id}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setManualCopy('');
    } catch {
      setManualCopy(text);
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await stage.current?.requestFullscreen();
    } catch { setFullscreen(Boolean(document.fullscreenElement)); }
  }

  return <main className={styles.page}>
    <div ref={stage} className={styles.stage}>
      {selected.available ? <iframe key={`${selected.id}-${revision}`} className={styles.demo} title={`${number(selected.id)} ${selected.name} 직접 체험`} src={`/wayve/demo/wayve${selected.id}/`} sandbox="allow-scripts allow-same-origin" allow="fullscreen" /> : <div className={styles.unavailable}><h1>{number(selected.id)} {selected.name}</h1><p>이 컴포넌트는 준비 중입니다. 왼쪽에서 다른 항목을 선택해주세요.</p></div>}
      <button ref={toggleRef} className={styles.toggle} onClick={() => setSidebar(value => !value)} aria-label={sidebar ? '컴포넌트 목록 접기' : '컴포넌트 목록 열기'} aria-expanded={sidebar} aria-controls="component-list"><PanelLeft size={20} /></button>
      <aside ref={sidebarRef} className={`${styles.sidebar} ${!sidebar ? styles.sidebarClosed : ''}`} id="component-list" aria-hidden={!sidebar}>
        <nav ref={list} className={styles.list} aria-label="컴포넌트 목록">
          <div className={styles.ruler}>
            <button className={styles.sort} onClick={() => setByCollection(value => !value)}>Sorted by {byCollection ? 'Collection' : 'Id'}<ArrowDownUp size={14}/></button>
            {groups.map((group, groupIndex) => <Fragment key={group.name}>
              {groupIndex > 0 && Array.from({ length: 6 }, (_, index) => <span key={index} className={styles.minor} aria-hidden="true"/>)}
              <div className={styles.heading}><span className={styles.ticks}/><span>{group.name}</span></div>
              <span className={styles.minor} aria-hidden="true"/><span className={styles.minor} aria-hidden="true"/>
              {group.items.map(item => <Fragment key={item.id}>
                <button className={`${styles.item} ${selectedId === item.id ? styles.active : ''}`} aria-current={selectedId === item.id ? 'true' : undefined} onClick={() => select(item.id)}><span className={styles.ticks} aria-hidden="true"/><span className={styles.label}>{String(item.id).padStart(2, '0')} {item.name}{item.id >= 105 && <sup>New</sup>}{!item.available && <small>준비 중</small>}</span></button>
                <span className={styles.minor} aria-hidden="true"/><span className={styles.minor} aria-hidden="true"/>
              </Fragment>)}
            </Fragment>)}
          </div>
        </nav>
        <div className={styles.fadeTop}/><div className={styles.fadeBottom}/>
      </aside>
      <div className={styles.tools}>
        <button onClick={toggleFullscreen} aria-label={fullscreen ? '전체 화면 종료' : '전체 화면'} title="전체 화면">{fullscreen ? <Minimize size={19}/> : <Maximize size={19}/>}</button>
        <button onClick={() => setRevision(value => value + 1)} aria-label="데모 다시 실행" title="다시 실행"><RotateCcw size={19}/></button>
        <button onClick={copyRequest} disabled={!selected.available} aria-label="적용 요청 복사" title="적용 요청 복사">{copied ? <Check size={19}/> : <Copy size={19}/>}</button>
      </div>
      <div className={styles.bottom}><a className={styles.badge} href="/wayve/" aria-label="포트폴리오 홈">shpark</a><span className={styles.current}><strong>{number(selected.id)}</strong> {selected.name}</span><button onClick={copyRequest} disabled={!selected.available}>{copied ? '복사 완료' : '적용 요청 복사'}<Copy size={13}/></button></div>
      <span className={styles.srOnly} role="status">{copied ? `${number(selected.id)} 적용 요청을 복사했습니다.` : ''}</span>
      {manualCopy && <div className={styles.fallback}><label htmlFor="request-text">아래 내용을 선택해 복사하세요.</label><textarea id="request-text" readOnly value={manualCopy} onFocus={event => event.target.select()}/><button onClick={() => setManualCopy('')}>닫기</button></div>}
    </div>
  </main>;
}
