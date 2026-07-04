import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "What is Tactifin?", a: "Tactifin is an AI-native accounting platform that unifies tracking, budgeting, lending, assets and Shariah-aware finance into a single, premium experience." },
  { q: "How does Shariah-based finance work?", a: "Our Islamic Compliance Checker monitors interest exposure, runs Halal/Haram detection, and sends Zakat alerts — with ML-generated compliance reports you can share." },
  { q: "What is the Rewinder feature?", a: "Rewinder automatically replays your financial history month by month. It surfaces spending trends, income vs expense charts, and category breakdowns so you can spot patterns and make smarter decisions going forward." },
  { q: "How does Bill Pay work?", a: "Add your recurring bills (electricity, rent, internet, etc.) and Tactifin tracks due dates, sends reminders, and lets you mark bills as paid or enable autopay. You'll always know exactly what's due and when." },
  { q: "Is my bank data secure?", a: "Bank and mobile wallet integrations use read-only connections. Fraud detection runs continuously, flagging anomalies before they become losses." },
  { q: "When can I use Tactifin?", a: "Tactifin is live and available now. Sign up for free and start tracking your finances, calculating Zakat, and checking Shariah compliance today." },
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