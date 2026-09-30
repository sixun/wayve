// @ts-nocheck
// Restored state views from the purchased component’s published demo.
import * as l from "react/jsx-runtime";
import { motion as dependency28548 } from "framer-motion";
const r = { P: dependency28548 };
function s() {
  return (0, l.jsxs)(r.P.div, { initial: { opacity: 0, filter: "blur(4px)" }, animate: { opacity: 1, filter: "blur(0px)" }, transition: { type: "spring", bounce: 0.35 }, exit: { opacity: 0, filter: "blur(4px)" }, className: "relative flex h-7 w-[220px] items-center justify-between rounded-full px-2.5 shadow-sm", children: [(0, l.jsx)("div", { className: "flex items-center gap-1 font-medium", children: (0, l.jsx)("p", { className: "text-xs font-semibold tabular-nums text-white", children: "Low Battery" }) }), (0, l.jsxs)(r.P.div, { initial: { opacity: 0, filter: "blur(4px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(4px)" }, transition: { type: "spring", bounce: 0.35 }, className: "flex h-[18px] items-center justify-end gap-0.5 rounded-full", children: [(0, l.jsx)("p", { className: "text-xs font-semibold tabular-nums text-[#E65B4F]", children: "20%" }), (0, l.jsx)("div", { className: "relative ml-1 h-[10px] w-[20px] overflow-hidden rounded-[3px] bg-[#e2857c]/50", children: (0, l.jsx)(r.P.div, { initial: { width: "100%" }, animate: { width: "30%" }, transition: { delay: 0.5, bounce: 0.5 }, className: "h-full bg-[#E65B4F]" }) }), (0, l.jsx)("div", { className: "relative h-[5px] w-[2px] overflow-hidden rounded-[3px] bg-[#e2857c]/50" })] })] });
}
export {
  s as LowBattery
};
