import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Ophlow",
  description: "Notes on frontline operations, shift handoffs, and building useful software with the teams doing the work.",
  openGraph: {
    title: "Blog | Ophlow",
    description: "Notes on frontline operations, shift handoffs, and building useful software with the teams doing the work.",
    type: "website",
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main id="top" className="min-h-[70vh]">
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-rust-600">From the floor</p>
            <h1 className="text-4xl font-semibold leading-tight text-forest-950 sm:text-6xl">Notes on the work behind the work.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              Field notes on daily operations, shift handoffs, and making practical tools with the people who use them.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100} className="h-full">
                <article className="h-full rounded-3xl border border-ink-200 bg-paper p-7 transition hover:-translate-y-1 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5 sm:p-9">
                  <time dateTime={post.date} className="text-sm font-medium text-rust-600">{formatDate(post.date)}</time>
                  <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-forest-950 sm:text-3xl">
                    <Link href={`/blog/${post.slug}`} className="transition hover:text-forest-700">{post.title}</Link>
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-700">{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex font-semibold text-forest-800 transition hover:text-rust-600">
                    Read article <span aria-hidden className="ml-2">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-ink-200/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-500">
          <p>© {new Date().getFullYear()} Ophlow. Operations software, built on the floor.</p>
          <div className="flex items-center gap-5">
            <Link href="/blog" className="font-medium text-forest-800 hover:text-rust-600">Blog</Link>
            <Link href="/" className="font-medium text-forest-800 hover:text-rust-600">Back to Ophlow</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
