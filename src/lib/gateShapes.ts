/**
 * Siluetas de puntos para la pantalla de entrada (una por sección). Cada generador devuelve
 * `n` puntos (x, y, z) aproximadamente dentro de una esfera de radio ~1.1, vistos de frente.
 */
type V = [number, number, number];
type Part = { w: number; f: () => V };

const R = Math.random;
const j = (s = 0.012) => (R() * 2 - 1) * s;

function dir(): V {
  const u = R() * 2 - 1;
  const a = R() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(a), u, s * Math.sin(a)];
}

function ellipsoid(c: V, r: V, shell = 0.9, upperOnly = false): V {
  const d = dir();
  if (upperOnly) d[1] = Math.abs(d[1]);
  const k = shell + (1 - shell) * R();
  return [c[0] + d[0] * r[0] * k, c[1] + d[1] * r[1] * k, c[2] + d[2] * r[2] * k];
}

function boxSurface(cx: number, cy: number, cz: number, hx: number, hy: number, hz: number): V {
  const face = Math.floor(R() * 6);
  const u = R() * 2 - 1;
  const v = R() * 2 - 1;
  switch (face) {
    case 0: return [cx + hx, cy + u * hy, cz + v * hz];
    case 1: return [cx - hx, cy + u * hy, cz + v * hz];
    case 2: return [cx + u * hx, cy + hy, cz + v * hz];
    case 3: return [cx + u * hx, cy - hy, cz + v * hz];
    case 4: return [cx + u * hx, cy + v * hy, cz + hz];
    default: return [cx + u * hx, cy + v * hy, cz - hz];
  }
}

function cubeEdge(h: number): V {
  const axis = Math.floor(R() * 3);
  const a = R() < 0.5 ? -h : h;
  const b = R() < 0.5 ? -h : h;
  const t = (R() * 2 - 1) * h;
  return axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
}

const shapes: Record<string, Part[]> = {
  // Inicio: la esfera de puntos (núcleo).
  inicio: [
    {
      w: 1,
      f: () => {
        const d = dir();
        const r = 0.4 + 0.6 * Math.pow(R(), 0.55);
        return [d[0] * r, d[1] * r, d[2] * r];
      },
    },
  ],
  // Sobre mí: busto (cabeza, cuello y hombros).
  "sobre-mi": [
    { w: 0.45, f: () => ellipsoid([0, 0.5, 0], [0.34, 0.4, 0.34], 0.82) },
    { w: 0.08, f: () => { const a = R() * Math.PI * 2; return [Math.cos(a) * 0.13, 0.08 + R() * 0.18, Math.sin(a) * 0.13]; } },
    { w: 0.47, f: () => ellipsoid([0, -0.62, 0], [0.98, 0.6, 0.34], 0.88, true) },
  ],
  // Proyectos: cubo con cubo interior y aristas marcadas.
  proyectos: [
    { w: 0.45, f: () => boxSurface(0, 0, 0, 0.62, 0.62, 0.62) },
    { w: 0.3, f: () => cubeEdge(0.62) },
    { w: 0.25, f: () => boxSurface(0, 0, 0, 0.27, 0.27, 0.27) },
  ],
  // Testimonios: globo de diálogo con líneas de texto y cola.
  testimonios: [
    { w: 0.55, f: () => ellipsoid([0, 0.15, 0], [0.98, 0.62, 0.15], 0.92) },
    {
      w: 0.18,
      f: () => {
        let a = R();
        let b = R();
        if (a + b > 1) { a = 1 - a; b = 1 - b; }
        return [-0.55 + a * 0.45 + b * -0.05, -0.38 + a * -0.04 + b * -0.57, j(0.08)];
      },
    },
    { w: 0.27, f: () => { const row = Math.floor(R() * 3); return [(R() * 2 - 1) * (row === 2 ? 0.35 : 0.58), 0.4 - row * 0.22, 0.2]; } },
  ],
  // Experiencia: escalera ascendente (trayectoria).
  experiencia: [0, 1, 2, 3].map((i) => {
    const h = 0.18 + 0.17 * i;
    return { w: h, f: () => boxSurface(-0.78 + i * 0.52, -0.78 + h, 0, 0.21, h, 0.2) };
  }),
  // Tecnologías: engranaje con ocho dientes.
  tecnologias: [
    {
      w: 0.88,
      f: () => {
        const a = R() * Math.PI * 2;
        const outer = Math.cos(8 * a) > 0.3 ? 0.98 : 0.78;
        const r = 0.42 + (outer - 0.42) * R();
        return [Math.cos(a) * r, Math.sin(a) * r, j(0.13)];
      },
    },
    { w: 0.12, f: () => { const a = R() * Math.PI * 2; const r = 0.1 + 0.08 * R(); return [Math.cos(a) * r, Math.sin(a) * r, j(0.13)]; } },
  ],
  // Contacto: sobre con solapa.
  contacto: [
    {
      w: 0.4,
      f: () => {
        const t = R() * 5.6;
        const w = 1.7;
        const h = 1.1;
        if (t < w) return [-0.85 + t, 0.55, j(0.04)];
        if (t < w + h) return [0.85, 0.55 - (t - w), j(0.04)];
        if (t < 2 * w + h) return [0.85 - (t - w - h), -0.55, j(0.04)];
        return [-0.85, -0.55 + (t - 2 * w - h) / 1, j(0.04)];
      },
    },
    { w: 0.3, f: () => { const s = R() < 0.5 ? -1 : 1; const t = R(); return [s * 0.85 * (1 - t), 0.55 - 0.55 * t, j(0.05)]; } },
    { w: 0.3, f: () => [(R() * 2 - 1) * 0.85, (R() * 2 - 1) * 0.55, j(0.05)] },
  ],
};

export function buildShape(id: string, n: number): Float32Array {
  const parts = shapes[id] ?? shapes.inicio;
  const total = parts.reduce((s, p) => s + p.w, 0);
  const out = new Float32Array(n * 3);
  let i = 0;
  parts.forEach((p, k) => {
    const count = k === parts.length - 1 ? n - i : Math.round((n * p.w) / total);
    for (let c = 0; c < count && i < n; c++, i++) {
      const v = p.f();
      out[i * 3] = v[0] + j();
      out[i * 3 + 1] = v[1] + j();
      out[i * 3 + 2] = v[2] + j();
    }
  });
  return out;
}
