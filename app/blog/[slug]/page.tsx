import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Nav from '@/components/Nav'
import { getPostBySlug, getPostSlugs } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = getPostBySlug(slug)
    return {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: ['Matheus Ramos'],
      },
    }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  if (!post.published) notFound()

  return (
    <>
      <Nav />
      <main className="pt-28 px-14 pb-24 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="pt-12 mb-12">
            <Link href="/blog" className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8 inline-block">
              ← voltar ao blog
            </Link>
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 border bg-[rgba(91,111,255,0.12)] text-[#a0aaff] border-[rgba(91,111,255,0.3)]">
                {post.category}
              </span>
            </div>
            <h1 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight text-white mb-4">
              {post.title}
            </h1>
            <p className="text-[var(--text-dim)] font-light text-base mb-6">{post.description}</p>
            <div className="flex items-center gap-4 font-mono text-xs text-[var(--text-muted)] pb-8 border-b border-[var(--border-dim)]">
              <span>{new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>

          <article className="prose prose-lg prose-dark max-w-none">
            <MDXRemote source={post.content} />
          </article>

          <div className="mt-16 pt-8 border-t border-[var(--border-dim)]">
            <div className="flex flex-wrap gap-2 mb-10">
              {post.keywords.map(k => (
                <span key={k} className="font-mono text-[10px] px-2.5 py-1 bg-[var(--bg3)] text-[var(--text-muted)] border border-[var(--border-dim)]">
                  {k}
                </span>
              ))}
            </div>
            <div className="p-8 border border-[var(--border)] bg-[rgba(91,111,255,0.06)]">
              <p className="font-mono text-xs text-[var(--accent)] tracking-wider mb-3">// gostou? vamos conversar</p>
              <p className="text-[var(--text-dim)] text-sm font-light mb-5">
                Se esse conteúdo fez sentido pro seu contexto, me chama. Consultoria, mentoria ou só uma troca de ideia.
              </p>
              <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-mono text-xs tracking-wider hover:bg-[#4a5eee] transition-colors">
                ↗ falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
