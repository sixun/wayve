import {motion,MotionConfig,useReducedMotion} from 'motion/react';
/** Adapted from purchased Skiper69 SkiperNumberFlow. Author @gurvinder-singh02.
 * Retains character occurrence keys and shared-layout digit transition.
 * Original and original license comments: originals/skiper69.tsx.
 */
export function NumberFlow({value,suffix=''}:{value:number;suffix?:string}){
 const seen:Record<string,number>={}; const reduced=useReducedMotion();
 return <MotionConfig transition={reduced?{duration:0}:{type:'spring',stiffness:400,damping:35}}><span className="number-flow">{String(value).split('').map(char=>{seen[char]=(seen[char]||0)+1;const key=char+'-'+seen[char];return <motion.span layout key={key}>{char}</motion.span>})}{suffix}</span></MotionConfig>
}
