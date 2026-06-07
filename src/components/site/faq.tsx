import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "What is Tactifin?", a: "Tactifin is an AI-native accounting platform that unifies tracking, budgeting, lending, assets and Shariah-aware finance into a single, premium experience." },
  { q: "How does Shariah-based finance work?", a: "Our Islamic Compliance Checker monitors interest exposure, runs Halal/Haram detection, and sends Zakat alerts — with ML-generated compliance reports you can share." },
  { q: "Is my bank data secure?", a: "Bank and mobile wallet integrations use read-only connections. Fraud detection runs continuously, flagging anomalies before they become losses." },
  { q: "When can I use Tactifin?", a: "Tactifin is currently in private beta. Join the waitlist for early access and partner program updates." },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border/40 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQ</div>
          <h2 className="mt-4 text-4xl md:text-5xl">Questions, <span className="italic text-brand-gradient">answered</span>.</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-lg hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}