import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

async function getComments(id: string): Promise<Comment[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    const posts: Post[] = await res.json();
    return posts.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 font-sans">
      <header className="bg-white dark:bg-zinc-800 shadow">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Powrót
          </Link>
          <span className="text-zinc-300 dark:text-zinc-600">|</span>
          <h1 className="text-lg font-semibold text-zinc-800 dark:text-white truncate">
            Post #{post.id}
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <article className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4 capitalize">
            {post.title}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-7">{post.body}</p>
          <p className="mt-4 text-xs text-zinc-400">Autor ID: {post.userId}</p>
        </article>

        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
          Komentarze ({comments.length})
        </h3>

        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5"
            >
              <p className="font-medium text-zinc-700 dark:text-zinc-200 text-sm">{c.name}</p>
              <p className="text-xs text-zinc-400 mb-2">{c.email}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{c.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
