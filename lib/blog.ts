import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function normalizeDate(value: unknown, slug: string): string {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid or missing date in blog post: ${slug}`);
  }
  return date.toISOString().slice(0, 10);
}

async function readPost(slug: string): Promise<BlogPost> {
  const source = await readFile(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(source);
  if (typeof data.title !== "string" || typeof data.description !== "string") {
    throw new Error(`Missing title or description in blog post: ${slug}`);
  }
  const contentHtml = String(await remark().use(remarkHtml).process(content));

  return {
    slug,
    title: data.title,
    date: normalizeDate(data.date, slug),
    description: data.description,
    contentHtml,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(files.map((file) => readPost(file.slice(0, -3))));
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  try {
    return await readPost(slug);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}
