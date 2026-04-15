import Link from "next/link";

export const dynamic = "force-dynamic";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 font-sans">
      <header className="bg-white dark:bg-zinc-800 shadow">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Moja Strona Next.js</h1>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Serwer: {now}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <p className="mb-8 text-zinc-600 dark:text-zinc-300 text-base">
          Witaj! To jest dynamiczna strona Next.js renderowana po stronie serwera (SSR/ISR),
          gotowa do wdrożenia na{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">Hostinger</span>.
        </p>

        <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
          Najnowsze posty
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-zinc-800 dark:text-white mb-2 line-clamp-2 capitalize">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                {post.body}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-blue-600 dark:text-blue-400">
                Czytaj więcej →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-700 py-6 text-center text-sm text-zinc-400">
        Hostinger · Next.js · Node.js
      </footer>
    </div>
  );
}
