'use client'

import { SELECTOR, type Locale } from '@/lib/i18n'

export type Persona = 'rh' | 'ceo' | 'visitor'

interface Props {
  onSelect: (p: Persona) => void
  locale: Locale
  onLocaleChange: () => void
}

export default function PersonaSelector({ onSelect, locale, onLocaleChange }: Props) {
  const s = SELECTOR[locale]

  return (
    <div style={{ paddingLeft: 'clamp(24px, 5vw, 60px)', paddingRight: 'clamp(24px, 5vw, 60px)' }}
      className="fixed inset-0 z-[200] bg-[var(--bg)] flex items-center justify-center py-12">

      {/* Language toggle — top right */}
      <div className="absolute top-5 right-6 md:right-[60px] flex items-center gap-1.5 font-mono text-xs border border-[var(--border-dim)] px-2.5 py-1.5">
        <button onClick={() => locale !== 'pt' && onLocaleChange()}
          className={`transition-opacity ${locale === 'pt' ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}
          title="Português">🇧🇷</button>
        <span className="text-[var(--border)]">·</span>
        <button onClick={() => locale !== 'en' && onLocaleChange()}
          className={`transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}
          title="English">🇺🇸</button>
      </div>

      <div className="max-w-2xl w-full relative z-10" style={{ animation: 'fadeUp 0.5s ease both' }}>
        <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">
          {s.label}
        </p>
        <h1 className="font-serif text-white leading-[1.05] tracking-tight mb-4"
          style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
          {s.headline[0]}<br />
          <em className="text-[var(--accent)] not-italic">{s.headline[1]}</em>
        </h1>
        <p className="text-[var(--text-dim)] font-light text-base mb-12 max-w-md">{s.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {s.options.map((o, i) => (
            <button key={o.id} onClick={() => onSelect(o.id)}
              className="text-left p-8 border border-[var(--border-dim)] bg-[var(--bg2)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all duration-200 flex flex-col gap-3"
              style={{ animation: `fadeUp 0.5s ${0.1 + i * 0.08}s ease both` }}>
              <div className="text-2xl text-[var(--accent)]">{o.icon}</div>
              <div className="font-serif text-[20px] text-white leading-tight">{o.label}</div>
              <div className="font-mono text-[11px] text-[var(--text-muted)] leading-relaxed">{o.detail}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
