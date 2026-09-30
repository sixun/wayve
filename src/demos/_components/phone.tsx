// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
import * as s from "react";
import * as a from "./island-icons";
function n() {
  let [e, t] = (0, s.useState)(true), [i, n2] = (0, s.useState)(1), c = () => Array.from({ length: 18 }, () => 0.8 * Math.random() + 0.2), [o, d] = (0, s.useState)(c()), [u, x] = (0, s.useState)(c());
  return (0, s.useEffect)(() => {
    if (e) {
      let e2 = setInterval(() => {
        d(c()), x(c());
      }, 100), t2 = setInterval(() => {
        n2((e3) => e3 + 1);
      }, 1e3);
      return () => {
        clearInterval(e2), clearInterval(t2);
      };
    }
  }, [e]), (0, l.jsxs)(r.P.div, { initial: { opacity: 0, filter: "blur(4px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(4px)" }, className: "relative flex h-7 w-[220px] items-center justify-between rounded-full px-2.5 shadow-sm", children: [(0, l.jsxs)("div", { className: "flex items-center gap-1 font-medium", children: [(0, l.jsx)(r.P.div, { animate: { rotate: [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0] }, children: (0, l.jsx)(a.Icons.phone, { className: "size-4 text-[#2FD057]" }) }), (0, l.jsx)("span", { className: "text-xs font-semibold tabular-nums text-[#2FD057]", children: ((e2) => {
    let t2 = Math.floor(e2 / 60);
    return "".concat(t2.toString().padStart(2, "0"), ":").concat((e2 % 60).toString().padStart(2, "0"));
  })(i) })] }), (0, l.jsx)(r.P.div, { initial: { opacity: 0, filter: "blur(4px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(4px)" }, transition: { type: "spring", bounce: 0.35 }, className: "absolute right-4 z-20 flex h-[18px] w-full items-center justify-end gap-0.5 rounded-full", children: o.map((e2, t2) => (0, l.jsx)(r.P.div, { className: "w-[1px] rounded-full bg-[#2FD057]", initial: { height: 0 }, animate: { height: Math.max(0, 14 * e2) }, transition: { type: "spring", stiffness: 300, damping: 10 } }, t2)) })] });
}
export {
  n as Phone
};
