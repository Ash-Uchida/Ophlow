import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export type LegalSection = { heading: string; body: (string | string[])[] };

/** A plain reading page for the privacy policy and terms. Strings are paragraphs; arrays are bullet lists. */
export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-rust-600">Last updated {updated}</p>
        <h1 className="text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">{title}</h1>
        <div className="prose-body mt-8">
          <p>{intro}</p>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b}</p>
                ),
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
