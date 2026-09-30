// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import { AnimatePresence as dependency97162 } from "framer-motion";
const s = { N: dependency97162 };
import * as a from "react";
function n() {
  let [e, t] = (0, a.useState)(false), [i, n2] = (0, a.useState)(0), [o, d] = (0, a.useState)(false), [u, x] = (0, a.useState)("idle");
  return (0, a.useEffect)(() => {
    let e2 = null;
    return o && (e2 = setInterval(() => {
      n2((e3) => e3 + 1);
    }, 1e3)), () => {
      e2 && clearInterval(e2);
    };
  }, [o]), (0, a.useEffect)(() => {
    e ? d(true) : d(false);
  }, [e]), (0, l.jsxs)(r.P.div, { transition: { type: "spring", bounce: 0.5 }, className: "flex w-72 items-center justify-between gap-2 p-4", children: [(0, l.jsxs)("div", { className: "gap-2 space-y-1 text-white", children: [(0, l.jsxs)(r.P.div, { animate: e ? { opacity: e ? [0.5, 1, 0.5] : 1 } : {}, transition: e ? { duration: 1, repeat: 1 / 0, ease: "easeInOut" } : {}, className: "flex items-center gap-1", children: [(0, l.jsx)("div", { className: "size-3 rounded-full bg-red-500" }), (0, l.jsx)("p", { className: "text-red-500", children: ((e2) => {
    let t2 = Math.floor(e2 / 60), i2 = e2 % 60;
    return "".concat(t2, ":").concat(i2 < 10 ? "0" + i2 : i2);
  })(i) })] }), (0, l.jsx)("div", { className: "w-30 relative flex h-5 items-center justify-center", children: (0, l.jsx)(s.N, { initial: false, mode: "popLayout", children: "saved" !== u ? (0, l.jsx)(r.P.h1, { initial: { opacity: 0, scale: 0.85, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.85, filter: "blur(4px)" }, transition: { type: "spring", duration: 1.5, bounce: 0.5 }, className: "absolute w-full text-sm", children: "Screen Recording" }, "screeeeen") : (0, l.jsx)(r.P.h1, { initial: { opacity: 0, scale: 0.85, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.85, filter: "blur(4px)" }, transition: { type: "spring", duration: 1.5, bounce: 0.5 }, className: "absolute w-full text-sm", children: "Recording Saved" }, "screeeeeeeeen") }) })] }), (0, l.jsx)("div", { className: "flex justify-end", children: (0, l.jsx)(c, { recording: e, setRecording: t, recordingState: u, setRecordingState: x }) })] });
}
function c(e) {
  let { setRecording: t, recordingState: i, setRecordingState: s2 } = e;
  return (0, a.useEffect)(() => {
    let e2 = setTimeout(() => {
      s2("record"), t(true);
    }, 1e3), i2 = setTimeout(() => {
      s2("saved"), t(false);
    }, 12500);
    return () => {
      clearTimeout(e2), clearTimeout(i2);
    };
  }, []), (0, l.jsx)(r.P.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, bounce: 0.5 }, className: "relative", children: (0, l.jsxs)(r.P.div, { initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, transition: { type: "spring", duration: 1, bounce: 0.5 }, className: "relative flex size-10 cursor-pointer items-center justify-center", whileTap: { scale: 0.9 }, onClick: () => {
    s2("saved"), t(false);
  }, children: [(0, l.jsx)("svg", { className: "relative z-10 size-10 text-white", viewBox: "0 0 50 50", children: (0, l.jsx)(r.P.circle, { strokeLinecap: "round", initial: { rotate: 0, pathLength: 0.93, pathOffset: 0 }, animate: { rotate: 360 * ("record" === i), pathLength: "record" === i ? 0.93 : 1, opacity: "idle" === i ? 1 : 0.5, transition: { rotate: "record" === i ? { repeat: 1 / 0, duration: 1.5, ease: "linear" } : { duration: 0 } } }, strokeWidth: 3, stroke: "currentColor", fill: "transparent", r: 23.5, cx: 25, cy: 25 }) }), (0, l.jsx)(r.P.div, { initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, animate: { opacity: "record" === i ? 0.7 : 1, scale: "saved" === i ? 3.5 : 1.2, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" }, transition: { type: "spring", duration: 1, bounce: 0.5 }, className: "absolute z-20 size-3.5 overflow-hidden rounded-sm bg-red-500", children: "saved" === i && (0, l.jsx)("img", { src: "/wayve/media/island/japan.webp", alt: "japan" }) })] }, "latest") });
}
export {
  n as ScreenRecord
};
