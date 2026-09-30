// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import { AnimatePresence as dependency97162 } from "framer-motion";
const s = { N: dependency97162 };
import * as a from "react";
import * as n from "./island-icons";
function c() {
  let [e, t] = (0, a.useState)(0);
  return (0, l.jsx)(r.P.div, { transition: { type: "spring", bounce: 0.5 }, className: "flex w-[284px] items-center gap-2 p-4", children: (0, l.jsxs)("div", { className: "flex w-full gap-2", children: [(0, l.jsxs)(r.P.button, { "aria-label": "Pause timer", whileTap: { scale: 0.9 }, className: "relative flex h-10 w-10 items-center justify-center", children: [(0, l.jsx)(n.Icons.airDrop, { className: "size-15 text-[#159BF4]" }), (0, l.jsx)("img", { src: "/wayve/media/island/user.png", className: "absolute -right-1 bottom-0 size-6", alt: "" })] }), (0, l.jsxs)("div", { className: "mt-4 flex w-full items-center gap-1 font-medium text-white", children: [(0, l.jsx)("h1", { className: "h-full text-sm", children: "AirDrop" }), (0, l.jsx)("p", { className: "text-xs", children: "1 photo" })] }), (0, l.jsx)(d, { progress: e, setProgress: t })] }) });
}
function o(e) {
  let { setView: t } = e;
  return (0, l.jsx)(r.P.div, { className: "flex w-[284px] items-center gap-2 p-4", children: (0, l.jsxs)("div", { className: "flex flex-col items-center justify-center gap-4", children: [(0, l.jsxs)("div", { className: "flex w-full justify-between", children: [(0, l.jsxs)("div", { className: "w-2/3", children: [(0, l.jsxs)(r.P.button, { "aria-label": "Pause timer", whileTap: { scale: 0.9 }, className: "relative flex h-10 w-10 items-center justify-center", children: [(0, l.jsx)(n.Icons.airDrop, { className: "size-15 text-[#159BF4]" }), (0, l.jsx)("img", { src: "/wayve/media/island/user.png", className: "absolute -right-1 bottom-0 size-6", alt: "" })] }), (0, l.jsxs)("div", { className: "text-white", children: [(0, l.jsx)("h1", { className: "text-sm font-medium", children: "AirDrop" }), (0, l.jsxs)("p", { className: "mr-4 text-xs leading-4", children: [" ", "Gxuri would like to share 23 photos"] })] })] }), (0, l.jsx)("div", { className: "h-24 w-24 overflow-hidden rounded-2xl", children: (0, l.jsx)("img", { src: "/wayve/media/island/japan.webp", className: "size-full object-cover", alt: "" }) })] }), (0, l.jsxs)("div", { className: "flex w-full gap-2 font-medium", children: [(0, l.jsx)(r.P.button, { onClick: () => {
    t("idle");
  }, whileTap: { scale: 0.9 }, className: "w-1/2 rounded-full bg-neutral-700 py-1.5 text-white", children: "Decline" }), (0, l.jsx)(r.P.button, { whileTap: { scale: 0.9 }, onClick: () => {
    t("idle"), setTimeout(() => t("airdropMini"), 500);
  }, className: "w-1/2 rounded-full bg-[#012B59] py-1 text-[#159BF4]", children: "Accept" })] })] }) });
}
function d(e) {
  let { progress: t, setProgress: i } = e;
  return (0, a.useEffect)(() => {
    let e2 = setTimeout(() => {
      i(25);
    }, 600), t2 = setTimeout(() => {
      i(50);
    }, 1700), l2 = setTimeout(() => {
      i(75);
    }, 2100), r2 = setTimeout(() => {
      i(100);
    }, 2400), s2 = setTimeout(() => {
      i(105);
    }, 2700);
    return () => {
      clearTimeout(e2), clearTimeout(t2), clearTimeout(l2), clearTimeout(r2), clearTimeout(s2);
    };
  }, []), (0, l.jsx)(r.P.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, bounce: 0.5 }, className: "relative", children: (0, l.jsx)(s.N, { mode: "popLayout", children: t > 100 ? (0, l.jsx)(r.P.button, { whileTap: { scale: 0.8 }, initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, transition: { type: "spring", duration: 1, bounce: 0.5 }, "aria-label": "Exit", className: "flex h-10 min-w-10 items-center justify-center rounded-full bg-[#3C3D3C] px-2 text-white transition-colors hover:bg-[#4A4B4A]", children: (0, l.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", children: [(0, l.jsx)("path", { fill: "currentColor", d: "M18 8h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v11H6V10h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2" }), (0, l.jsx)("path", { fill: "currentColor", d: "M12 16c.55 0 1-.45 1-1V5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.2-.2-.51-.2-.71 0L8.85 4.15a.5.5 0 0 0 .36.85H11v10c0 .55.45 1 1 1" })] }) }, "exit") : (0, l.jsxs)(r.P.div, { initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, transition: { type: "spring", duration: 1, bounce: 0.5 }, className: "relative flex items-center justify-center", children: [(0, l.jsxs)("svg", { className: "relative size-10 text-[#159BF4]", viewBox: "0 0 50 50", children: [(0, l.jsx)("circle", { className: "opacity-40", strokeWidth: 6, stroke: "currentColor", fill: "transparent", r: 22, cx: 25, cy: 25 }), (0, l.jsx)(r.P.circle, { strokeLinecap: "round", initial: { pathLength: 0, pathOffset: 0 }, animate: { pathLength: t / 100, pathOffset: 0, opacity: 1 }, transition: { type: "spring", duration: 1, bounce: 0.2 }, strokeWidth: 6, stroke: "currentColor", fill: "transparent", r: 22, cx: 25, cy: 25, transform: "rotate(-90 ".concat(25, " ").concat(25, ")") })] }), (0, l.jsx)(r.P.div, { initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1.2, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, transition: { type: "spring", duration: 1, bounce: 0.5 }, className: "absolute size-3.5 rounded-sm bg-[#159BF4]" })] }, "share") }) });
}
export {
  o as Airdrop,
  c as AirdropMini,
  d as default
};
