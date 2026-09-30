// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import * as s from "react";
function a() {
  let [e, t] = (0, s.useState)(true), [i, a2] = (0, s.useState)(1), n = () => Array.from({ length: 16 }, () => 0.8 * Math.random() + 0.2), [c, o] = (0, s.useState)(n());
  return (0, s.useEffect)(() => {
    if (e) {
      let e2 = setInterval(() => {
        o(n());
      }, 100), t2 = setInterval(() => {
        a2((e3) => e3 + 1);
      }, 1e3);
      return () => {
        clearInterval(e2), clearInterval(t2);
      };
    }
  }, [e]), (0, l.jsxs)(r.P.div, { className: "relative flex h-7 w-[200px] items-center justify-between rounded-full px-2.5 shadow-sm", children: [(0, l.jsx)(r.P.div, { initial: { opacity: 0, filter: "blur(4px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(4px)" }, transition: { type: "spring", bounce: 0.35 }, className: "flex h-[18px] w-full items-center gap-0.5 rounded-full", children: c.map((e2, t2) => (0, l.jsx)(r.P.div, { className: "w-[3px] rounded-full bg-[#FD4F30]", initial: { height: 4 }, animate: { height: Math.max(4, 14 * e2) }, transition: { type: "spring", stiffness: 300, damping: 10 } }, t2)) }), (0, l.jsx)("div", { className: "ml-auto flex items-center", children: (0, l.jsx)("span", { className: "text-xs font-medium tabular-nums text-[#FD4F30]", children: ((e2) => {
    let t2 = Math.floor(e2 / 60);
    return "".concat(t2.toString().padStart(2, "0"), ":").concat((e2 % 60).toString().padStart(2, "0"));
  })(i) }) })] });
}
export {
  a as Record
};
