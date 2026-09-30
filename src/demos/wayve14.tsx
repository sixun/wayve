// @ts-nocheck
// Restored published demo, adapted for standalone rendering.
import * as a from "react/jsx-runtime";
import * as s from "react";
import * as THREE from "three";
const i = { I9Y: THREE.Vector2, Z58: THREE.Scene, qUd: THREE.OrthographicCamera, GWd: THREE.RGBAFormat, RQf: THREE.FloatType, k6q: THREE.LinearFilter, nWS: THREE.WebGLRenderTarget, BKk: THREE.ShaderMaterial, bdM: THREE.PlaneGeometry, eaF: THREE.Mesh, GOR: THREE.CanvasTexture, ubm: THREE.PerspectiveCamera, Q1f: THREE.Color, HiM: THREE.PointLight, iNn: THREE.BoxGeometry, V9B: THREE.MeshBasicMaterial, G_z: THREE.MeshLambertMaterial, fTw: THREE.GridHelper, tBo: THREE.Raycaster, $p8: THREE.AmbientLight, ZyN: THREE.DirectionalLight };
import { WebGLRenderer } from "three";
const n = { JeP: WebGLRenderer };
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
const l = { V: TrackballControls };
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
const o = { f: AsciiEffect };
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const c = { B: GLTFLoader };
let d = (e) => {
  let { modelPath: t = "/wayve/media/car.glb", className: r = "h-[60vh] w-full", asciiChars: d2 = " .:-+*=%@#", invert: u2 = true, fontSize: m = "2px", lineHeight: f = "2px", modelScale: p = 6, rotationSpeed: x = 1e-3, cameraPosition: h = { x: 0, y: 7.5, z: 25 }, enableZoom: g = false, enablePan: b = false, enableRotate: v = true, rotateSpeed: j = 1, backgroundColor: w = "black", textColor: y = "white", fontFamily: N = "monospace" } = e, k = (0, s.useRef)(null), S = (0, s.useRef)(null), C = (0, s.useRef)(null), z = (0, s.useRef)(null), P = (0, s.useRef)(null), A = (0, s.useRef)(null), M = (0, s.useRef)(null), E = (0, s.useRef)(null), L = (0, s.useRef)(Date.now());
  return (0, s.useEffect)(() => {
    if (!k.current) return;
    let e2 = k.current, r2 = e2.clientWidth, a2 = e2.clientHeight, s2 = new i.ubm(70, r2 / a2, 1, 1e3);
    s2.position.set(h.x, h.y, h.z), C.current = s2;
    let R = new i.Z58();
    R.background = new i.Q1f(0, 0, 0), S.current = R;
    let I = new i.HiM(16777215, 3, 0, 0);
    I.position.set(500, 500, 500), R.add(I);
    let T = new i.HiM(16777215, 1, 0, 0);
    T.position.set(-500, -500, -500), R.add(T), new c.B().load(t, (e3) => {
      R.add(e3.scene), M.current = e3.scene, e3.scene.position.set(0, 0, 0), e3.scene.scale.set(p, p, p), e3.scene.rotation.set(0, 0, 0);
    }, void 0, (e3) => {
      console.error("Error loading GLTF model:", e3);
    });
    let F = new n.JeP();
    F.setSize(r2, a2), z.current = F;
    let D = new o.f(F, d2, { invert: u2 });
    D.setSize(r2, a2), D.domElement.style.color = y, D.domElement.style.backgroundColor = w, D.domElement.style.fontFamily = N, D.domElement.style.fontSize = m, D.domElement.style.lineHeight = f, D.domElement.style.pointerEvents = "auto", D.domElement.style.cursor = "grab", D.domElement.style.userSelect = "none", D.domElement.style.webkitUserSelect = "none", P.current = D, e2.appendChild(D.domElement);
    let B = new l.V(s2, D.domElement);
    B.enableZoom = g, B.enablePan = b, B.enableRotate = v, B.rotateSpeed = j, B.noZoom = !g, B.noPan = !b, A.current = B;
    let Y = () => {
      let e3 = Date.now() - L.current;
      M.current && (M.current.rotation.y = e3 * x), B.update(), D.render(R, s2), E.current = requestAnimationFrame(Y);
    }, X = () => {
      D.domElement && (D.domElement.style.cursor = "grabbing");
    }, V = () => {
      D.domElement && (D.domElement.style.cursor = "grab");
    };
    D.domElement.addEventListener("mousedown", X), D.domElement.addEventListener("mouseup", V), D.domElement.addEventListener("mouseleave", V), Y();
    let H = () => {
      if (!e2 || !C.current || !P.current) return;
      let t2 = e2.clientWidth, r3 = e2.clientHeight;
      C.current.aspect = t2 / r3, C.current.updateProjectionMatrix(), P.current.setSize(t2, r3);
    };
    return window.addEventListener("resize", H), () => {
      window.removeEventListener("resize", H), P.current && (P.current.domElement.removeEventListener("mousedown", X), P.current.domElement.removeEventListener("mouseup", V), P.current.domElement.removeEventListener("mouseleave", V)), E.current && cancelAnimationFrame(E.current), A.current && A.current.dispose(), z.current && z.current.dispose(), e2 && P.current && e2.removeChild(P.current.domElement);
    };
  }, [t, d2, u2, m, f, p, x, h, g, b, v, j, w, y, N]), (0, a.jsx)("div", { ref: k, className: r, style: { position: "relative", overflow: "hidden" } });
}, u = () => (0, a.jsxs)("div", { className: "relative flex h-full w-screen flex-col overflow-hidden bg-[#f5f5f0] p-2", children: [(0, a.jsx)(d, { modelPath: "/wayve/media/car.glb" }), (0, a.jsxs)("div", { className: "mt-auto w-full translate-y-2 bg-[#f5f5f0] text-[#121212]", children: [(0, a.jsx)("h1", { className: "font-geist text-center text-[17vw] font-bold leading-[0.9] tracking-tighter", children: "wayve" }), (0, a.jsxs)("div", { className: "flex w-full flex-col items-start gap-5 px-4 pb-4 lg:flex-row lg:justify-between lg:px-10", children: [(0, a.jsxs)("div", { className: "flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center", children: [(0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["punjab, india ", (0, a.jsx)("br", {}), "and online"] }), (0, a.jsxs)("p", { className: "font-geist-mono w-fit text-right text-sm lg:text-left", children: ["sep 1, 2025 ", (0, a.jsx)("br", {}), " the Moosa pind"] })] }), (0, a.jsxs)("div", { className: "flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center", children: [(0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["onilne ", (0, a.jsx)("br", {}), " free"] }), (0, a.jsxs)("p", { className: "font-geist-mono w-fit text-right text-sm lg:text-left", children: ["in person tickets ", (0, a.jsx)("br", {}), " $600"] })] })] })] })] });
export {
  d as AsciiSimulation,
  u as Wayve14
};
