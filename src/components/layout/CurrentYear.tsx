"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
// Año de compilación como valor inicial del servidor; el cliente corrige al año real.
const BUILD_YEAR = 2026;

export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <time dateTime={String(year)}>{year}</time>;
}
