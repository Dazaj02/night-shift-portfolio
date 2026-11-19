import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import {
  defaultLocale,
  getUI,
  isLocale,
  locales,
  ogLocale,
  otherLocale,
  t,
} from "@/lib/i18n";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DocState } from "@/components/layout/DocState";
import { EntryGate } from "@/components/ui/EntryGate";
import { MOTION_INIT_SCRIPT } from "@/lib/motion";
import { GATE_INIT_SCRIPT } from "@/lib/gate";
import { gateItems } from "@/lib/gateItems";
import "../globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-chakra",
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const ui = getUI(lang);
  const { siteUrl, name } = portfolio.profile;
  return {
    metadataBase: new URL(siteUrl),
    title: ui.meta.title,
    description: ui.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      title: ui.meta.title,
      description: ui.meta.description,
      url: `${siteUrl}/${lang}`,
      siteName: name,
      locale: ogLocale[lang],
      alternateLocale: ogLocale[otherLocale(lang)],
    },
    twitter: {
      card: "summary_large_image",
      title: ui.meta.title,
      description: ui.meta.description,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const ui = getUI(lang);
  const other = otherLocale(lang);

  return (
    <html
      lang={lang}
      data-motion="on"
      data-theme="dark"
      suppressHydrationWarning
      className={`${chakra.variable} ${plex.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GATE_INIT_SCRIPT }} />
        <noscript>
          <style>{".gate{display:none!important}html[data-gate] body>*{visibility:visible!important}html[data-gate] body{overflow:auto!important}"}</style>
        </noscript>
      </head>
      <body>
        <DocState />
        <SkipLink label={ui.skipToContent} />
        <SiteHeader
          handle={portfolio.profile.handle}
          links={portfolio.nav.map((n) => ({ id: n.id, label: t(n.label, lang) }))}
          cv={{ label: ui.downloadCv, href: portfolio.profile.cvHref }}
          navLabel={ui.navLabel}
          openMenu={ui.openMenu}
          closeMenu={ui.closeMenu}
          language={{ target: other, name: ui.otherLanguageName, label: ui.languageSwitch }}
          motion={ui.motion}
          theme={ui.theme}
        />
        <EntryGate labels={ui.gate} items={gateItems(lang)} />
        {children}
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
