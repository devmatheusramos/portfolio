import Nav from '@/components/Nav'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <Nav />
      <main>

        {/* HERO */}
        <section className="min-h-screen flex items-center px-14 pt-36 pb-20 relative overflow-hidden grid-bg">
          <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(91,111,255,0.12) 0%, transparent 70%)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full top-[30%] right-[15%] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(155,94,255,0.1) 0%, transparent 70%)' }} />
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] border border-[var(--border)] px-4 py-1.5 mb-8 tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              disponível para projetos
            </div>
            <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.05] tracking-tight text-white mb-7">
              Arquiteto de<br />
              <em className="text-[var(--accent)] not-italic">Software & IA</em>
            </h1>
            <p className="text-lg text-[var(--text-dim)] font-light leading-relaxed max-w-xl mb-12">
              Projeto e implemento sistemas escaláveis — microserviços, filas de mensagem, escalabilidade horizontal e IA aplicada. Do zero à produção, sem retrabalho.
            </p>
            <div className="flex gap-4 flex-wrap mb-20">
              <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider hover:bg-[#4a5eee] transition-colors">
                ↗ WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/matheus-keeven/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors">
                → LinkedIn
              </a>
            </div>
            <div className="flex gap-12 pt-12 border-t border-[var(--border-dim)]">
              {[['3+', 'anos em produção'], ['10+', 'sistemas arquitetados'], ['5', 'stacks dominadas']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-4xl text-white leading-none">{n}</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="px-14 py-28 grid grid-cols-2 gap-20 items-center border-t border-[var(--border-dim)]">
          <div>
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// sobre mim</p>
            <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight text-white mb-6">
              Engenheiro que<br />pensa em sistemas,<br />não em tickets.
            </h2>
            <div className="space-y-4 text-[var(--text-dim)] text-sm font-light leading-relaxed">
              <p>Mais de 3 anos projetando sistemas de alta disponibilidade — microserviços, filas de mensagens, escalabilidade horizontal e automações com IA em ambientes de produção real.</p>
              <p>Projeto sistemas que crescem sem quebrar: desde a escolha do padrão de fila certo (quando usar Pub/Sub, quando usar worker queue, quando não usar nenhum) até a decisão de escalar horizontalmente antes que vire um problema de madrugada.</p>
              <p>Não fico só no código. Penso em produto, em custo de infra, em decisões que você vai ter que viver por anos.</p>
              <p>Co-fundador da Nobreak IA — plataforma de agentes IA para negócios via WhatsApp, construída do zero: arquitetura, infra, backend, frontend.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Node.js / Python', 92], ['React / Next.js', 85],
              ['Microserviços', 88], ['Docker / VPS', 82],
              ['Filas (Redis / RabbitMQ)', 80], ['Escalab. Horizontal', 82],
              ['MongoDB / SQL', 80], ['LLMs / IA aplicada', 78],
              ['Cloud Architecture', 75], ['PHP / Laravel', 70],
            ].map(([name, pct]) => (
              <div key={name as string} className="p-4 border border-[var(--border-dim)] bg-[var(--bg2)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all">
                <div className="font-mono text-xs text-[var(--text)] mb-2">{name}</div>
                <div className="h-px bg-[var(--border-dim)] relative">
                  <div className="absolute left-0 top-0 h-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #5B6FFF, #9B5EFF)' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="px-14 py-28 border-t border-[var(--border-dim)] bg-[var(--bg2)]">
          <div className="mb-16">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// serviços</p>
            <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight text-white">Como posso<br />te ajudar</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '⬡', name: 'Revisão de Arquitetura', desc: 'Analiso seu sistema atual e entrego um relatório com pontos de falha, gargalos de escalabilidade e um roadmap técnico claro. Decisão informada antes de escalar.' },
              { icon: '◈', name: 'Mentoria Técnica', desc: 'Sessões por hora para devs sênior ou times que precisam evoluir em arquitetura, boas práticas e tomada de decisão técnica. Foco em resultado, não em teoria.' },
              { icon: '◎', name: 'Integração de IA', desc: 'Projeto e implemento agentes IA, RAG, automações com LLMs no seu produto ou processo. Desde a escolha do modelo até o deploy em produção.' },
            ].map(s => (
              <div key={s.name} className="p-10 border border-[var(--border-dim)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all group">
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="font-serif text-xl text-white mb-3">{s.name}</h3>
                <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed">{s.desc}</p>
                <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-6 font-mono text-xs text-[var(--accent)] hover:underline">
                  → falar sobre isso
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        {posts.length > 0 && (
          <section id="blog" className="px-14 py-28 border-t border-[var(--border-dim)]">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// blog</p>
                <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight text-white">Pensando em<br />sistemas em voz alta</h2>
              </div>
              <Link href="/blog" className="font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors">
                ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {posts.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-14 py-28 border-t border-[var(--border-dim)] text-center relative overflow-hidden">
          <div className="absolute w-[800px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,111,255,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// contato</p>
            <h2 className="font-serif text-[clamp(40px,6vw,72px)] leading-tight tracking-tight text-white mb-5">
              Seu sistema está<br />pronto para escalar?
            </h2>
            <p className="text-lg text-[var(--text-dim)] font-light mb-12">
              Me manda uma mensagem. Sem formulário, sem reunião de discovery de 1h.<br />Direto ao ponto.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider hover:bg-[#4a5eee] transition-colors">
                ↗ WhatsApp agora
              </a>
              <a href="https://www.linkedin.com/in/matheus-keeven/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors">
                → LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="px-14 py-8 border-t border-[var(--border-dim)] flex justify-between items-center">
          <p className="font-mono text-xs text-[var(--text-muted)]">© 2026 Matheus Ramos — Arquiteto de Software & IA</p>
          <p className="font-mono text-xs text-[var(--text-muted)]">Recife, PE · Brasil</p>
        </footer>

      </main>
    </>
  )
}
