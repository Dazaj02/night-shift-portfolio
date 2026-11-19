import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
import { defaultLocale, isLocale, locales, t } from "@/lib/i18n";

export const alt = "David Aza — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const { name, role } = portfolio.profile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0C",
          color: "#E8E6E3",
          padding: 72,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", position: "absolute", right: 0, top: 0, width: 360, height: 630, background: "#141418" }} />
        <div style={{ display: "flex", position: "absolute", right: 72, top: 72, width: 140, height: 14, background: "#FCEE0A" }} />
        <div style={{ display: "flex", position: "absolute", right: 72, top: 104, width: 90, height: 14, background: "#2A2A31" }} />
        <div style={{ display: "flex", position: "absolute", right: 72, top: 136, width: 190, height: 14, background: "#00F0FF" }} />
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#A8A49A" }}>D.AZA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              textTransform: "uppercase",
              textShadow: "-8px 0 #00F0FF, 8px 0 #FF3355",
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 44, color: "#00F0FF", textTransform: "uppercase", letterSpacing: 4 }}>
            {t(role, lang)}
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#FCEE0A" }} />
      </div>
    ),
    { ...size },
  );
}
