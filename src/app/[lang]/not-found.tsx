import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-start justify-center gap-6 px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-alert">404</p>
      <h1 className="font-display text-5xl font-bold uppercase text-ink">Signal lost</h1>
      <p className="max-w-[50ch] text-ink-dim">
        Esta ruta no existe. / This route does not exist.
      </p>
      <Link href="/es" className="frame btn-cut btn-cut--primary">
        <span>David Aza</span>
      </Link>
    </main>
  );
}
