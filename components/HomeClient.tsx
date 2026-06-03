'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import PersonaSelector, { type Persona } from '@/components/PersonaSelector'
import type { PostMeta } from '@/types/post'

// ═══════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════

const HERO = {
  rh: {
    tagText: 'aberto a oportunidades',
    dotColor: '#fbbf24',
    h1a: 'Arquiteto de',
    h1b: 'Software & IA Sênior',
    sub: 'Mais de 3 anos projetando sistemas de alta disponibilidade em produção. Python, Node.js, IA aplicada, integrações e microserviços. Disponível para CLT ou PJ, remoto.',
    ctaPrimary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
    ctaSecondary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
    stats: [['3+', 'anos em produção'], ['Sênior', 'nível'], ['Remoto', 'disponível']],
  },
  ceo: {
    tagText: 'disponível para projetos',
    dotColor: '#4ade80',
    h1a: 'Sistemas que fazem',
    h1b: 'seu negócio crescer',
    sub: 'Do zero ao produto em produção — SaaS, automações com IA, white-labels e integrações. Você vê funcionando, não só um protótipo.',
    ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
    ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
    stats: [['3+', 'anos em produção'], ['5+', 'produtos lançados'], ['54%', 'sócio Nobreak IA']],
  },
  visitor: {
    tagText: 'disponível para conversar',
    dotColor: '#4ade80',
    h1a: 'Faço sistemas que',
    h1b: 'funcionam de verdade',
    sub: 'Quando uma empresa precisa de algo — atender clientes automaticamente, conectar ferramentas, ou ter um sistema próprio — é isso que projeto e construo.',
    ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
    ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
    stats: [['3+', 'anos de experiência'], ['10+', 'sistemas feitos'], ['Recife', 'PE · Brasil']],
  },
}

const ABOUT = {
  rh: {
    heading: ['Arquiteto que entrega', 'resultados, não só código.'],
    paragraphs: [
      'Sou Matheus Ramos, Arquiteto de Software Sênior com mais de 3 anos projetando sistemas de alta disponibilidade em produção real. Atualmente na Atimo LLC (empresa americana) como desenvolvedor sênior e arquiteto responsável por sistemas críticos.',
      'Especialista em Python, Node.js, arquitetura de microserviços, filas de mensagem, integrações com APIs externas e automações com IA — incluindo integração com ERPs e sistemas legados.',
      'Co-fundador da Nobreak IA — construí do zero: arquitetura, infra, backend e frontend. Responsabilidade real, não só colaboração.',
      'Pós em Arquitetura de Software + IA (XP Educação / IGTI, em andamento). Residência técnica no Porto Digital, CESAR School.',
    ],
    note: 'CLT · PJ · Remoto · Disponível imediatamente',
  },
  ceo: {
    heading: ['Não vendo tecnologia.', 'Vendo o que ela', 'faz pro seu negócio.'],
    paragraphs: [
      'Construo sistemas que geram resultado — não só código que funciona no laptop. Sou co-fundador e arquiteto da Nobreak IA: plataforma de IA para negócios construída do zero, rodando em produção.',
      'Quando entro em um projeto, penso em custo de infra, escalabilidade antes que vire problema e decisões que você não vai ter que desfazer em 6 meses.',
      'Trabalho remotamente para a Atimo LLC (EUA) como arquiteto sênior — sistemas de alta disponibilidade, integrações complexas, automações que rodam 24h.',
      'Se você tem uma ideia de produto ou um sistema que precisa crescer, posso ser o técnico que transforma isso em execução real.',
    ],
    note: null,
  },
  visitor: {
    heading: ['Faço sistemas.', 'Simples assim.'],
    paragraphs: [
      'Me chamo Matheus Ramos. Há mais de 3 anos construo sistemas de computador que empresas usam no dia a dia — coisas que ficam ligadas 24 horas, que atendem clientes, processam pedidos sem precisar de alguém na frente do computador.',
      'Meu trabalho é pensar em como as peças se encaixam — quais ferramentas usar, como o sistema vai crescer quando a empresa crescer, e como evitar que quebre.',
      'Além do trabalho fixo em uma empresa americana, sou co-fundador da Nobreak IA: um sistema que coloca atendimento automatizado via IA no WhatsApp de negócios locais.',
    ],
    note: null,
  },
}

const SKILLS: Record<Persona, [string, number][]> = {
  rh: [
    ['Python / Node.js', 92], ['Arquitetura de Software', 90],
    ['React / Next.js', 85], ['IA / LLMs / RAG', 82],
    ['Docker / VPS / Linux', 82], ['Integrações / APIs', 88],
    ['MongoDB / SQL / Redis', 80], ['Microserviços', 85],
    ['Cloud Architecture', 75], ['PHP / Laravel', 70],
  ],
  ceo: [
    ['SaaS e white-label', 92], ['IA integrada ao produto', 88],
    ['Plataformas escaláveis', 90], ['Deploy e infraestrutura', 82],
    ['APIs e integrações', 88], ['Do zero à produção', 85],
    ['Bancos de dados', 80], ['Automações de processo', 82],
    ['Multi-tenant', 85], ['Custo de infra controlado', 75],
  ],
  visitor: [
    ['Robôs que atendem clientes', 92], ['Sites e sistemas web', 85],
    ['Conectar ferramentas', 88], ['Servidor sempre no ar', 82],
    ['Tarefas automáticas', 80], ['Sistema que cresce sem quebrar', 85],
    ['Banco de dados', 80], ['IA que responde perguntas', 82],
    ['Hospedagem em nuvem', 75], ['Sistemas antigos', 70],
  ],
}

type Service = { icon: string; name: string; desc: string; footer: string | null }
const SERVICES: Record<Persona, { title: string[]; services: Service[] }> = {
  rh: {
    title: ['O que trago', 'para um time'],
    services: [
      { icon: '⬡', name: 'Arquitetura de Sistemas', desc: 'Projeto a estrutura técnica de sistemas do zero ou reestrutura o que já existe. Domain-driven, escalável, sem gambiarra.', footer: 'Sênior · CLT ou PJ · Remoto' },
      { icon: '◈', name: 'Python + IA + Integrações', desc: 'Especialista em automações com Python, LLMs (OpenAI, Claude), RAG, integração com ERPs e APIs de terceiros.', footer: 'Sênior · Python · Node.js' },
      { icon: '◎', name: 'Tech Lead / Mentoria', desc: 'Capacito times em arquitetura, boas práticas e tomada de decisão técnica. Já liderando equipes remotas na Atimo LLC.', footer: 'Disponível imediatamente' },
    ],
  },
  ceo: {
    title: ['O que posso', 'construir pra você'],
    services: [
      { icon: '⬡', name: 'Análise do seu sistema', desc: 'Descubro onde seu sistema está custando mais do que deveria ou impedindo crescimento. Entrego um plano técnico claro — sem tecniquês.', footer: 'R$ 800–1.500 · projeto pontual' },
      { icon: '◈', name: 'Plataforma SaaS / white-label', desc: 'Construo do zero: sistema multi-cliente, cobrança recorrente, painel admin. Pronto para vender ou licenciar.', footer: 'sob orçamento' },
      { icon: '◎', name: 'IA no seu produto', desc: 'Integro IA no que você já tem — ou construo do zero. Agentes, automações, respostas automáticas. Em semanas, não meses.', footer: 'R$ 1.500–3.000 · projeto' },
    ],
  },
  visitor: {
    title: ['Como', 'posso ajudar'],
    services: [
      { icon: '⬡', name: 'Olho o que você tem', desc: 'Analiso o sistema atual e explico o que está funcionando e o que poderia ser melhor. Em linguagem simples, sem jargão.', footer: null },
      { icon: '◈', name: 'Construo o que falta', desc: 'Se você precisa de um site, sistema ou automação — construo do início ao fim. Você vê funcionando, não só um protótipo.', footer: null },
      { icon: '◎', name: 'Conecto tudo', desc: 'Faço ferramentas diferentes conversarem: WhatsApp, planilhas, sistemas de gestão, CRM. Automatizo o que você faz na mão.', footer: null },
    ],
  },
}

type Project = { tag: string; tagClass: string; name: string; desc: string; stack: string[]; wip: boolean }
const PROJECTS: Record<Persona, Project[]> = {
  rh: [
    { tag: 'ao vivo', tagClass: 'bg-[rgba(74,222,128,0.1)] text-[#4ade80] border-[rgba(74,222,128,0.3)]', name: 'Nobreak IA', desc: 'Plataforma multi-tenant de agentes IA para negócios locais. WhatsApp + webchat + LP pública por cliente. Co-fundador e arquiteto do zero.', stack: ['Node.js', 'Next.js', 'MongoDB', 'Docker', 'OpenAI', 'WhatsApp API'], wip: false },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'Node API Boilerplate', desc: 'Template open-source com arquitetura limpa, JWT, RBAC, testes e CI/CD pronto para produção.', stack: ['Node.js', 'TypeScript', 'Jest', 'Docker', 'GitHub Actions'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'AI Integration Kit', desc: 'Toolkit para integrar LLMs em sistemas existentes. Abstração de providers (OpenAI, Claude, Gemini) com fallback e cache.', stack: ['Python', 'FastAPI', 'LangChain', 'Redis'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'ADR Template System', desc: 'CLI + sistema de Architecture Decision Records para documentação técnica estruturada e rastreável.', stack: ['Node.js', 'Markdown', 'CLI'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'SaaS Starter Kit', desc: 'Boilerplate completo: auth, billing com Stripe, multi-tenant, dashboard admin.', stack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'Blog Técnico', desc: 'Artigos sobre arquitetura de software, decisões de design e IA aplicada.', stack: ['Next.js', 'MDX'], wip: true },
  ],
  ceo: [
    { tag: 'ao vivo', tagClass: 'bg-[rgba(74,222,128,0.1)] text-[#4ade80] border-[rgba(74,222,128,0.3)]', name: 'Nobreak IA', desc: 'Plataforma de atendimento via IA — white-label para qualquer negócio. WhatsApp + webchat + página própria por cliente. Em produção.', stack: ['Multi-cliente', 'WhatsApp', 'IA', 'White-label'], wip: false },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'SaaS Starter Kit', desc: 'Template completo para lançar um micro-SaaS em dias — cobrança recorrente, painel admin, multi-cliente. Você começa a vender, não a configurar.', stack: ['Next.js', 'Stripe', 'Multi-cliente'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'AI Integration Kit', desc: 'Conecta IA ao sistema que você já tem — sem reescrever do zero. Funciona com OpenAI, Claude, Gemini.', stack: ['Qualquer sistema', 'OpenAI', 'Claude'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'Node API Boilerplate', desc: 'Backend pronto para crescer: autenticação, permissões, testes, deploy automático. Sem partir do zero toda vez.', stack: ['Node.js', 'TypeScript', 'Docker'], wip: true },
  ],
  visitor: [
    { tag: 'ao vivo', tagClass: 'bg-[rgba(74,222,128,0.1)] text-[#4ade80] border-[rgba(74,222,128,0.3)]', name: 'Nobreak IA', desc: 'Um robô que atende clientes pelo WhatsApp — aprende sobre o negócio e responde automaticamente. Já funcionando para empresas reais.', stack: ['WhatsApp', 'Atendimento via IA'], wip: false },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'Kit de início rápido', desc: 'Um pacote para quem quer lançar um produto digital sem partir do zero — inclui tudo que uma empresa precisa para começar a cobrar.', stack: ['Produto digital', 'Cobrança', 'Painel admin'], wip: true },
    { tag: 'em construção', tagClass: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]', name: 'Blog', desc: 'Artigos explicando como sistemas funcionam — sem precisar ser da área de tecnologia para entender.', stack: ['Artigos', 'Explicações simples'], wip: true },
  ],
}

const CTA_TITLE: Record<Persona, string[]> = {
  rh: ['Vamos conversar', 'sobre oportunidades?'],
  ceo: ['Seu produto está', 'pronto para crescer?'],
  visitor: ['Ficou com alguma', 'dúvida?'],
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT HELPERS — inline styles bypass all CSS layer/scanning issues
// ═══════════════════════════════════════════════════════════════════

const PX = { paddingLeft: 'clamp(24px, 5vw, 60px)', paddingRight: 'clamp(24px, 5vw, 60px)' }
const PXY = { ...PX, paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 120px)' }
const HERO_PAD = { ...PX, paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }

// ═══════════════════════════════════════════════════════════════════
// SVG DIAGRAMS
// ═══════════════════════════════════════════════════════════════════

function DiagramMicro() {
  return (
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
      <defs>
        <marker id="d1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(91,111,255,0.6)" />
        </marker>
      </defs>
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
      <defs>
        <marker id="d2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(155,94,255,0.7)" />
        </marker>
      </defs>
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
      <defs>
        <marker id="d3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(74,222,128,0.7)" />
        </marker>
      </defs>
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
        <marker id="d4a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(91,111,255,0.6)" />
        </marker>
        <marker id="d4b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(251,191,36,0.6)" />
        </marker>
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
      {[
        { y: 55, role: 'OWNER', sub: 'full access', ly: 65 },
        { y: 95, role: 'ADMIN', sub: 'manage agents', ly: 105 },
        { y: 135, role: 'USER', sub: 'read only', ly: 145 },
      ].map(r => (
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

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function HomeClient({ posts }: { posts: PostMeta[] }) {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-persona') as Persona | null
    setPersona(saved)
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
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible')
        obs.observe(el)
      })
    }, 80)
    return () => { clearTimeout(id); obs?.disconnect() }
  }, [persona])

  const select = (p: Persona) => { localStorage.setItem('portfolio-persona', p); setPersona(p) }
  const reset = () => { localStorage.removeItem('portfolio-persona'); setPersona(null) }

  if (!loaded) return <div className="min-h-screen bg-[var(--bg)]" />
  if (!persona) return <PersonaSelector onSelect={select} />

  const h = HERO[persona]
  const a = ABOUT[persona]
  const skills = SKILLS[persona]
  const svc = SERVICES[persona]
  const projects = PROJECTS[persona]
  const ctaTitle = CTA_TITLE[persona]

  return (
    <>
      <Nav onReset={reset} />
      <main key={persona}>

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
              {h.h1a}<br />
              <em className="text-[var(--accent)] not-italic">{h.h1b}</em>
            </h1>

            <p className="text-lg text-[var(--text-dim)] font-light leading-relaxed max-w-xl mt-7 mb-12"
              style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
              {h.sub}
            </p>

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
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// sobre mim</p>
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
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// o que eu faço</p>
              <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                Na prática,<br />o que significa isso?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🤖', title: 'Robôs que atendem clientes', desc: 'Sistemas que respondem no WhatsApp, site ou aplicativo — 24 horas por dia, sem precisar de uma pessoa na frente do computador.' },
                { icon: '🔗', title: 'Ferramentas conectadas', desc: 'Faço sistemas diferentes conversarem. WhatsApp com planilhas, loja virtual com sistema de gestão, formulário com CRM.' },
                { icon: '🏗️', title: 'Sistema do zero', desc: 'Construo plataformas completas — desde onde os dados ficam guardados até a tela que a sua equipe usa todo dia.' },
                { icon: '⚡', title: 'Sistema que não cai', desc: 'Projeto sistemas para aguentar muita gente acessando ao mesmo tempo, sem travar e sem perder dados.' },
              ].map(card => (
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
              <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// arquitetura</p>
              <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                {persona === 'rh' ? 'Como eu penso sistemas' : <>Como entrego:<br />rápido, confiável, no prazo</>}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {persona === 'rh' && (
                <div className="diagram-card reveal">
                  <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">01 — arquitetura de microserviços</p>
                  <DiagramMicro />
                  <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">Gateway centralizado, serviços desacoplados por domínio, comunicação async via eventos. Cada serviço em container independente.</p>
                </div>
              )}
              <div className="diagram-card reveal">
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">
                  {persona === 'rh' ? '02 — ' : '01 — '}fluxo de agente IA (nobreak)
                </p>
                <DiagramAgent />
                <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">Canal agnóstico (WA + webchat), orquestrador de fluxo, agente com tools reais e memória de sessão por cliente.</p>
              </div>
              <div className="diagram-card reveal">
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">
                  {persona === 'rh' ? '03 — ' : '02 — '}deploy pipeline
                </p>
                <DiagramDeploy />
                <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">Push no main dispara build Docker no VPS. Zero downtime com swap de containers.</p>
              </div>
              {persona === 'rh' && (
                <div className="diagram-card reveal">
                  <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.1em] uppercase mb-6">04 — autenticação jwt + rbac</p>
                  <DiagramAuth />
                  <p className="mt-5 text-[13px] text-[var(--text-muted)] font-mono leading-relaxed">Auth stateless com JWT + RBAC por tenant. Cada cliente tem seu namespace isolado.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── PROJETOS ── */}
        <section id="projetos" style={PXY} className="border-t border-[var(--border-dim)]">
          <div className="mb-[60px] reveal">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// projetos</p>
            <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              {persona === 'visitor' ? <>O que já<br />construí</> : <>O que já construí<br />e o que está vindo</>}
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
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// serviços</p>
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
                  → falar sobre isso
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
                <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// blog</p>
                <h2 className="font-serif leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                  {persona === 'visitor' ? <>Explicando<br />como sistemas funcionam</> : <>Pensando em<br />sistemas em voz alta</>}
                </h2>
                {persona === 'visitor' && (
                  <p className="text-[var(--text-dim)] font-light text-base mt-4 max-w-md">
                    Artigos sobre como sistemas funcionam — sem precisar ser da área de tecnologia.
                  </p>
                )}
              </div>
              <Link href="/blog" className="font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors whitespace-nowrap reveal">
                ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <div key={p.slug} className="reveal"><PostCard post={p} /></div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONTATO ── */}
        <section id="contato" style={PXY} className="border-t border-[var(--border-dim)] text-center overflow-hidden">
          <div className="absolute w-[800px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(91,111,255,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10 reveal">
            <p className="font-mono text-[11px] text-[var(--accent)] tracking-[0.2em] uppercase mb-5">// contato</p>
            <h2 className="font-serif leading-tight tracking-tight text-white mb-5" style={{ fontSize: 'clamp(40px,6vw,72px)' }}>
              {ctaTitle.map((line, i) => <span key={i}>{line}{i < ctaTitle.length - 1 && <br />}</span>)}
            </h2>
            <p className="text-lg text-[var(--text-dim)] font-light mb-12">
              Me manda uma mensagem. Sem formulário, sem reunião de discovery de 1h.<br className="hidden md:block" />
              Direto ao ponto.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="https://wa.me/5581995695520" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider hover:bg-[#4a5eee] hover:-translate-y-0.5 transition-all">
                ↗ WhatsApp agora
              </a>
              <a href="https://www.linkedin.com/in/matheus-keeven/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--text)] transition-all">
                → LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer style={PX} className="py-8 border-t border-[var(--border-dim)] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-[var(--text-muted)]">© 2026 Matheus Ramos — Arquiteto de Software & IA</p>
          <p className="font-mono text-xs text-[var(--text-muted)]">Recife, PE · Brasil</p>
        </footer>

      </main>
    </>
  )
}
