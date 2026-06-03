'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ onReset }: { onReset?: () => void } = {}) {
  const path = usePathname()
  const isBlog = path.startsWith('/blog')

  return (
    <nav style={{ paddingLeft: 'clamp(24px, 5vw, 60px)', paddingRight: 'clamp(24px, 5vw, 60px)' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-5 border-b border-[var(--border-dim)] bg-[rgba(5,8,16,0.85)] backdrop-blur-xl">
      <Link href="/" className="font-mono text-sm text-[var(--accent)] tracking-widest">
        MR.DEV
      </Link>
      <ul className="hidden md:flex gap-10 list-none">
        {[
          { href: '/#sobre', label: 'sobre' },
          { href: '/#arquitetura', label: 'arquitetura' },
          { href: '/#projetos', label: 'projetos' },
          { href: '/#servicos', label: 'serviços' },
          { href: '/blog', label: 'blog' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                (label === 'blog' && isBlog) ? 'text-[var(--text)]' : 'text-[var(--text-dim)] hover:text-[var(--text)]'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="hidden md:block font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors border border-[var(--border-dim)] px-3 py-2 tracking-wider"
          >
            ↩ mudar perfil
          </button>
        )}
        <a
          href="https://wa.me/5581995695520"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs px-4 md:px-6 py-2.5 border border-[var(--accent)] text-[var(--accent)] hover:bg-[rgba(91,111,255,0.12)] transition-colors tracking-wider"
        >
          → fale comigo
        </a>
      </div>
    </nav>
  )
}
