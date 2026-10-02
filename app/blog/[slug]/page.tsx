import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { getAllPosts, getPost } from "@/lib/blog";

type PostPageProps = { params: Promise<{ slug: string }> };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Ophlow`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Ophlow`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main id="top" className="min-h-[70vh]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
          <Reveal>
            <Link href="/blog" className="text-sm font-semibold text-forest-800 transition hover:text-rust-600">← All articles</Link>
            <header className="mt-10 border-b border-ink-200 pb-8">
              <time dateTime={post.date} className="text-sm font-medium text-rust-600">{formatDate(post.date)}</time>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">{post.description}</p>
            </header>
            <div className="prose-body mt-9" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </Reveal>
        </article>
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
