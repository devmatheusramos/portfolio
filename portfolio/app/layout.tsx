import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Matheus Ramos — Arquiteto de Software & IA', template: '%s | Matheus Ramos' },
  description: 'Arquiteto de Software especializado em microserviços, escalabilidade horizontal, filas de mensagem e IA aplicada. Consultoria para times e founders.',
  keywords: ['arquiteto de software', 'consultoria de software', 'microserviços', 'Node.js', 'inteligência artificial', 'escalabilidade'],
  authors: [{ name: 'Matheus Ramos' }],
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Matheus Ramos' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
