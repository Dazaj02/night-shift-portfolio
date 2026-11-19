"use client";

import { useEffect, useRef, useState } from "react";
import { GATE_KEY } from "@/lib/gate";
import { startGlitch } from "@/lib/fx";
import { getMotion } from "@/lib/motion";

interface EntryGateProps {
  labels: { label: string; session: string; hold: string; hint: string; skip: string };
}

/** Segundos de pulsación para entrar y de retroceso al soltar. */
const HOLD_S = 1.5;
const DECAY_S = 0.9;
const VOID = "#0a0a0c";

const VERT = `
uniform float uTime; uniform float uProg; uniform float uSize; uniform float uPx;
attribute float aSeed; attribute vec3 aColor;
varying vec3 vC; varying float vA;
void main() {
  vec3 p = position;
  float wob = sin(uTime * 0.8 + aSeed * 40.0) * 0.025;
  p += normalize(position) * (wob + uProg * uProg * (0.45 + aSeed * 1.7));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * uPx * (0.7 + aSeed * 0.9) * (1.0 + uProg * 0.7) / (-mv.z);
  vC = aColor;
  vA = (0.5 + 0.5 * aSeed) * (1.0 - smoothstep(0.82, 1.0, uProg) * 0.6);
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = `
varying vec3 vC; varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vC, vA * smoothstep(0.5, 0.15, d));
}`;

/**
 * Pantalla de entrada: una nube de puntos 3D (three.js, cargado bajo demanda) y un "mantén
 * pulsado para entrar". Al mantener, el contador sube y la nube se expande; al soltar, retrocede.
 * Al llegar a 100 % hay un glitch de pantalla y se revela el portafolio. Se muestra una vez por
 * sesión (ver gate.ts). Accesible: botón enfocable (Espacio/Enter mantenidos), "Saltar" y Esc.
 */
export function EntryGate({ labels }: EntryGateProps) {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const holdRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    // Sin data-gate (ya vista, movimiento en pausa, cambio de idioma) el CSS mantiene oculta la pantalla.
    if (!html.hasAttribute("data-gate")) return;
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      /* sin sessionStorage */
    }

    let progress = 0;
    let done = false;
    let raf = 0;
    let disposed = false;
    let cleanupThree: (() => void) | null = null;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const soft = getMotion() === "soft";

    function reveal() {
      html.removeAttribute("data-gate");
      setGone(true);
    }
    function finish() {
      if (done) return;
      done = true;
      holdRef.current = false;
      const started = startGlitch("nav", { fromColor: VOID, onPeak: reveal });
      if (!started) reveal();
    }
    finishRef.current = finish;

    function paint() {
      if (pctRef.current) pctRef.current.textContent = `${Math.round(progress * 100)}%`;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
        barRef.current.setAttribute("aria-valuenow", String(Math.round(progress * 10) * 10));
      }
    }

    // Escena 3D (opcional: si no hay WebGL, la pantalla funciona igual solo con texto).
    (async () => {
      try {
        const THREE = await import("three");
        if (disposed || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
        const px = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(px);
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
        camera.position.z = 4.2;
        const scene = new THREE.Scene();

        const n = window.innerWidth < 700 ? 3500 : 7000;
        const pos = new Float32Array(n * 3);
        const col = new Float32Array(n * 3);
        const seed = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const u = Math.random() * 2 - 1;
          const a = Math.random() * Math.PI * 2;
          const s = Math.sqrt(1 - u * u);
          const r = 0.4 + 0.6 * Math.pow(Math.random(), 0.55);
          pos.set([s * Math.cos(a) * r, u * r, s * Math.sin(a) * r], i * 3);
          seed[i] = Math.random();
          const k = Math.random();
          const c = k < 0.08 ? [0, 0.94, 1] : k < 0.12 ? [1, 0.93, 0] : [0.88, 0.88, 0.84];
          col.set(c, i * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
        geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
          uniforms: { uTime: { value: 0 }, uProg: { value: 0 }, uSize: { value: 14 }, uPx: { value: px } },
        });
        const cloud = new THREE.Points(geo, mat);
        scene.add(cloud);

        function resize() {
          const w = window.innerWidth;
          const h = window.innerHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // En pantallas estrechas se aleja la cámara para que la nube quepa.
          camera.position.z = w / h < 0.8 ? 5.6 : 4.2;
          camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);

        let last = performance.now();
        const speed = soft ? 0.35 : 1;
        const loop = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (!done) {
            progress = holdRef.current
              ? Math.min(1, progress + dt / HOLD_S)
              : Math.max(0, progress - dt / DECAY_S);
            paint();
            if (progress >= 1) finish();
          }
          pointer.x += (pointer.tx - pointer.x) * 0.06;
          pointer.y += (pointer.ty - pointer.y) * 0.06;
          mat.uniforms.uTime.value += dt * speed;
          mat.uniforms.uProg.value = progress;
          cloud.rotation.y += dt * 0.12 * speed * (1 + progress * 3);
          cloud.rotation.x = pointer.y * 0.25;
          cloud.position.x = pointer.x * 0.25;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        cleanupThree = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", resize);
          geo.dispose();
          mat.dispose();
          renderer.dispose();
        };
      } catch {
        // Sin WebGL: el progreso se calcula igual con un temporizador.
        let last = performance.now();
        const loop = (now: number) => {
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          if (!done) {
            progress = holdRef.current
              ? Math.min(1, progress + dt / HOLD_S)
              : Math.max(0, progress - dt / DECAY_S);
            paint();
            if (progress >= 1) finish();
          }
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
    const release = () => {
      holdRef.current = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", release);
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      cleanupThree?.();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", release);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (gone) return null;

  const hold = () => {
    holdRef.current = true;
  };
  const release = () => {
    holdRef.current = false;
  };

  return (
    <div
      ref={rootRef}
      className="gate"
      role="dialog"
      aria-label={labels.label}
      onPointerDown={hold}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="gate-canvas" />
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="gate-corner left-3.5 top-3.5" />
      <span aria-hidden="true" className="gate-corner right-3.5 top-3.5" />
      <span aria-hidden="true" className="gate-corner bottom-3.5 left-3.5" />
      <span aria-hidden="true" className="gate-corner bottom-3.5 right-3.5" />

      <p aria-hidden="true" className="gate-meta left-6 top-6">
        {labels.session} 0X7F3A-DA
      </p>
      <p aria-hidden="true" className="gate-meta right-6 top-6">
        D.AZA
      </p>

      <div className="gate-center">
        <button
          type="button"
          autoFocus
          className="gate-hold"
          aria-describedby="gate-hint"
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              hold();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") release();
          }}
        >
          {labels.hold}
        </button>
        <span className="gate-track" aria-hidden="true">
          <span ref={barRef} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} className="gate-bar" />
        </span>
        <span ref={pctRef} aria-hidden="true" className="gate-pct">
          0%
        </span>
        <p id="gate-hint" className="gate-hint">
          {labels.hint}
        </p>
      </div>

      <button
        type="button"
        className="gate-skip"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => finishRef.current()}
      >
        {labels.skip}
      </button>
    </div>
  );
}
