import type {ReactNode} from 'react';
/** Adapted from purchased Skiper40 Link001, by @gurvinder-singh02.
 * Original: originals/skiper40.tsx. CSS replaces Tailwind; same underline/arrow interaction.
 * Skiper UI https://skiper-ui.com — original attribution preserved in originals.
 */
export function AnimatedLink({children,href,className=''}:{children:ReactNode;href:string;className?:string}){
 return <a className={`animated-link ${className}`} href={href}>{children}<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
}
