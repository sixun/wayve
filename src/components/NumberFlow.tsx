import {motion,MotionConfig,useReducedMotion} from 'motion/react';

export function NumberFlow({value,suffix=''}:{value:number;suffix?:string}){
 const seen:Record<string,number>={}; const reduced=useReducedMotion();
 return <MotionConfig transition={reduced?{duration:0}:{type:'spring',stiffness:400,damping:35}}><span className="number-flow">{String(value).split('').map(char=>{seen[char]=(seen[char]||0)+1;const key=char+'-'+seen[char];return <motion.span layout key={key}>{char}</motion.span>})}{suffix}</span></MotionConfig>
}
