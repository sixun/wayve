// @ts-nocheck
// Restored published demo, adapted for standalone rendering.
import * as a from "react/jsx-runtime";
import * as s from "react";
import * as THREE from "three";
const i = { I9Y: THREE.Vector2, Z58: THREE.Scene, qUd: THREE.OrthographicCamera, GWd: THREE.RGBAFormat, RQf: THREE.FloatType, k6q: THREE.LinearFilter, nWS: THREE.WebGLRenderTarget, BKk: THREE.ShaderMaterial, bdM: THREE.PlaneGeometry, eaF: THREE.Mesh, GOR: THREE.CanvasTexture, ubm: THREE.PerspectiveCamera, Q1f: THREE.Color, HiM: THREE.PointLight, iNn: THREE.BoxGeometry, V9B: THREE.MeshBasicMaterial, G_z: THREE.MeshLambertMaterial, fTw: THREE.GridHelper, tBo: THREE.Raycaster, $p8: THREE.AmbientLight, ZyN: THREE.DirectionalLight };
import { WebGLRenderer } from "three";
const n = { JeP: WebGLRenderer };
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const l = { N: OrbitControls };
let o = (e) => {
  let { className: t = "h-full w-full", backgroundColor: r = "#FC0F49", textColor: o2 = "#7A200B", gridSize: c2 = 1e3, gridDivisions: d2 = 20, gridOpacity: u = 0.3, cubeSize: m = 50, cubeColor: f = "#7A200B", rollOverColor: p = "#7A200B", rollOverOpacity: x = 0.1, cameraPosition: h = { x: 500, y: 500, z: 800 }, enablePan: g = false, enableZoom: b = true, enableRotate: v = true, initialCubesCount: j = 4 } = e, w = (0, s.useRef)(null), y = (0, s.useRef)(null), N = (0, s.useRef)(null), k = (0, s.useRef)(null), S = (0, s.useRef)(null), C = (0, s.useRef)(null), z = (0, s.useRef)(null), P = (0, s.useRef)(null), A = (0, s.useRef)([]), M = (0, s.useRef)(false), E = (0, s.useRef)(null), L = (0, s.useRef)(null), R = (0, s.useRef)(null), I = (0, s.useMemo)(() => ({ backgroundColor: r, textColor: o2, gridSize: c2, gridDivisions: d2, gridOpacity: u, cubeSize: m, cubeColor: f, rollOverColor: p, rollOverOpacity: x, cameraPosition: h, enablePan: g, enableZoom: b, enableRotate: v, initialCubesCount: j }), [r, o2, c2, d2, u, m, f, p, x, h, g, b, v, j]);
  return (0, s.useEffect)(() => {
    if (!w.current) return;
    let e2 = w.current, t2 = e2.querySelector("canvas");
    t2 && e2.removeChild(t2);
    let a2 = new i.ubm(45, window.innerWidth / window.innerHeight, 1, 1e4);
    a2.position.set(h.x, h.y, h.z), a2.lookAt(0, 0, 0);
    let s2 = new i.Z58();
    s2.background = new i.Q1f(r);
    let I2 = new i.iNn(m, m, m), T = new i.V9B({ color: p, opacity: x, transparent: true }), F = new i.eaF(I2, T);
    F.visible = false, s2.add(F);
    let D = new i.iNn(m, m, m), B = new i.G_z({ color: f }), Y = new i.fTw(c2, d2, o2, o2);
    Y.material.opacity = u, Y.material.transparent = true, s2.add(Y);
    let X = new i.tBo(), V = new i.I9Y(), H = new i.bdM(c2, c2);
    H.rotateX(-Math.PI / 2);
    let O = new i.eaF(H, new i.V9B({ visible: false, transparent: true, opacity: 0 }));
    s2.add(O);
    let W = [O], G = new i.$p8(6316128, 3);
    s2.add(G);
    let _ = new i.ZyN(16777215, 3);
    _.position.set(1, 0.75, 0.5).normalize(), s2.add(_);
    let q = new n.JeP({ antialias: true, alpha: true });
    q.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    let U = e2.clientWidth || window.innerWidth, Z = e2.clientHeight || window.innerHeight;
    q.setSize(U, Z), e2.appendChild(q.domElement);
    let K = () => {
      q.render(s2, a2);
    }, J = new l.N(a2, q.domElement);
    J.enablePan = g, J.enableZoom = b, J.enableRotate = v, J.addEventListener("change", K), y.current = q, N.current = s2, k.current = a2, S.current = X, C.current = V, z.current = F, P.current = O, A.current = W, E.current = D, L.current = B;
    let Q = (e3) => {
      let t3 = w.current;
      if (!t3) return;
      let r2 = t3.getBoundingClientRect();
      V.set((e3.clientX - r2.left) / r2.width * 2 - 1, -(2 * ((e3.clientY - r2.top) / r2.height)) + 1), X.setFromCamera(V, a2);
      let s3 = X.intersectObjects(W, false);
      if (s3.length > 0) {
        let e4 = s3[0];
        F.position.copy(e4.point).add(e4.face.normal), F.position.divideScalar(m).floor().multiplyScalar(m).addScalar(m / 2), F.visible = true, K();
      } else F.visible = false, K();
    }, $ = (e3) => {
      let t3 = w.current;
      if (!t3) return;
      let r2 = t3.getBoundingClientRect();
      V.set((e3.clientX - r2.left) / r2.width * 2 - 1, -(2 * ((e3.clientY - r2.top) / r2.height)) + 1), X.setFromCamera(V, a2);
      let n2 = X.intersectObjects(W, false);
      if (n2.length > 0) {
        let e4 = n2[0];
        if (M.current) e4.object !== O && (s2.remove(e4.object), W.splice(W.indexOf(e4.object), 1));
        else {
          let t4 = new i.eaF(D, B);
          t4.position.copy(e4.point).add(e4.face.normal), t4.position.divideScalar(m).floor().multiplyScalar(m).addScalar(m / 2), s2.add(t4), W.push(t4);
        }
        K();
      }
    }, ee = (e3) => {
      16 === e3.keyCode && (M.current = true);
    }, et = (e3) => {
      16 === e3.keyCode && (M.current = false);
    }, er = () => {
      let e3 = w.current;
      if (!e3) return;
      let t3 = e3.clientWidth, r2 = e3.clientHeight;
      a2.aspect = t3 / r2, a2.updateProjectionMatrix(), q.setSize(t3, r2), K();
    };
    q.domElement.addEventListener("pointermove", Q), q.domElement.addEventListener("pointerdown", $), document.addEventListener("keydown", ee), document.addEventListener("keyup", et), window.addEventListener("resize", er);
    for (let e3 = 0; e3 < j; e3++) {
      let e4 = new i.eaF(D, B), t3 = Math.floor(20 * Math.random()) - 10, r2 = Math.floor(20 * Math.random()) - 10;
      e4.position.set(t3 * m + m / 2, m / 2, r2 * m + m / 2), s2.add(e4), W.push(e4);
    }
    return K(), () => {
      q.domElement.removeEventListener("pointermove", Q), q.domElement.removeEventListener("pointerdown", $), document.removeEventListener("keydown", ee), document.removeEventListener("keyup", et), window.removeEventListener("resize", er), J.dispose(), R.current && cancelAnimationFrame(R.current), q.domElement.parentNode && q.domElement.parentNode.removeChild(q.domElement), q.dispose(), D.dispose(), B.dispose(), I2.dispose(), T.dispose(), H.dispose();
    };
  }, [I]), (0, a.jsx)("div", { ref: w, className: t, style: { position: "relative", overflow: "hidden" } });
}, c = () => (0, a.jsxs)("div", { className: "relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#FC0F49] text-[#7A200B]", children: [(0, a.jsxs)("div", { className: "absolute left-4 top-20 z-10 rounded-xl bg-white/10 px-3 py-2 font-mono text-sm text-[#7A200B] backdrop-blur-sm", children: [(0, a.jsx)("strong", { children: "Click" }), ": add cube ", (0, a.jsx)("strong", { children: "Shift + Click" }), ": remove cube"] }), (0, a.jsx)("div", { className: "absolute top-0 h-full w-full", children: (0, a.jsx)(o, {}) }), (0, a.jsx)("div", { className: "pointer-events-none absolute bottom-0 left-0 h-2/3 w-full bg-gradient-to-t from-[#FC0F49] via-[#FC0F49]/50 to-transparent" }), (0, a.jsx)("div", { className: "z-9 mb-15 absolute bottom-6 flex w-full flex-col items-center justify-center gap-5 text-[#7A200B]", children: (0, a.jsxs)("div", { className: "relative", children: [(0, a.jsxs)("p", { className: "absolute right-0 top-0 text-right text-sm font-semibold leading-[1.1] tracking-tighter", children: ["click on the grid to start adding ", (0, a.jsx)("br", {}), "blocks to the canvas"] }), (0, a.jsx)(d, { className: "w-90 text-[#621807]" })] }) })] }), d = (e) => {
  let { className: t } = e;
  return (0, a.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: t, viewBox: "0 0 358 146", children: (0, a.jsx)("path", { fillRule: "evenodd", fill: "currentColor", d: "M7.643 128.876c0 5.422 1.812 14.458 7.247 15.543 5.434 1.084 90.94 9.397 99.636-46.989.178-1.159 3.222-1.084 3.623-.361 2.916 5.256 7.202 24.948-2.174 28.916-11.956 5.06-11.594 8.313-11.956 11.566-.363 3.253 1.811 7.229 6.159 7.229s47.101 2.169 52.898.723c5.797-1.446 5.797-9.036 3.26-13.936-2.536-4.899-12.318-2.53-14.13-7.59-1.811-5.06-1.811-34.86.725-40.643 2.536-5.783 6.159-6.145 9.058-4.699 2.898 1.446 3.985 2.272 6.884 1.968 2.898-.304 2.536-2.69 6.521-2.69 3.986 0 5.073 10.843 15.58 10.12 10.507-.723 13.768-4.7 13.768-10.12 0-5.423 3.623-10.483 9.057-11.206 5.435-.723 13.044 5.783 13.044 11.205s1.087 8.675-1.812 13.735c-2.898 5.06-48.806-8.041-54.709 23.856-4.348 23.494 15.942 29.277 29.347 29.277 13.406 0 23.551-6.867 32.608-8.313 9.058-1.446 9.783 6.506 20.652 6.506 6.543 0 10.328-3.929 12.859-9.579 1.29-2.881 5.923-2.885 6.683.179.811 3.267 1.493 6.051 1.994 8.105a5.01 5.01 0 0 0 4.869 3.825h8.843a10 10 0 0 0 9.602-7.206l3.376-11.601a5.001 5.001 0 0 1 4.801-3.603h1.83a5 5 0 0 1 4.687 3.257l4.699 12.638a10 10 0 0 0 9.373 6.515h6.296a4.98 4.98 0 0 0 4.912-4.047c2.772-14.581 12.184-63.721 13.725-66.797C353.29 71.045 358 64.9 358 60.201c0-4.699-.362-6.506-3.261-8.313-2.898-1.807-23.188-3.253-26.449-1.085-3.26 2.17-3.623 4.338-2.898 7.59.724 3.254 4.348 13.013 4.71 16.266.188 1.685-.694 11.61-1.587 20.79-.324 3.323-4.974 3.671-5.809.438l-6.271-24.266a8 8 0 0 0-7.746-5.998h-6.717a8 8 0 0 0-7.774 6.112l-6.039 24.876c-.78 3.216-5.32 2.973-5.707-.313-1.029-8.73-1.997-18.48-1.625-21.639.725-6.145 7.609-14.458 7.247-17.71-.363-3.254-.363-4.7-5.073-6.146-4.71-1.445-24.275 0-27.536 1.085-.54.18-1.031.538-1.473 1.011-2.302 2.46-6.595 3.877-9.189 1.728-22.44-18.59-51.839-4.876-57.815-.57-4.205 3.03-4.348-1.446-11.594-3.254-7.246-1.807-15.579 3.615-20.289 3.615-4.71 0-1.45-12.29-15.217-9.76-13.768 2.53-23.064 15.543-23.913 9.76C109.816 12.49 82.28-8.836 10.18 3.454c0 0-10.87 2.891-10.145 10.12.724 7.23 2.236 14.453 11.231 14.458 8.996.006 12.681 88.194 5.797 90.001-6.884 1.807-9.42 5.422-9.42 10.843Zm242.388-50.964c-.725 2.169-.363 25.302 0 30 .196 2.546 6.667 2.652 12.152 4.053 1.856.474 4.394-1.544 3.904-3.396-4.412-16.704-9.058-32.84-10.622-33.187-3.26-.723-4.71.361-5.434 2.53Zm-31.159 32.169c-4.348-1.807-13.406 2.53-14.13 6.868-.725 4.337 2.898 5.421 4.71 5.421 1.811 0 7.971-1.084 10.507-4.337 2.536-3.253 3.261-6.145-1.087-7.952ZM86.627 74.243c0-46.21-40.36-46.7-39.492-29.584.868 17.115-4.71 65.258 7.609 61.753 12.319-3.505 31.883 8.226 31.883-32.169Z", clipRule: "evenodd" }) });
};
export {
  c as Wayve36
};
