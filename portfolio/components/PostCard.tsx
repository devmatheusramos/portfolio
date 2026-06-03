import Link from 'next/link'
import type { PostMeta } from '@/types/post'

const categoryColors: Record<string, string> = {
  'ARQUITETURA': 'bg-[rgba(91,111,255,0.12)] text-[#a0aaff] border-[rgba(91,111,255,0.3)]',
  'FILAS & ASYNC': 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]',
  'ESCALA': 'bg-[rgba(74,222,128,0.08)] text-[#4ade80] border-[rgba(74,222,128,0.3)]',
  'IA APLICADA': 'bg-[rgba(91,111,255,0.12)] text-[#a0aaff] border-[rgba(91,111,255,0.3)]',
  'JWT & AUTH': 'bg-[rgba(155,94,255,0.1)] text-[#c090ff] border-[rgba(155,94,255,0.3)]',
  'DECISÃO TÉCNICA': 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]',
}

export default function PostCard({ post }: { post: PostMeta }) {
  const tagClass = categoryColors[post.category] ?? 'bg-[rgba(91,111,255,0.12)] text-[#a0aaff] border-[rgba(91,111,255,0.3)]'

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="border border-[var(--border-dim)] bg-[var(--bg2)] p-8 flex flex-col gap-4 transition-all duration-300 group-hover:border-[rgba(91,111,255,0.4)] group-hover:-translate-y-1 h-full">
        <span className={`font-mono text-[10px] tracking-widest px-2.5 py-1 border w-fit ${tagClass}`}>
          {post.category}
        </span>
        <h3 className="font-serif text-xl text-white leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed flex-1">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {post.keywords.slice(0, 3).map(k => (
            <span key={k} className="font-mono text-[10px] px-2 py-0.5 bg-[var(--bg3)] text-[var(--text-muted)] border border-[var(--border-dim)]">
              {k}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-dim)]">
          <span className="font-mono text-[11px] text-[var(--text-muted)]">{post.readingTime}</span>
          <span className="font-mono text-[11px] text-[var(--accent)]">ler →</span>
        </div>
      </article>
    </Link>
  )
}
