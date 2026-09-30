// @ts-nocheck
// Restored published demo, adapted for standalone rendering.
import * as a from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
const s = { A: ArrowRight };
import * as i from "react";
import * as THREE from "three";
const n = { I9Y: THREE.Vector2, Z58: THREE.Scene, qUd: THREE.OrthographicCamera, GWd: THREE.RGBAFormat, RQf: THREE.FloatType, k6q: THREE.LinearFilter, nWS: THREE.WebGLRenderTarget, BKk: THREE.ShaderMaterial, bdM: THREE.PlaneGeometry, eaF: THREE.Mesh, GOR: THREE.CanvasTexture, ubm: THREE.PerspectiveCamera, Q1f: THREE.Color, HiM: THREE.PointLight, iNn: THREE.BoxGeometry, V9B: THREE.MeshBasicMaterial, G_z: THREE.MeshLambertMaterial, fTw: THREE.GridHelper, tBo: THREE.Raycaster, $p8: THREE.AmbientLight, ZyN: THREE.DirectionalLight };
import { WebGLRenderer } from "three";
const l = { JeP: WebGLRenderer };
let o = (e) => {
  let { imagePath: t = "/wayve/media/liquid-logo.avif", text: r } = e, s2 = (0, i.useRef)(null), o2 = (0, i.useRef)(null), c2 = (0, i.useRef)(null), d = (0, i.useRef)(null), u = (0, i.useRef)(null), m = (0, i.useRef)(new n.I9Y()), f = (0, i.useRef)(0), p = (0, i.useRef)(null), x = (0, i.useRef)(null), h = (0, i.useRef)(null), g = (0, i.useRef)(null), b = (0, i.useRef)(null), v = (0, i.useRef)(null);
  return (0, i.useEffect)(() => {
    if (!s2.current) return;
    let e2 = new n.Z58(), a2 = new n.Z58(), i2 = new n.qUd(-1, 1, 1, -1, 0, 1), j = new l.JeP({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    j.setPixelRatio(Math.min(window.devicePixelRatio, 2)), j.setSize(window.innerWidth, window.innerHeight), s2.current.appendChild(j.domElement);
    let w = new n.I9Y(), y = 0, N = window.innerWidth * window.devicePixelRatio, k = window.innerHeight * window.devicePixelRatio, S = { format: n.GWd, type: n.RQf, minFilter: n.k6q, magFilter: n.k6q, stencilBuffer: false, depthBuffer: false }, C = new n.nWS(N, k, S), z = new n.nWS(N, k, S), P = new n.BKk({ uniforms: { textureA: { value: null }, mouse: { value: w }, resolution: { value: new n.I9Y(N, k) }, time: { value: 0 }, frame: { value: 0 } }, vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n", fragmentShader: "\nuniform sampler2D textureA;\nuniform vec2 mouse;\nuniform vec2 resolution;\nuniform float time;\nuniform int frame;\nvarying vec2 vUv;\n\nconst float delta = 1.4;  \n\nvoid main() {\n    vec2 uv = vUv;\n    if (frame == 0) {\n        gl_FragColor = vec4(0.0);\n        return;\n    }\n    \n    vec4 data = texture2D(textureA, uv);\n    float pressure = data.x;\n    float pVel = data.y;\n    \n    vec2 texelSize = 1.0 / resolution;\n    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;\n    float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;\n    float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;\n    float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;\n    \n    if (uv.x <= texelSize.x) p_left = p_right;\n    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;\n    if (uv.y <= texelSize.y) p_down = p_up;\n    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;\n    \n    // Enhanced wave equation matching ShaderToy\n    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;\n    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;\n    \n    pressure += delta * pVel;\n    \n    pVel -= 0.005 * delta * pressure;\n    \n    pVel *= 1.0 - 0.002 * delta;\n    pressure *= 0.999;\n    \n    // Mouse interaction\n    vec2 mouseUV = mouse / resolution;\n    if(mouse.x > 0.0) {\n        float dist = distance(uv, mouseUV);\n        if(dist <= 0.02) {  // Smaller radius for more precise ripples\n            pressure += 2.0 * (1.0 - dist / 0.02);  // Increased intensity\n        }\n    }\n    \n    \n    gl_FragColor = vec4(pressure, pVel, \n        (p_right - p_left) / 2.0, \n        (p_up - p_down) / 2.0);\n}\n" }), A = new n.BKk({ uniforms: { textureA: { value: null }, textureB: { value: null } }, vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n", fragmentShader: "\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 data = texture2D(textureA, vUv);\n    \n    vec2 distortion = 0.3 * data.zw;\n    vec4 color = texture2D(textureB, vUv + distortion);\n    \n    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));\n    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));\n    float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;\n    \n    gl_FragColor = color + vec4(specular);\n}\n", transparent: true }), M = new n.bdM(2, 2), E = new n.eaF(M, P), L = new n.eaF(M, A);
    a2.add(E), e2.add(L);
    let R = document.createElement("canvas");
    R.width = N, R.height = k;
    let I = R.getContext("2d", { alpha: true });
    if (I) {
      I.fillStyle = "#000000", I.fillRect(0, 0, N, k);
      let s3 = new n.GOR(R);
      s3.minFilter = n.k6q, s3.magFilter = n.k6q, s3.format = n.GWd, o2.current = j, c2.current = e2, d.current = a2, u.current = i2, m.current = w, f.current = y, p.current = C, x.current = z, h.current = P, g.current = A, b.current = s3;
      let l2 = () => {
        window.addEventListener("resize", () => {
          let e3 = window.innerWidth * window.devicePixelRatio, a3 = window.innerHeight * window.devicePixelRatio;
          if (j.setSize(window.innerWidth, window.innerHeight), C.setSize(e3, a3), z.setSize(e3, a3), P.uniforms.resolution.value.set(e3, a3), R.width = e3, R.height = a3, I.fillStyle = "#000000", I.fillRect(0, 0, e3, a3), t) {
            let r2 = new Image();
            r2.crossOrigin = "anonymous", r2.onload = () => {
              let t2, i3, n3, l3, o3 = e3 / a3, c3 = r2.width / r2.height;
              c3 > o3 ? (i3 = (t2 = 0.5 * e3) / c3, n3 = (e3 - t2) / 2) : (i3 = 0.5 * a3, n3 = (e3 - (t2 = a3 * c3)) / 2), l3 = (a3 - i3) / 2, I.drawImage(r2, n3, l3, t2, i3), s3.needsUpdate = true;
            }, r2.src = t;
          } else if (r) {
            let t2 = Math.round(250 * window.devicePixelRatio);
            I.fillStyle = "#ffffff", I.font = "bold ".concat(t2, "px Arial"), I.textAlign = "center", I.textBaseline = "middle", I.fillText(r, e3 / 2, a3 / 2), s3.needsUpdate = true;
          }
        }), j.domElement.addEventListener("mousemove", (e3) => {
          w.x = e3.clientX * window.devicePixelRatio, w.y = (window.innerHeight - e3.clientY) * window.devicePixelRatio;
        }), j.domElement.addEventListener("mouseleave", () => {
          w.set(0, 0);
        });
        let n2 = () => {
          P.uniforms.frame.value = y++, P.uniforms.time.value = performance.now() / 1e3, P.uniforms.textureA.value = C.texture, j.setRenderTarget(z), j.render(a2, i2), A.uniforms.textureA.value = z.texture, A.uniforms.textureB.value = s3, j.setRenderTarget(null), j.render(e2, i2);
          let t2 = C;
          C = z, z = t2, v.current = requestAnimationFrame(n2);
        };
        n2();
      };
      return (() => {
        if (t) {
          let e3 = new Image();
          e3.crossOrigin = "anonymous", e3.onload = () => {
            let t2, r2, a3, i3, n2 = N / k, o3 = e3.width / e3.height;
            o3 > n2 ? (r2 = (t2 = 0.5 * N) / o3, a3 = (N - t2) / 2) : a3 = (N - (t2 = (r2 = 0.5 * k) * o3)) / 2, i3 = (k - r2) / 2, I.drawImage(e3, a3, i3, t2, r2), s3.needsUpdate = true, l2();
          }, e3.src = t;
        } else if (r) {
          let e3 = Math.round(250 * window.devicePixelRatio);
          I.fillStyle = "#ffffff", I.font = "bold ".concat(e3, "px Arial"), I.textAlign = "center", I.textBaseline = "middle", I.textRendering = "geometricPrecision", I.imageSmoothingEnabled = true, I.imageSmoothingQuality = "high", I.fillText(r, N / 2, k / 2), s3.needsUpdate = true, l2();
        } else l2();
      })(), () => {
        v.current && cancelAnimationFrame(v.current), j.dispose(), C.dispose(), z.dispose(), s3.dispose();
      };
    }
  }, [t, r]), (0, a.jsx)("div", { ref: s2, className: "scale-200 absolute inset-0 left-0 md:scale-100" });
}, c = () => (0, a.jsxs)("div", { className: "relative flex h-full w-full flex-col justify-end overflow-hidden text-white", children: [(0, a.jsx)(o, { imagePath: "/wayve/media/liquid-logo.avif" }), (0, a.jsxs)("div", { className: "pointer-events-none absolute bottom-0 w-full w-screen p-10", children: [(0, a.jsx)("h1", { className: "font-geist mb-10 max-w-xl pr-3 text-4xl font-medium leading-[0.9] tracking-tighter md:text-5xl lg:text-6xl", children: "Vercel's one-day event for developers and bussiness leaders" }), (0, a.jsxs)("div", { className: "flex w-full flex-col items-start gap-5 lg:flex-row lg:justify-between", children: [(0, a.jsxs)("div", { className: "flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center", children: [(0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["punjab, india ", (0, a.jsx)("br", {}), "and online"] }), (0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["sep 1, 2025 ", (0, a.jsx)("br", {}), " the Moosa pind"] })] }), (0, a.jsxs)("div", { className: "flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center", children: [(0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["onilne ", (0, a.jsx)("br", {}), " free"] }), (0, a.jsxs)("p", { className: "font-geist-mono w-fit text-sm", children: ["in person tickets ", (0, a.jsx)("br", {}), " $600"] }), (0, a.jsxs)("button", { className: "font-geist-mono flex items-center gap-2 bg-white px-4 py-2 text-sm uppercase text-black", children: ["get tickets", (0, a.jsx)(s.A, { className: "h-4 w-4" })] })] })] })] })] });
export {
  o as LiquidSimulation,
  c as Wayve12
};
