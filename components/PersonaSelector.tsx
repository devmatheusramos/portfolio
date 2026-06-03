'use client'

export type Persona = 'rh' | 'ceo' | 'visitor'

const options = [
  {
    id: 'rh' as Persona,
    icon: '◈',
    label: 'RH / Recrutador',
    sub: 'Avaliando o perfil para uma vaga',
    detail: 'Foco em stack técnica, experiência e disponibilidade para contratação',
  },
  {
    id: 'ceo' as Persona,
    icon: '⬡',
    label: 'CEO / Founder',
    sub: 'Preciso construir ou melhorar algo',
    detail: 'Foco em produtos prontos, integrações e resultado de negócio',
  },
  {
    id: 'visitor' as Persona,
    icon: '◎',
    label: 'Visitante',
    sub: 'Curiosidade sobre o trabalho',
    detail: 'Visão geral sem termos técnicos — só o que importa',
  },
]

export default function PersonaSelector({ onSelect }: { onSelect: (p: Persona) => void }) {
  return (
    <div style={{ paddingLeft: 'clamp(24px, 5vw, 60px)', paddingRight: 'clamp(24px, 5vw, 60px)' }}
      className="fixed inset-0 z-[200] bg-[var(--bg)] flex items-center justify-center py-12">
      <div className="max-w-2xl w-full relative z-10" style={{ animation: 'fadeUp 0.5s ease both' }}>
        <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">
          // quem é você?
        </p>
        <h1
          className="font-serif text-white leading-[1.05] tracking-tight mb-4"
          style={{ fontSize: 'clamp(36px,5vw,60px)' }}
        >
          Conta pra mim —<br />
          <em className="text-[var(--accent)] not-italic">vou adaptar o que você vê.</em>
        </h1>
        <p className="text-[var(--text-dim)] font-light text-base mb-12 max-w-md">
          O conteúdo muda dependendo do seu contexto. Você pode trocar quando quiser.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((o, i) => (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              className="text-left p-8 border border-[var(--border-dim)] bg-[var(--bg2)] hover:border-[var(--accent)] hover:bg-[rgba(91,111,255,0.08)] transition-all duration-200 flex flex-col gap-3"
              style={{ animation: `fadeUp 0.5s ${0.1 + i * 0.08}s ease both` }}
            >
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
