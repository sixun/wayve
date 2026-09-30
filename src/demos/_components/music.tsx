// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import { AnimatePresence as dependency97162 } from "framer-motion";
const s = { N: dependency97162 };
import { useMotionValue as dependency37436 } from "framer-motion";
const a = { d: dependency37436 };
import { animate as dependency87644 } from "framer-motion";
const n = { i: dependency87644 };
import { useTransform as dependency7372 } from "framer-motion";
const c = { G: dependency7372 };
import * as o from "react";
function d() {
  let [e, t] = (0, o.useState)(false), [i, a2] = (0, o.useState)(1), n2 = () => Array.from({ length: 6 }, () => 0.8 * Math.random() + 0.2), [c2, d2] = (0, o.useState)(n2());
  (0, o.useEffect)(() => {
    if (!e) {
      let e2 = setInterval(() => {
        d2(n2());
      }, 100), t2 = setInterval(() => {
        a2((e3) => e3 < 120 ? e3 + 1 : e3);
      }, 1e3);
      return () => {
        clearInterval(e2), clearInterval(t2);
      };
    }
  }, [e, 120]);
  let [x, p] = (0, o.useState)(false), h = (e2) => {
    let t2 = Math.floor(e2 / 60);
    return "".concat(t2.toString().padStart(2, "0"), ":").concat((e2 % 60).toString().padStart(2, "0"));
  }, m = 120 - i;
  return (0, l.jsx)("div", { className: "h-fit w-[284px] p-5", children: (0, l.jsxs)("div", { children: [(0, l.jsxs)("div", { className: "flex items-center gap-2", children: [(0, l.jsx)("div", { className: "perspective-1000 relative size-14", children: (0, l.jsxs)(r.P.div, { initial: { rotateY: 0, rotate: 30, scale: 0.5 }, onClick: () => p((e2) => !e2), animate: { rotateY: 180 * !x, rotate: 0, scale: 1 }, transition: { type: "spring", bounce: 0.5, duration: 2 }, whileTap: { scale: 0.8 }, className: "relative size-14 rounded-2xl", style: { transformStyle: "preserve-3d" }, children: [(0, l.jsx)("div", { className: "backface-hidden absolute size-full rounded-2xl bg-gradient-to-b from-indigo-400 to-cyan-400" }), (0, l.jsx)("div", { className: "backface-hidden absolute size-full rounded-2xl bg-gradient-to-b from-orange-600 via-pink-300 to-blue-300", style: { transform: "rotateY(180deg)" } })] }) }), (0, l.jsxs)("div", { className: "h-full text-lg font-medium text-white", children: [(0, l.jsx)("h1", { className: "leading-5", children: "Glow" }), (0, l.jsx)("p", { className: "leading-5", children: "Echo" })] }), (0, l.jsx)("div", { className: "absolute right-7", children: (0, l.jsx)(r.P.div, { className: "flex h-[18px] w-full items-center gap-0.5 rounded-full", children: c2.map((t2, i2) => (0, l.jsx)(r.P.div, { className: "w-[3px] rounded-full bg-blue-400", initial: { height: 4 }, animate: { height: e ? 4 : Math.max(4, 14 * t2) }, transition: { type: "spring", stiffness: 300, damping: 10 } }, i2)) }) })] }), (0, l.jsxs)("div", { className: "mt-4 flex items-center justify-center gap-2 text-sm", children: [(0, l.jsx)("p", { className: "tabular-nums", children: h(i) }), (0, l.jsx)(u, { value: i, onChange: (e2) => a2(e2), max: 120 }), (0, l.jsxs)("p", { className: "tabular-nums", children: ["-", h(m)] })] }), (0, l.jsxs)("div", { className: "mt-4 flex justify-center gap-8", children: [(0, l.jsx)(r.P.button, { whileTap: { scale: 0.9 }, className: "size-6 text-neutral-300", children: (0, l.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", style: { transform: "scaleX(-1)" }, children: (0, l.jsxs)("g", { fill: "currentColor", children: [(0, l.jsx)("path", { d: "M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" }), (0, l.jsx)("path", { d: "M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" })] }) }) }), (0, l.jsx)(r.P.button, { "aria-label": "Toggle play/pause", onClick: () => t((e2) => !e2), whileTap: { scale: 0.9 }, children: (0, l.jsx)(s.N, { initial: false, mode: "wait", children: e ? (0, l.jsx)(r.P.svg, { viewBox: "0 0 12 14", fill: "none", className: "size-5 fill-current text-neutral-300", children: (0, l.jsx)("path", { d: "M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" }) }, "play") : (0, l.jsx)(r.P.svg, { viewBox: "0 0 10 13", fill: "none", className: "size-5 fill-current text-neutral-300", children: (0, l.jsx)("path", { d: "M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" }) }, "pause") }) }), (0, l.jsx)(r.P.button, { whileTap: { scale: 0.9 }, className: "size-6 text-neutral-300", children: (0, l.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: (0, l.jsxs)("g", { fill: "currentColor", children: [(0, l.jsx)("path", { d: "M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" }), (0, l.jsx)("path", { d: "M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" })] }) }) })] })] }) });
}
let u = (e) => {
  let { value: t, onChange: i, max: s2 = 100 } = e, d2 = (0, o.useRef)(null), [u2, x] = (0, o.useState)("middle"), p = (0, a.d)(0), h = (0, a.d)(0), m = (0, a.d)(1), f = () => {
    (0, n.i)(h, 0, { type: "spring", bounce: 0.5 }), x("middle");
  }, C = t / s2 * 100;
  return (0, l.jsx)(r.P.div, { className: "relative h-4 w-full touch-none select-none", onHoverEnd: () => (0, n.i)(m, 1), onHoverStart: () => (0, n.i)(m, 1.05), style: { scale: m, opacity: (0, c.G)(m, [1, 1.05], [0.9, 1]) }, children: (0, l.jsx)(r.P.div, { ref: d2, className: "absolute inset-0 flex h-full w-full cursor-pointer items-center px-1", onPointerMove: (e2) => {
    if (e2.buttons > 0 && d2.current) {
      let t2;
      p.set(e2.clientX);
      let { left: l2, right: r2, width: a2 } = d2.current.getBoundingClientRect();
      e2.clientX < l2 ? (x("left"), t2 = l2 - e2.clientX, i(0)) : e2.clientX > r2 ? (x("right"), t2 = e2.clientX - r2, i(s2)) : (x("middle"), t2 = 0, i(Math.round((e2.clientX - l2) / a2 * s2))), h.set(((e3, t3) => 2 * (1 / (1 + Math.exp(-(e3 / 30))) - 0.5) * t3)(t2, 30));
    }
  }, onPointerUp: f, onClick: (e2) => {
    if (d2.current) {
      let { left: t2, width: l2 } = d2.current.getBoundingClientRect();
      i(Math.round(Math.max(0, Math.min(1, (e2.clientX - t2) / l2)) * s2));
    }
  }, onPointerLeave: f, children: (0, l.jsx)(r.P.div, { className: "relative h-1.5 w-full overflow-hidden rounded-full bg-neutral-700", style: { scaleX: (0, c.G)(() => {
    if (d2.current) {
      let { width: e2 } = d2.current.getBoundingClientRect();
      return 1 + h.get() / e2;
    }
    return 1;
  }), scaleY: (0, c.G)(h, [0, 30], [1, 0.9]), transformOrigin: (0, c.G)(() => {
    if (d2.current) {
      let { left: e2, width: t2 } = d2.current.getBoundingClientRect();
      return p.get() < e2 + t2 / 2 ? "right" : "left";
    }
    return "center";
  }), height: (0, c.G)(m, [1, 1.05], [6, 8]) }, children: (0, l.jsx)(r.P.div, { className: "absolute h-full bg-neutral-300", style: { width: "".concat(C, "%") } }) }) }) });
};
export {
  d as Music
};
