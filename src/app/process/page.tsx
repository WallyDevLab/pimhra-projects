import type { Metadata } from "next";
import { processSteps } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our process",
  description: "How a project works with Pimhra Projects: site visit, written quote, build and handover.",
  alternates: { canonical: "/process" },
};

export default function Process() {
  return (
    <>
      <PageHero title="How we work" intro="A clear process from the first visit to handover, so you know what happens next." crumbs={[{ label: "Process" }]} />
      <section className="section">
        <div className="wrap">
          <ol className="steps">{processSteps.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
