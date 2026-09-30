import {useEffect,useState} from 'react';
export function useMediaQuery(query:string){const [matches,setMatches]=useState(()=>window.matchMedia(query).matches);useEffect(()=>{const m=window.matchMedia(query);const update=()=>setMatches(m.matches);m.addEventListener('change',update);update();return()=>m.removeEventListener('change',update)},[query]);return matches}
