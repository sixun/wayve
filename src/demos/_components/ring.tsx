// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import { AnimatePresence as dependency97162 } from "framer-motion";
const s = { N: dependency97162 };
import * as a from "react";
function n() {
  let [e, t] = (0, a.useState)(false), [i, n2] = (0, a.useState)(true);
  return (0, a.useEffect)(() => {
    let e2 = setTimeout(() => {
      n2(false), t((e3) => !e3);
    }, i ? 1e3 : 2e3);
    return () => clearTimeout(e2);
  }, [e, i]), (0, l.jsxs)(r.P.div, { initial: false, className: "relative flex h-7 items-center justify-between px-2.5", animate: { width: e ? 148 : 128 }, transition: { type: "spring", bounce: 0.5 }, children: [(0, l.jsx)(s.N, { children: e ? (0, l.jsx)(r.P.div, { initial: { width: 0, opacity: 0, filter: "blur(4px)" }, animate: { width: 40, opacity: 1, filter: "blur(0px)" }, exit: { width: 0, opacity: 0, filter: "blur(4px)" }, transition: { type: "spring", bounce: 0.35 }, className: "absolute left-[5px] h-[18px] w-10 rounded-full bg-[#FD4F30]" }) : null }), (0, l.jsxs)(r.P.div, { initial: false, className: "relative h-[12.75px] w-[11.25px]", animate: { rotate: e ? [0, -15, 5, -2, 0] : [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0], x: 9 * !!e }, children: [(0, l.jsx)("svg", { className: "inset-0", width: "11.25", height: "12.75", viewBox: "0 0 15 17", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, l.jsx)("path", { d: "M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z", fill: "white" }) }), (0, l.jsx)("div", { className: "absolute inset-0", children: (0, l.jsx)("div", { className: "h-5 -translate-y-[5px] translate-x-[5.25px] rotate-[-40deg] overflow-hidden", children: (0, l.jsx)(r.P.div, { animate: { height: 16 * !!e }, transition: { ease: "easeInOut", duration: e ? 0.125 : 0.05, delay: 0.15 * !!e }, className: "w-fit rounded-full", children: (0, l.jsx)("div", { className: "flex h-full w-[3px] items-center justify-center rounded-full bg-[#FD4F30]", children: (0, l.jsx)("div", { className: "h-full w-[0.75px] rounded-full bg-white" }) }) }) }) })] }), (0, l.jsx)("div", { className: "ml-auto flex items-center", children: e ? (0, l.jsx)("span", { className: "text-xs font-medium text-[#FD4F30]", children: "Silent" }) : (0, l.jsx)("span", { className: "text-xs font-medium text-white", children: "Ring" }) })] });
}
export {
  n as Ring
};
