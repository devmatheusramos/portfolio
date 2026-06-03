import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre arquitetura de software, microserviços, filas de mensagem, escalabilidade e IA aplicada.",
  keywords: [
    "arquitetura de software",
    "microserviços",
    "Node.js",
    "message queue",
    "escalabilidade horizontal",
    "IA aplicada",
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="pt-28 px-14 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 pt-12">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">
              // blog
            </p>
            <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-tight tracking-tight text-white mb-4">
              Pensando em sistemas
              <br />
              em voz alta
            </h1>
            <p className="text-[var(--text-dim)] font-light text-lg max-w-lg">
              Arquitetura, decisões de design e IA aplicada. Para devs e
              founders que querem construir sistemas que duram.
            </p>
          </div>
          {posts.length === 0 ? (
            <div className="border border-dashed border-[var(--border-dim)] p-16 text-center">
              <p className="font-mono text-sm text-[var(--text-muted)]">
                posts chegando em breve...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
