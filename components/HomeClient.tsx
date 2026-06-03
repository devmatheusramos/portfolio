'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import PersonaSelector, { type Persona } from '@/components/PersonaSelector'
import { HERO, ABOUT, SKILLS, SERVICES, PROJECTS, CTA_TITLE, LABELS, type Locale } from '@/lib/i18n'
import type { PostMeta } from '@/types/post'

// ── Layout helpers ───────────────────────────────────────────────────────
const PX = { paddingLeft: 'clamp(24px, 5vw, 60px)', paddingRight: 'clamp(24px, 5vw, 60px)' }
const PXY = { ...PX, paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }
const HERO_PAD = { ...PX, paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }

// ── SVG Diagrams ─────────────────────────────────────────────────────────

function DiagramMicro() {
  return (
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <defs><marker id="d1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(91,111,255,0.6)" /></marker></defs>
      <rect x="10" y="110" width="80" height="40" rx="3" fill="rgba(91,111,255,0.12)" stroke="rgba(91,111,255,0.5)" strokeWidth="1" />
      <text x="50" y="126" textAnchor="middle" fill="#a0aaff" fontFamily="monospace" fontSize="9">CLIENT</text>
      <text x="50" y="140" textAnchor="middle" fill="#6677bb" fontFamily="monospace" fontSize="8">web / mobile</text>
      <line x1="90" y1="130" x2="130" y2="130" stroke="rgba(91,111,255,0.4)" strokeWidth="1" markerEnd="url(#d1)" />
      <rect x="130" y="100" width="90" height="60" rx="3" fill="rgba(155,94,255,0.12)" stroke="rgba(155,94,255,0.5)" strokeWidth="1" />
      <text x="175" y="120" textAnchor="middle" fill="#c090ff" fontFamily="monospace" fontSize="9">API GATEWAY</text>
      <text x="175" y="134" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="8">auth • rate limit</text>
      <text x="175" y="148" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="8">routing</text>
      <line x1="175" y1="160" x2="100" y2="200" stroke="rgba(91,111,255,0.3)" strokeWidth="1" markerEnd="url(#d1)" />
      <line x1="175" y1="160" x2="175" y2="200" stroke="rgba(91,111,255,0.3)" strokeWidth="1" markerEnd="url(#d1)" />
      <line x1="175" y1="160" x2="250" y2="200" stroke="rgba(91,111,255,0.3)" strokeWidth="1" markerEnd="url(#d1)" />
      <rect x="50" y="200" width="100" height="36" rx="3" fill="rgba(91,111,255,0.1)" stroke="rgba(91,111,255,0.3)" strokeWidth="1" />
      <text x="100" y="214" textAnchor="middle" fill="#8899ff" fontFamily="monospace" fontSize="8">USER SERVICE</text>
      <text x="100" y="226" textAnchor="middle" fill="#556688" fontFamily="monospace" fontSize="7">Node.js + JWT</text>
      <rect x="125" y="200" width="100" height="36" rx="3" fill="rgba(91,111,255,0.1)" stroke="rgba(91,111,255,0.3)" strokeWidth="1" />
      <text x="175" y="214" textAnchor="middle" fill="#8899ff" fontFamily="monospace" fontSize="8">CORE SERVICE</text>
      <text x="175" y="226" textAnchor="middle" fill="#556688" fontFamily="monospace" fontSize="7">Python + FastAPI</text>
      <rect x="200" y="200" width="100" height="36" rx="3" fill="rgba(91,111,255,0.1)" stroke="rgba(91,111,255,0.3)" strokeWidth="1" />
      <text x="250" y="214" textAnchor="middle" fill="#8899ff" fontFamily="monospace" fontSize="8">AI SERVICE</text>
      <text x="250" y="226" textAnchor="middle" fill="#556688" fontFamily="monospace" fontSize="7">LLM + embeddings</text>
      <rect x="310" y="100" width="90" height="40" rx="3" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />
      <text x="355" y="116" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="8">MESSAGE BUS</text>
      <text x="355" y="130" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="7">events async</text>
      <line x1="220" y1="130" x2="310" y2="120" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="310" y="180" width="90" height="40" rx="3" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="355" y="196" textAnchor="middle" fill="#fbbf24" fontFamily="monospace" fontSize="8">DATABASE</text>
      <text x="355" y="210" textAnchor="middle" fill="#997722" fontFamily="monospace" fontSize="7">MongoDB • SQL</text>
      <line x1="355" y1="140" x2="355" y2="180" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="35" y="260" width="360" height="16" rx="2" fill="rgba(91,111,255,0.05)" stroke="rgba(91,111,255,0.15)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="215" y="271" textAnchor="middle" fill="#4a5580" fontFamily="monospace" fontSize="8">Docker Compose / VPS</text>
    </svg>
  )
}

function DiagramAgent() {
  return (
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <defs><marker id="d2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(155,94,255,0.7)" /></marker></defs>
      <rect x="10" y="20" width="80" height="36" rx="3" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1" />
      <text x="50" y="34" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="8">WHATSAPP</text>
      <text x="50" y="48" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="7">Evolution API</text>
      <rect x="10" y="76" width="80" height="36" rx="3" fill="rgba(91,111,255,0.1)" stroke="rgba(91,111,255,0.4)" strokeWidth="1" />
      <text x="50" y="90" textAnchor="middle" fill="#8899ff" fontFamily="monospace" fontSize="8">WEBCHAT</text>
      <text x="50" y="104" textAnchor="middle" fill="#4455aa" fontFamily="monospace" fontSize="7">widget embed</text>
      <line x1="90" y1="38" x2="140" y2="70" stroke="rgba(155,94,255,0.4)" strokeWidth="1" markerEnd="url(#d2)" />
      <line x1="90" y1="94" x2="140" y2="80" stroke="rgba(155,94,255,0.4)" strokeWidth="1" markerEnd="url(#d2)" />
      <rect x="140" y="52" width="100" height="52" rx="3" fill="rgba(155,94,255,0.12)" stroke="rgba(155,94,255,0.5)" strokeWidth="1" />
      <text x="190" y="72" textAnchor="middle" fill="#c090ff" fontFamily="monospace" fontSize="9">ORCHESTRATOR</text>
      <text x="190" y="86" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="7">roteamento</text>
      <text x="190" y="98" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="7">flow engine</text>
      <line x1="240" y1="78" x2="280" y2="78" stroke="rgba(155,94,255,0.4)" strokeWidth="1" markerEnd="url(#d2)" />
      <rect x="280" y="52" width="100" height="52" rx="3" fill="rgba(91,111,255,0.12)" stroke="rgba(91,111,255,0.5)" strokeWidth="1" />
      <text x="330" y="72" textAnchor="middle" fill="#a0aaff" fontFamily="monospace" fontSize="9">AI AGENT</text>
      <text x="330" y="86" textAnchor="middle" fill="#6677bb" fontFamily="monospace" fontSize="7">contexto + tools</text>
      <text x="330" y="98" textAnchor="middle" fill="#6677bb" fontFamily="monospace" fontSize="7">OpenAI / Claude</text>
      <line x1="330" y1="104" x2="330" y2="144" stroke="rgba(91,111,255,0.3)" strokeWidth="1" markerEnd="url(#d2)" />
      <rect x="240" y="144" width="76" height="32" rx="3" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="278" y="158" textAnchor="middle" fill="#fbbf24" fontFamily="monospace" fontSize="7">catalog_search</text>
      <text x="278" y="170" textAnchor="middle" fill="#997722" fontFamily="monospace" fontSize="6">busca semântica</text>
      <rect x="324" y="144" width="76" height="32" rx="3" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="362" y="158" textAnchor="middle" fill="#fbbf24" fontFamily="monospace" fontSize="7">calendar_tool</text>
      <text x="362" y="170" textAnchor="middle" fill="#997722" fontFamily="monospace" fontSize="6">Google Calendar</text>
      <rect x="240" y="196" width="160" height="32" rx="3" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.25)" strokeWidth="1" />
      <text x="320" y="210" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="8">VECTOR DB</text>
      <text x="320" y="222" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="7">embeddings do catálogo</text>
      <line x1="278" y1="176" x2="300" y2="196" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="362" y1="176" x2="340" y2="196" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="10" y="144" width="110" height="32" rx="3" fill="rgba(91,111,255,0.08)" stroke="rgba(91,111,255,0.2)" strokeWidth="1" />
      <text x="65" y="158" textAnchor="middle" fill="#6677bb" fontFamily="monospace" fontSize="7">SESSION STORE</text>
      <text x="65" y="170" textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="6">flowState • histórico</text>
      <line x1="140" y1="104" x2="80" y2="144" stroke="rgba(91,111,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="10" y="200" width="110" height="28" rx="2" fill="rgba(155,94,255,0.06)" stroke="rgba(155,94,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="65" y="218" textAnchor="middle" fill="#7755aa" fontFamily="monospace" fontSize="7">multi-tenant • branding</text>
    </svg>
  )
}

function DiagramDeploy() {
  return (
    <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <defs><marker id="d3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(74,222,128,0.7)" /></marker></defs>
      <text x="240" y="30" textAnchor="middle" fill="#4a5580" fontFamily="monospace" fontSize="9">git push → produção em minutos</text>
      {([
        { x: 10, label: 'LOCAL', sub: 'git push', color: '#8899ff', stroke: 'rgba(91,111,255,0.4)', fill: 'rgba(91,111,255,0.1)', lbl: 'dev' },
        { x: 115, label: 'GITHUB', sub: 'branch → main', color: '#c090ff', stroke: 'rgba(155,94,255,0.4)', fill: 'rgba(155,94,255,0.1)', lbl: 'CI' },
        { x: 220, label: 'VPS', sub: 'docker build', color: '#4ade80', stroke: 'rgba(74,222,128,0.4)', fill: 'rgba(74,222,128,0.1)', lbl: 'build' },
        { x: 325, label: 'SEED', sub: 'idempotente', color: '#fbbf24', stroke: 'rgba(251,191,36,0.4)', fill: 'rgba(251,191,36,0.1)', lbl: 'migrate' },
      ] as const).map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="80" width="70" height="40" rx="3" fill={s.fill} stroke={s.stroke} strokeWidth="1" />
          <text x={s.x + 35} y="97" textAnchor="middle" fill={s.color} fontFamily="monospace" fontSize="8">{s.label}</text>
          <text x={s.x + 35} y="110" textAnchor="middle" fill="#4a5580" fontFamily="monospace" fontSize="7">{s.sub}</text>
          <text x={s.x + 35} y="140" textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="7">{s.lbl}</text>
          {i < 3 && <line x1={s.x + 80} y1="100" x2={s.x + 115} y2="100" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" markerEnd="url(#d3)" />}
        </g>
      ))}
      <rect x="430" y="80" width="40" height="40" rx="3" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1" />
      <text x="450" y="97" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="7">LIVE</text>
      <text x="450" y="110" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="6">✓</text>
      <text x="450" y="140" textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="7">prod</text>
      <line x1="395" y1="100" x2="430" y2="100" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" markerEnd="url(#d3)" />
      <rect x="115" y="160" width="250" height="24" rx="2" fill="rgba(91,111,255,0.05)" stroke="rgba(91,111,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="240" y="175" textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="7">Nginx reverse proxy • SSL • port mapping</text>
    </svg>
  )
}

function DiagramAuth() {
  return (
    <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <defs>
        <marker id="d4a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(91,111,255,0.6)" /></marker>
        <marker id="d4b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(251,191,36,0.6)" /></marker>
      </defs>
      <text x="285" y="25" textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="8">RBAC — roles por client_id</text>
      <rect x="10" y="80" width="70" height="40" rx="3" fill="rgba(91,111,255,0.1)" stroke="rgba(91,111,255,0.3)" strokeWidth="1" />
      <text x="45" y="97" textAnchor="middle" fill="#8899ff" fontFamily="monospace" fontSize="8">CLIENT</text>
      <text x="45" y="110" textAnchor="middle" fill="#4455aa" fontFamily="monospace" fontSize="7">POST /login</text>
      <line x1="80" y1="100" x2="120" y2="100" stroke="rgba(91,111,255,0.4)" strokeWidth="1" markerEnd="url(#d4a)" />
      <rect x="120" y="70" width="90" height="60" rx="3" fill="rgba(155,94,255,0.1)" stroke="rgba(155,94,255,0.4)" strokeWidth="1" />
      <text x="165" y="90" textAnchor="middle" fill="#c090ff" fontFamily="monospace" fontSize="8">AUTH SERVICE</text>
      <text x="165" y="104" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="7">bcrypt verify</text>
      <text x="165" y="118" textAnchor="middle" fill="#8866cc" fontFamily="monospace" fontSize="7">sign JWT</text>
      <line x1="120" y1="115" x2="80" y2="115" stroke="rgba(251,191,36,0.4)" strokeWidth="1" markerEnd="url(#d4b)" />
      <text x="95" y="128" textAnchor="middle" fill="#997722" fontFamily="monospace" fontSize="6">token</text>
      <line x1="210" y1="100" x2="240" y2="100" stroke="rgba(91,111,255,0.3)" strokeWidth="1" markerEnd="url(#d4a)" />
      <rect x="240" y="70" width="90" height="60" rx="3" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />
      <text x="285" y="90" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="8">MIDDLEWARE</text>
      <text x="285" y="104" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="7">verify JWT</text>
      <text x="285" y="118" textAnchor="middle" fill="#2a8850" fontFamily="monospace" fontSize="7">inject user</text>
      {[{ y: 55, role: 'OWNER', sub: 'full access' }, { y: 95, role: 'ADMIN', sub: 'manage agents' }, { y: 135, role: 'USER', sub: 'read only' }].map(r => (
        <g key={r.role}>
          <rect x="360" y={r.y} width="80" height="30" rx="3" fill="rgba(91,111,255,0.06)" stroke="rgba(91,111,255,0.2)" strokeWidth="1" />
          <text x="400" y={r.y + 13} textAnchor="middle" fill="#6677bb" fontFamily="monospace" fontSize="7">{r.role}</text>
          <text x="400" y={r.y + 23} textAnchor="middle" fill="#3a4466" fontFamily="monospace" fontSize="6">{r.sub}</text>
        </g>
      ))}
      <line x1="330" y1="90" x2="360" y2="72" stroke="rgba(91,111,255,0.2)" strokeWidth="1" markerEnd="url(#d4a)" />
      <line x1="330" y1="100" x2="360" y2="110" stroke="rgba(91,111,255,0.2)" strokeWidth="1" markerEnd="url(#d4a)" />
      <line x1="330" y1="110" x2="360" y2="148" stroke="rgba(91,111,255,0.2)" strokeWidth="1" markerEnd="url(#d4a)" />
    </svg>
  )
}

// ── Main Component ────────────────────────────────────────────────────────

export default function HomeClient({ posts }: { posts: PostMeta[] }) {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [locale, setLocale] = useState<Locale>('pt')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const savedPersona = localStorage.getItem('portfolio-persona') as Persona | null
    const savedLocale = localStorage.getItem('portfolio-locale') as Locale | null
    setPersona(savedPersona)
    setLocale(savedLocale ?? 'pt')
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!persona) return
    let obs: IntersectionObserver
    const id = setTimeout(() => {
      obs = new IntersectionObserver(
        es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.1 }
      )
      document.querySelectorAll('.reveal').forEach(el => { el.classList.remove('visible'); obs.observe(el) })
    }, 80)
    return () => { clearTimeout(id); obs?.disconnect() }
  }, [persona, locale])

  const select = (p: Persona) => { localStorage.setItem('portfolio-persona', p); setPersona(p) }
  const reset = () => { localStorage.removeItem('portfolio-persona'); setPersona(null) }
  const toggleLocale = () => {
    const next: Locale = locale === 'pt' ? 'en' : 'pt'
    localStorage.setItem('portfolio-locale', next)
    setLocale(next)
  }

  if (!loaded) return <div className="min-h-screen bg-[var(--bg)]" />
  if (!persona) return <PersonaSelector onSelect={select} locale={locale} onLocaleChange={toggleLocale} />

  const h = HERO[persona][locale]
  const a = ABOUT[persona][locale]
  const skills = SKILLS[persona][locale]
  const svc = SERVICES[persona][locale]
  const projects = PROJECTS[persona][locale]
  const ctaTitle = CTA_TITLE[persona][locale]
  const L = LABELS[locale]

  return (
    <>
      <Nav onReset={reset} locale={locale} onLocaleChange={toggleLocale} />
      <main key={`${persona}-${locale}`}>

        {/* ── HERO ── */}
        <section id="hero" style={HERO_PAD} className="min-h-screen flex items-center overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(91,111,255,0.12) 0%, transparent 70%)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full top-[30%] right-[15%] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(155,94,255,0.1) 0%, transparent 70%)' }} />
          <div className="max-w-[800px] relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] border border-[var(--border)] px-4 py-1.5 mb-8 tracking-widest"
              style={{ animation: 'fadeUp 0.6s ease both' }}>
              <span className="status-dot" style={{ background: h.dotColor }} />
              {h.tagText}
            </div>
            <h1 className="font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontSize: 'clamp(48px,7vw,88px)', animation: 'fadeUp 0.6s 0.1s ease both' }}>
              {h.h1a}<br /><em className="text-[var(--accent)] not-italic">{h.h1b}</em>
            </h1>
            <p className="text-lg text-[var(--text-dim)] font-light leading-relaxed max-w-xl mt-7 mb-12"
              style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>{h.sub}</p>
            <div className="flex gap-4 flex-wrap" style={{ animation: 'fadeUp 0.6s 0.3s ease both' }}>
              <a href={h.ctaPrimary.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider hover:bg-[#4a5eee] hover:-translate-y-0.5 transition-all">
                {h.ctaPrimary.label}
              </a>
              <a href={h.ctaSecondary.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--text)] transition-all">
                {h.ctaSecondary.label}
              </a>
            </div>
            <div className="flex gap-8 md:gap-12 mt-[72px] pt-12 border-t border-[var(--border-dim)] flex-wrap"
              style={{ animation: 'fadeUp 0.6s 0.4s ease both' }}>
              {h.stats.map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-[40px] text-white leading-none">{n}</div>
                  <div className="font-mono text-[13px] text-[var(--text-muted)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE ── */}
        <section id="sobre" style={PXY} className="border-t border-[var(--border-dim)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.about}</p>
              <h2 className="font-serif leading-tight tracking-tight text-white mb-6" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                {a.heading.map((line, i) => <span key={i}>{line}{i < a.heading.length - 1 && <br />}</span>)}
              </h2>
              <div className="text-[var(--text-dim)] text-sm font-light leading-relaxed space-y-4">
                {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {a.note && (
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] border border-[var(--border)] px-4 py-2">
                  {a.note}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 reveal">
              {skills.map(([name, pct]) => (
                <div key={name} className="p-4 border border-[var(--border-dim)] bg-[var(--bg2)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all">
                  <div className="font-mono text-xs text-[var(--text)] mb-2">{name}</div>
                  <div className="h-px bg-[var(--border-dim)] relative">
                    <div className="absolute left-0 top-0 h-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #5B6FFF, #9B5EFF)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARQUITETURA / O QUE EU FAÇO ── */}
        {persona === 'visitor' ? (
          <section id="como-funciona" style={PXY} className="border-t border-[var(--border-dim)] bg-[var(--bg2)]">
            <div className="mb-[60px] reveal">
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.whatIDo}</p>
              <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                {L.whatIDoHeading.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {L.whatIDoCards.map(card => (
                <div key={card.title} className="p-8 border border-[var(--border-dim)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all reveal">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-serif text-[20px] text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section id="arquitetura" style={PXY} className="border-t border-[var(--border-dim)] bg-[var(--bg2)]">
            <div className="text-center mb-[72px] reveal">
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.architecture}</p>
              <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                {L.archHeading[persona === 'rh' ? 'rh' : 'ceo'].split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {persona === 'rh' && (
                <div className="diagram-card reveal">
                  <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">01 — microservices architecture</p>
                  <DiagramMicro />
                  <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">{L.diagramDesc[0]}</p>
                </div>
              )}
              <div className="diagram-card reveal">
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">
                  {persona === 'rh' ? '02' : '01'} — AI agent flow (nobreak)
                </p>
                <DiagramAgent />
                <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">{L.diagramDesc[1]}</p>
              </div>
              <div className="diagram-card reveal">
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">
                  {persona === 'rh' ? '03' : '02'} — deploy pipeline
                </p>
                <DiagramDeploy />
                <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">{L.diagramDesc[2]}</p>
              </div>
              {persona === 'rh' && (
                <div className="diagram-card reveal">
                  <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">04 — jwt + rbac auth</p>
                  <DiagramAuth />
                  <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">{L.diagramDesc[3]}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── PROJETOS ── */}
        <section id="projetos" style={PXY} className="border-t border-[var(--border-dim)]">
          <div className="mb-[60px] reveal">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.projects}</p>
            <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              {L.projectHeading[persona].split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.name}
                className={`border bg-[var(--bg2)] p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 reveal ${p.wip ? 'border-dashed border-[var(--border-dim)] opacity-75 hover:opacity-100' : 'border-[var(--border-dim)] hover:border-[var(--border)]'}`}>
                <span className={`font-mono text-[10px] tracking-widest px-2.5 py-1 border w-fit ${p.tagClass}`}>
                  {!p.wip && '● '}{p.tag}
                </span>
                <h3 className="font-serif text-[22px] text-white leading-snug">{p.name}</h3>
                <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map(s => (
                    <span key={s} className="font-mono text-[11px] px-2.5 py-0.5 bg-[var(--bg3)] text-[var(--text-muted)] border border-[var(--border-dim)]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section id="servicos" style={PXY} className="border-t border-[var(--border-dim)] bg-[var(--bg2)]">
          <div className="mb-[60px] reveal">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.services}</p>
            <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              {svc.title.map((line, i) => <span key={i}>{line}{i < svc.title.length - 1 && <br />}</span>)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {svc.services.map(s => (
              <div key={s.name} className="p-10 border border-[var(--border-dim)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all reveal flex flex-col gap-3">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="font-serif text-[22px] text-white">{s.name}</h3>
                <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed flex-1">{s.desc}</p>
                {s.footer && <p className="font-mono text-[13px] text-[var(--accent)]">{s.footer}</p>}
                <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--accent)] hover:underline mt-1">
                  → {locale === 'pt' ? 'falar sobre isso' : 'talk about this'}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        {posts.length > 0 && (
          <section id="blog" style={PXY} className="border-t border-[var(--border-dim)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[60px]">
              <div className="reveal">
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.blog}</p>
                <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                  {L.blogHeading[persona === 'visitor' ? 'visitor' : 'rh'].split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
                </h2>
                <p className="text-[var(--text-dim)] font-light text-base mt-4 max-w-md">
                  {L.blogSub[persona === 'visitor' ? 'visitor' : 'rh']}
                </p>
              </div>
              <Link href="/blog" className="font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors whitespace-nowrap reveal">
                {L.seeAll}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => <div key={p.slug} className="reveal"><PostCard post={p} /></div>)}
            </div>
          </section>
        )}

        {/* ── CONTATO ── */}
        <section id="contato" style={PXY} className="border-t border-[var(--border-dim)] text-center overflow-hidden">
          <div className="absolute w-[800px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,111,255,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10 reveal">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">{L.contact}</p>
            <h2 className="font-serif leading-tight tracking-tight text-white mb-5" style={{ fontSize: 'clamp(40px,6vw,72px)' }}>
              {ctaTitle.map((line, i) => <span key={i}>{line}{i < ctaTitle.length - 1 && <br />}</span>)}
            </h2>
            <p className="text-lg text-[var(--text-dim)] font-light mb-12">
              {L.contactSub.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <><br className="hidden md:block" /></>}</span>)}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider hover:bg-[#4a5eee] hover:-translate-y-0.5 transition-all">
                {L.ctaWA}
              </a>
              <a href="https://www.linkedin.com/in/matheus-keeven/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--text)] transition-all">
                {L.ctaLI}
              </a>
            </div>
          </div>
        </section>

        <footer style={PX} className="py-8 border-t border-[var(--border-dim)] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-[var(--text-muted)]">{L.footer1}</p>
          <p className="font-mono text-xs text-[var(--text-muted)]">{L.footer2}</p>
        </footer>

      </main>
    </>
  )
}
