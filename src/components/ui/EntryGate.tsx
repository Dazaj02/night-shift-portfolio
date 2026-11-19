"use client";

import { useEffect, useRef, useState } from "react";
import type { GateItem } from "@/lib/gateItems";
import { GATE_EVENT, GATE_KEY } from "@/lib/gate";
import { buildShape } from "@/lib/gateShapes";
import { startGlitch } from "@/lib/fx";
import { getMotion } from "@/lib/motion";
import { goToSection } from "@/lib/sections";

interface EntryGateProps {
  labels: {
    label: string;
    title: string;
    session: string;
    greeting: string;
    selected: string;
    accessing: string;
    access: string;
    hint: string;
    skip: string;
    sections: string;
    section: string;
  };
  items: GateItem[];
}

const VOID = "#04090d";
const BASE_Z = 4.2;

const VERT = `
uniform float uTime; uniform float uProg; uniform float uSize; uniform float uPx;
attribute float aSeed; attribute vec3 aColor;
varying vec3 vC; varying float vA;
void main() {
  vec3 p = position;
  float wob = sin(uTime * 0.8 + aSeed * 40.0) * 0.012;
  p += normalize(position + vec3(0.001)) * (wob + uProg * uProg * (0.35 + aSeed * 1.5));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = max(uSize * uPx * (0.7 + aSeed * 0.9) * (1.0 + uProg * 0.5) / max(-mv.z, 0.25), 1.0);
  vC = aColor;
  vA = (0.55 + 0.45 * aSeed) * (1.0 - smoothstep(0.85, 1.0, uProg));
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = `
varying vec3 vC; varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vC, vA * smoothstep(0.5, 0.12, d));
}`;

/** Texto que se "escribe" (como la voz del asistente). Se reinicia al cambiar `text` (key). */
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <>
      {text.slice(0, n)}
      <span aria-hidden="true" className="gate-caret" />
    </>
  );
}

const TICKS = Array.from({ length: 120 }, (_, i) => i);

/**
 * Pantalla de entrada estilo asistente de IA: una nube de puntos 3D que toma la silueta de cada
 * sección del portafolio (three.js, cargado bajo demanda). Al elegir una sección en la lista (o
 * con ↑/↓) la nube se transforma; al acceder, la cámara se acerca atravesando la silueta y se
 * salta a esa sección con un glitch. Se muestra una vez por sesión (ver gate.ts) y se puede
 * reabrir con el logo D.AZA. Accesible: lista de botones, "Saltar intro", Esc; sin WebGL funciona.
 */
export function EntryGate({ labels, items }: EntryGateProps) {
  const [gone, setGone] = useState(false);
  const [run, setRun] = useState(0);
  const [selected, setSelected] = useState(0);
  const [accessing, setAccessing] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selRef = useRef(0);
  const accessRef = useRef<number | null>(null);
  const shapeRef = useRef<(i: number) => void>(() => {});
  const skipRef = useRef<() => void>(() => {});
  const doneRef = useRef(false);
  // Selección justo antes de pulsar: en táctil el primer toque solo elige, el segundo accede.
  const preSel = useRef(0);
  const listRef = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    if (accessRef.current !== null) return;
    selRef.current = i;
    setSelected(i);
    setEngaged(true);
  }
  function access(i: number) {
    if (accessRef.current !== null || doneRef.current) return;
    selRef.current = i;
    setSelected(i);
    accessRef.current = i;
    setAccessing(true);
  }

  // Cuando cambia la selección, la nube cambia de silueta.
  useEffect(() => {
    shapeRef.current(selected);
  }, [selected]);

  useEffect(() => {
    const html = document.documentElement;
    // Sin data-gate (ya vista, movimiento en pausa, cambio de idioma) el CSS mantiene oculta la pantalla.
    if (!html.hasAttribute("data-gate")) return;
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      /* sin sessionStorage */
    }

    doneRef.current = false;
    accessRef.current = null;
    selRef.current = 0;
    // El foco entra al diálogo sin marcar ningún botón; con Tab se llega a la lista.
    rootRef.current?.focus({ preventScroll: true });
    let zoom = 0;
    let raf = 0;
    let disposed = false;
    let cleanupThree: (() => void) | null = null;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const motion = getMotion();
    const soft = motion === "soft";
    const zoomS = motion === "off" ? 0.01 : soft ? 0.6 : 1;

    function reveal(id: string | null) {
      html.removeAttribute("data-gate");
      setGone(true);
      if (id && id !== "inicio") goToSection(id as Parameters<typeof goToSection>[0]);
      else window.scrollTo(0, 0);
    }
    function finish(id: string | null) {
      if (doneRef.current) return;
      doneRef.current = true;
      const started = startGlitch("nav", { fromColor: VOID, onPeak: () => reveal(id) });
      if (!started) reveal(id);
    }
    // Avance común del acercamiento (con o sin WebGL).
    function stepZoom(dt: number): number {
      if (accessRef.current !== null && !doneRef.current) {
        zoom = Math.min(1, zoom + dt / zoomS);
        if (zoom >= 1) finish(items[accessRef.current]?.id ?? null);
      }
      return zoom * zoom * (3 - 2 * zoom);
    }
    skipRef.current = () => finish(null);

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
        const px = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(px);
        const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 50);
        const scene = new THREE.Scene();

        const n = window.innerWidth < 700 ? 4000 : 8000;
        const cur = new Float32Array(n * 3);
        let tgt = buildShape(items[0]?.id ?? "inicio", n);
        // Arranque: los puntos llegan desde fuera hacia la silueta.
        for (let i = 0; i < n * 3; i++) cur[i] = tgt[i] * (2.2 + Math.random() * 1.6);
        const col = new Float32Array(n * 3);
        const seed = new Float32Array(n);
        const rate = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          seed[i] = Math.random();
          rate[i] = 2.2 + Math.random() * 4.5;
          const k = Math.random();
          const c = k < 0.04 ? [1, 0.93, 0] : k < 0.2 ? [0.92, 0.98, 1] : k < 0.6 ? [0, 0.94, 1] : [0.2, 0.72, 0.95];
          col.set(c, i * 3);
        }
        const geo = new THREE.BufferGeometry();
        const posAttr = new THREE.BufferAttribute(cur, 3);
        posAttr.setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute("position", posAttr);
        geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
        geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
          uniforms: { uTime: { value: 0 }, uProg: { value: 0 }, uSize: { value: 13 }, uPx: { value: px } },
        });
        const cloud = new THREE.Points(geo, mat);
        cloud.frustumCulled = false;
        scene.add(cloud);

        let baseZ = BASE_Z;
        function resize() {
          const w = window.innerWidth;
          const h = window.innerHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          baseZ = w / h < 0.8 ? 5.8 : BASE_Z;
          camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);

        shapeRef.current = (i) => {
          tgt = buildShape(items[i]?.id ?? "inicio", n);
        };
        shapeRef.current(selRef.current);

        let last = performance.now();
        const speed = soft ? 0.35 : 1;
        const loop = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          const e = stepZoom(dt);
          for (let i = 0; i < n; i++) {
            const f = 1 - Math.exp(-rate[i] * dt * (soft ? 0.5 : 1));
            const k = i * 3;
            cur[k] += (tgt[k] - cur[k]) * f;
            cur[k + 1] += (tgt[k + 1] - cur[k + 1]) * f;
            cur[k + 2] += (tgt[k + 2] - cur[k + 2]) * f;
          }
          posAttr.needsUpdate = true;
          pointer.x += (pointer.tx - pointer.x) * 0.06;
          pointer.y += (pointer.ty - pointer.y) * 0.06;
          mat.uniforms.uTime.value += dt * speed;
          mat.uniforms.uProg.value = e;
          // Vaivén suave (las siluetas se reconocen de frente) y acercamiento atravesando la figura.
          cloud.rotation.y = Math.sin(mat.uniforms.uTime.value * 0.45) * 0.55 + pointer.x * 0.35 + e * 1.4;
          cloud.rotation.x = pointer.y * 0.22;
          camera.position.z = baseZ + (0.45 - baseZ) * e;
          cloud.position.y = baseZ > BASE_Z ? 0.45 : 0;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        cleanupThree = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", resize);
          shapeRef.current = () => {};
          geo.dispose();
          mat.dispose();
          renderer.dispose();
        };
      } catch {
        // Sin WebGL: el acercamiento se calcula igual con un temporizador.
        let last = performance.now();
        const loop = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          stepZoom(dt);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanupThree = () => cancelAnimationFrame(raf);
      }
    })();

    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      cleanupThree?.();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [run, items]);

  useEffect(() => {
    const reopen = () => {
      document.documentElement.setAttribute("data-gate", "1");
      accessRef.current = null;
      setAccessing(false);
      setEngaged(false);
      setSelected(0);
      setGone(false);
      setRun((n) => n + 1);
    };
    window.addEventListener(GATE_EVENT, reopen);
    return () => window.removeEventListener(GATE_EVENT, reopen);
  }, []);

  if (gone) return null;

  const current = items[selected];
  const voice = accessing
    ? `${labels.accessing} ${current?.label}…`
    : engaged
      ? `${labels.selected} ${current?.label}.`
      : labels.greeting;

  function onListKey(e: React.KeyboardEvent) {
    const n = items.length;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = (selected + 1) % n;
    else if (e.key === "ArrowUp") next = (selected - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    listRef.current[next]?.focus();
  }

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="gate"
      role="dialog"
      aria-label={labels.label}
      data-accessing={accessing || undefined}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="gate-canvas" onClick={() => access(selected)} />

      <svg className="gate-rings" viewBox="-50 -50 100 100" aria-hidden="true">
        <circle r="49.6" className="gate-line" />
        <g className="gate-spin-a">
          <circle r="47" className="gate-dash" />
          <circle r="44.5" className="gate-line gate-faint" />
        </g>
        <g className="gate-spin-b">
          {TICKS.map((i) => (
            <line
              key={i}
              x1="0"
              x2="0"
              y1="-41"
              y2={i % 10 === 0 ? -37.5 : i % 5 === 0 ? -38.8 : -39.8}
              transform={`rotate(${i * 3})`}
              className="gate-tick"
            />
          ))}
        </g>
        <g className="gate-spin-c">
          <path d="M 29.5 -20.6 A 36 36 0 0 0 29.5 20.6" className="gate-arc" />
          <path d="M -29.5 20.6 A 36 36 0 0 0 -29.5 -20.6" className="gate-arc" />
          <path d="M 10 -31 A 33 33 0 0 1 31 -10" className="gate-arc gate-arc--thin" />
        </g>
      </svg>
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />

      <div className="gate-ui">
        <span aria-hidden="true" className="gate-corner left-3.5 top-3.5" />
        <span aria-hidden="true" className="gate-corner right-3.5 top-3.5" />
        <span aria-hidden="true" className="gate-corner bottom-3.5 left-3.5" />
        <span aria-hidden="true" className="gate-corner bottom-3.5 right-3.5" />

        <header className="gate-top">
          <p className="gate-title">
            <span aria-hidden="true" className="gate-dot" />
            {labels.title}
          </p>
          <p aria-hidden="true" className="gate-meta">
            {labels.session} 0X7F3A-DA
          </p>
        </header>

        <nav aria-label={labels.sections} className="gate-list" onKeyDown={onListKey}>
          <ul>
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  ref={(el) => {
                    listRef.current[i] = el;
                  }}
                  tabIndex={i === selected ? 0 : -1}
                  aria-current={i === selected || undefined}
                  className="gate-item"
                  data-on={i === selected || undefined}
                  onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                  onFocus={() => select(i)}
                  onPointerDown={() => {
                    preSel.current = selRef.current;
                  }}
                  onClick={(e) => {
                    const before = e.detail === 0 ? selRef.current : preSel.current;
                    if (before === i) access(i);
                    else select(i);
                  }}
                >
                  <span className="gate-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <aside aria-hidden="true" className="gate-panel">
          <p className="gate-kicker">
            {labels.section} {String(selected + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
          </p>
          <p className="gate-name">{current?.label}</p>
          <p className="gate-hintline">{current?.hint}</p>
          <p className="gate-stat">{current?.stat}</p>
        </aside>

        <div className="gate-voice">
          <div aria-hidden="true" className="gate-wave">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} style={{ animationDelay: `${(i * 97) % 700}ms` }} />
            ))}
          </div>
          <p aria-hidden="true" className="gate-line-text">
            <Typed key={voice} text={voice} />
          </p>
          <p role="status" className="sr-only">
            {voice}
          </p>
          <div className="gate-actions">
            <button type="button" className="gate-go" onClick={() => access(selected)}>
              {labels.access}
            </button>
            <button type="button" className="gate-skip" onClick={() => skipRef.current()}>
              {labels.skip}
            </button>
          </div>
          <p className="gate-keys">{labels.hint}</p>
        </div>
      </div>
    </div>
  );
}
