"use client";

import { useLayoutEffect } from "react";
import { restoreDocState } from "@/lib/motion";

/** Mantiene data-motion / data-theme / data-nav de <html> tras remontar el layout (cambio de idioma). */
export function DocState() {
  useLayoutEffect(() => {
    restoreDocState();
  }, []);
  return null;
}
