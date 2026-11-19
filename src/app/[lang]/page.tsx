import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Arsenal } from "@/components/sections/Arsenal";
import { Learning } from "@/components/sections/Learning";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero lang={lang} />
      <Arsenal lang={lang} />
      <About lang={lang} />
      <Projects lang={lang} />
      <div aria-hidden="true" className="warning-strip" />
      <Testimonials lang={lang} />
      <Experience lang={lang} />
      <Learning lang={lang} />
      <div aria-hidden="true" className="warning-strip" />
      <Contact lang={lang} />
    </main>
  );
}
