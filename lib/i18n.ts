export type Locale = 'pt' | 'en'
export type Persona = 'rh' | 'ceo' | 'visitor'

// ── Nav ──────────────────────────────────────────────────────────────────

export const NAV = {
  pt: {
    links: [
      { href: '/#sobre', label: 'sobre' },
      { href: '/#arquitetura', label: 'arquitetura' },
      { href: '/#projetos', label: 'projetos' },
      { href: '/#servicos', label: 'serviços' },
      { href: '/blog', label: 'blog' },
    ],
    cta: '→ fale comigo',
    changePersona: '↩ mudar perfil',
  },
  en: {
    links: [
      { href: '/#sobre', label: 'about' },
      { href: '/#arquitetura', label: 'architecture' },
      { href: '/#projetos', label: 'projects' },
      { href: '/#servicos', label: 'services' },
      { href: '/blog', label: 'blog' },
    ],
    cta: '→ contact me',
    changePersona: '↩ switch profile',
  },
}

// ── PersonaSelector ───────────────────────────────────────────────────────

export const SELECTOR = {
  pt: {
    label: '// quem é você?',
    headline: ['Conta pra mim —', 'vou adaptar o que você vê.'],
    sub: 'O conteúdo muda dependendo do seu contexto. Você pode trocar quando quiser.',
    options: [
      { id: 'rh' as Persona, icon: '◈', label: 'RH / Recrutador', detail: 'Foco em stack técnica, experiência e disponibilidade para contratação' },
      { id: 'ceo' as Persona, icon: '⬡', label: 'CEO / Founder', detail: 'Foco em produtos prontos, integrações e resultado de negócio' },
      { id: 'visitor' as Persona, icon: '◎', label: 'Visitante', detail: 'Visão geral sem termos técnicos — só o que importa' },
    ],
  },
  en: {
    label: '// who are you?',
    headline: ['Tell me —', "I'll adapt what you see."],
    sub: 'The content changes based on your context. You can switch anytime.',
    options: [
      { id: 'rh' as Persona, icon: '◈', label: 'HR / Recruiter', detail: 'Focus on tech stack, experience, and hiring availability' },
      { id: 'ceo' as Persona, icon: '⬡', label: 'CEO / Founder', detail: 'Focus on ready products, integrations, and business results' },
      { id: 'visitor' as Persona, icon: '◎', label: 'Visitor', detail: 'General overview without technical jargon — just what matters' },
    ],
  },
}

// ── Labels (section headings, misc strings) ───────────────────────────────

export const LABELS = {
  pt: {
    about: '// sobre mim',
    architecture: '// arquitetura',
    whatIDo: '// o que eu faço',
    projects: '// projetos',
    services: '// serviços',
    blog: '// blog',
    contact: '// contato',
    archHeading: {
      rh: 'Como eu penso sistemas',
      ceo: 'Como entrego:\nrápido, confiável, no prazo',
    },
    whatIDoHeading: 'Na prática,\no que significa isso?',
    projectHeading: {
      rh: 'O que já construí\ne o que está vindo',
      ceo: 'O que já construí\ne o que está vindo',
      visitor: 'O que já\nconstruí',
    },
    blogHeading: {
      rh: 'Pensando em\nsistemas em voz alta',
      visitor: 'Explicando\ncomo sistemas funcionam',
    },
    blogSub: {
      rh: 'Arquitetura, decisões de design e IA aplicada. Para devs e founders que querem construir sistemas que duram.',
      visitor: 'Artigos sobre como sistemas funcionam — sem precisar ser da área de tecnologia.',
    },
    seeAll: 'ver todos →',
    contactSub: 'Me manda uma mensagem. Sem formulário, sem reunião de discovery de 1h.\nDireto ao ponto.',
    ctaWA: '↗ WhatsApp agora',
    ctaLI: '→ LinkedIn',
    footer1: '© 2026 Matheus Ramos — Arquiteto de Software & IA',
    footer2: 'Recife, PE · Brasil',
    diagramDesc: [
      'Gateway centralizado, serviços desacoplados por domínio, comunicação async via eventos. Cada serviço em container independente.',
      'Canal agnóstico (WA + webchat), orquestrador de fluxo, agente com tools reais e memória de sessão por cliente.',
      'Push no main dispara build Docker no VPS. Zero downtime com swap de containers.',
      'Auth stateless com JWT + RBAC por tenant. Cada cliente tem seu namespace isolado.',
    ],
    whatIDoCards: [
      { icon: '🤖', title: 'Robôs que atendem clientes', desc: 'Sistemas que respondem no WhatsApp, site ou aplicativo — 24 horas por dia, sem precisar de uma pessoa na frente do computador.' },
      { icon: '🔗', title: 'Ferramentas conectadas', desc: 'Faço sistemas diferentes conversarem. WhatsApp com planilhas, loja virtual com sistema de gestão, formulário com CRM.' },
      { icon: '🏗️', title: 'Sistema do zero', desc: 'Construo plataformas completas — desde onde os dados ficam guardados até a tela que a sua equipe usa todo dia.' },
      { icon: '⚡', title: 'Sistema que não cai', desc: 'Projeto sistemas para aguentar muita gente acessando ao mesmo tempo, sem travar e sem perder dados.' },
    ],
  },
  en: {
    about: '// about me',
    architecture: '// architecture',
    whatIDo: '// what I do',
    projects: '// projects',
    services: '// services',
    blog: '// blog',
    contact: '// contact',
    archHeading: {
      rh: 'How I think about systems',
      ceo: 'How I deliver:\nfast, reliable, on time',
    },
    whatIDoHeading: 'What does that actually\nmean in practice?',
    projectHeading: {
      rh: "What I've built\nand what's coming",
      ceo: "What I've built\nand what's coming",
      visitor: "What I've\nalready built",
    },
    blogHeading: {
      rh: 'Thinking about systems\nout loud',
      visitor: 'Explaining how\nsystems work',
    },
    blogSub: {
      rh: 'Architecture, design decisions, and applied AI. For devs and founders who want to build systems that last.',
      visitor: 'Articles explaining how systems work — without needing to be in tech to understand.',
    },
    seeAll: 'see all →',
    contactSub: "Send me a message. No forms, no 1-hour discovery call.\nStraight to the point.",
    ctaWA: '↗ WhatsApp now',
    ctaLI: '→ LinkedIn',
    footer1: '© 2026 Matheus Ramos — Software Architect & AI',
    footer2: 'Recife, PE · Brazil',
    diagramDesc: [
      'Centralized gateway, domain-decoupled services, async event communication. Each service in its own container.',
      'Channel-agnostic (WhatsApp + webchat), flow orchestrator, AI agent with real tools and per-client session memory.',
      'Push to main triggers Docker build on VPS. Zero downtime with container swap.',
      'Stateless auth with JWT + RBAC per tenant. Each client has their own isolated namespace.',
    ],
    whatIDoCards: [
      { icon: '🤖', title: 'Bots that handle customers', desc: 'Systems that respond on WhatsApp, websites, or apps — 24 hours a day, without anyone sitting at a computer.' },
      { icon: '🔗', title: 'Connected tools', desc: "I make different systems talk to each other. WhatsApp with spreadsheets, online store with management system, form with CRM." },
      { icon: '🏗️', title: 'System from scratch', desc: "I build complete platforms — from where data is stored to the screen your team uses every day." },
      { icon: '⚡', title: 'System that stays up', desc: 'I design systems to handle many concurrent users without freezing or losing data.' },
    ],
  },
}

// ── Hero ─────────────────────────────────────────────────────────────────

interface HeroContent {
  tagText: string; dotColor: string; h1a: string; h1b: string; sub: string
  ctaPrimary: { href: string; label: string }
  ctaSecondary: { href: string; label: string }
  stats: string[][]
}

export const HERO: Record<Persona, Record<Locale, HeroContent>> = {
  rh: {
    pt: {
      tagText: 'aberto a oportunidades', dotColor: '#fbbf24',
      h1a: 'Arquiteto de', h1b: 'Software & IA Sênior',
      sub: 'Mais de 3 anos projetando sistemas em produção. Python, Node.js, IA aplicada e integrações. Disponível para CLT ou PJ, remoto.',
      ctaPrimary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      ctaSecondary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      stats: [['3+', 'anos em produção'], ['Sênior', 'nível'], ['Remoto', 'disponível']],
    },
    en: {
      tagText: 'open to opportunities', dotColor: '#fbbf24',
      h1a: 'Software Architect', h1b: '& AI Senior',
      sub: '3+ years designing high-availability systems in production. Python, Node.js, applied AI, and integrations. Available for remote contracts.',
      ctaPrimary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      ctaSecondary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      stats: [['3+', 'years in production'], ['Senior', 'level'], ['Remote', 'available']],
    },
  },
  ceo: {
    pt: {
      tagText: 'disponível para projetos', dotColor: '#4ade80',
      h1a: 'Sistemas que fazem', h1b: 'seu negócio crescer',
      sub: 'Do zero ao produto em produção — SaaS, automações com IA, white-labels e integrações. Você vê funcionando, não só um protótipo.',
      ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      stats: [['3+', 'anos em produção'], ['5+', 'produtos lançados'], ['54%', 'sócio Nobreak IA']],
    },
    en: {
      tagText: 'available for projects', dotColor: '#4ade80',
      h1a: 'Systems that make', h1b: 'your business grow',
      sub: 'From zero to production — SaaS, AI automation, white-labels, and integrations. You see it working, not just a prototype.',
      ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      stats: [['3+', 'years in production'], ['5+', 'products launched'], ['54%', 'Nobreak IA partner']],
    },
  },
  visitor: {
    pt: {
      tagText: 'disponível para conversar', dotColor: '#4ade80',
      h1a: 'Faço sistemas que', h1b: 'funcionam de verdade',
      sub: 'Quando uma empresa precisa de algo — atender clientes automaticamente, conectar ferramentas, ou ter um sistema próprio — é isso que projeto e construo.',
      ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      stats: [['3+', 'anos de experiência'], ['10+', 'sistemas feitos'], ['Recife', 'PE · Brasil']],
    },
    en: {
      tagText: 'available for a chat', dotColor: '#4ade80',
      h1a: 'I build systems that', h1b: 'actually work',
      sub: "When a company needs something — automated customer support, tool integrations, or a custom system — that's exactly what I design and build.",
      ctaPrimary: { href: 'https://wa.me/5581995695520', label: '↗ WhatsApp' },
      ctaSecondary: { href: 'https://www.linkedin.com/in/matheus-keeven/', label: '→ LinkedIn' },
      stats: [['3+', 'years of experience'], ['10+', 'systems built'], ['Recife', 'PE · Brazil']],
    },
  },
}

// ── About ─────────────────────────────────────────────────────────────────

interface AboutContent { heading: string[]; paragraphs: string[]; note: string | null }

export const ABOUT: Record<Persona, Record<Locale, AboutContent>> = {
  rh: {
    pt: {
      heading: ['Arquiteto que entrega', 'resultados, não só código.'],
      paragraphs: [
        'Sou Matheus Ramos, Arquiteto de Software Sênior com mais de 3 anos projetando sistemas de alta disponibilidade em produção real. Atualmente na Atimo LLC (empresa americana) como desenvolvedor sênior e arquiteto responsável por sistemas críticos.',
        'Especialista em Python, Node.js, arquitetura de microserviços, filas de mensagem, integrações com APIs externas e automações com IA — incluindo integração com ERPs e sistemas legados.',
        'Co-fundador da Nobreak IA — construí do zero: arquitetura, infra, backend e frontend. Responsabilidade real, não só colaboração.',
        'Pós em Arquitetura de Software + IA (XP Educação / IGTI, em andamento). Residência técnica no Porto Digital, CESAR School.',
      ],
      note: 'CLT · PJ · Remoto · Disponível imediatamente',
    },
    en: {
      heading: ['An architect who delivers', 'results, not just code.'],
      paragraphs: [
        "I'm Matheus Ramos, a Senior Software Architect with 3+ years designing high-availability systems in real production environments. Currently at Atimo LLC (US company) as senior developer and architect responsible for critical systems.",
        'Specialist in Python, Node.js, microservices architecture, message queues, external API integrations, and AI automation — including ERP and legacy system integrations.',
        'Co-founder of Nobreak IA — built from scratch: architecture, infrastructure, backend, and frontend. Real ownership, not just collaboration.',
        'Pursuing a post-graduate degree in Software Architecture + AI (XP Educação / IGTI). Technical residency at Porto Digital, CESAR School.',
      ],
      note: 'CLT · PJ · Remote · Available immediately',
    },
  },
  ceo: {
    pt: {
      heading: ['Não vendo tecnologia.', 'Vendo o que ela', 'faz pro seu negócio.'],
      paragraphs: [
        'Construo sistemas que geram resultado — não só código que funciona no laptop. Sou co-fundador e arquiteto da Nobreak IA: plataforma de IA para negócios construída do zero, rodando em produção.',
        'Quando entro em um projeto, penso em custo de infra, escalabilidade antes que vire problema e decisões que você não vai ter que desfazer em 6 meses.',
        'Trabalho remotamente para a Atimo LLC (EUA) como arquiteto sênior — sistemas de alta disponibilidade, integrações complexas, automações que rodam 24h.',
        'Se você tem uma ideia de produto ou um sistema que precisa crescer, posso ser o técnico que transforma isso em execução real.',
      ],
      note: null,
    },
    en: {
      heading: ["I don't sell technology.", 'I sell what it does', 'for your business.'],
      paragraphs: [
        "I build systems that generate results — not just code that works on a laptop. I'm the co-founder and architect of Nobreak IA: an AI platform for businesses built from scratch, running in production.",
        "When I join a project, I think about infrastructure cost, scalability before it becomes a problem, and decisions you won't have to undo in 6 months.",
        'I work remotely for Atimo LLC (US) as a senior architect — high-availability systems, complex integrations, automations that run 24/7.',
        'If you have a product idea or a system that needs to scale, I can be the technical partner who turns that into real execution.',
      ],
      note: null,
    },
  },
  visitor: {
    pt: {
      heading: ['Faço sistemas.', 'Simples assim.'],
      paragraphs: [
        'Me chamo Matheus Ramos. Há mais de 3 anos construo sistemas de computador que empresas usam no dia a dia — coisas que ficam ligadas 24 horas, que atendem clientes, processam pedidos sem precisar de alguém na frente do computador.',
        'Meu trabalho é pensar em como as peças se encaixam — quais ferramentas usar, como o sistema vai crescer quando a empresa crescer, e como evitar que quebre.',
        'Além do trabalho fixo em uma empresa americana, sou co-fundador da Nobreak IA: um sistema que coloca atendimento automatizado via IA no WhatsApp de negócios locais.',
      ],
      note: null,
    },
    en: {
      heading: ['I build systems.', 'Simple as that.'],
      paragraphs: [
        "My name is Matheus Ramos. For 3+ years I've been building computer systems that companies use every day — things that stay on 24 hours, handle customer inquiries, and process orders without anyone sitting at a computer.",
        'My job is to figure out how the pieces fit together — not just write code, but decide which tools to use, how the system will grow as the business grows, and how to prevent it from breaking under pressure.',
        "Alongside my full-time role at a US company, I'm co-founder of Nobreak IA — a system that brings AI-powered customer support to local businesses via WhatsApp.",
      ],
      note: null,
    },
  },
}

// ── Skills ───────────────────────────────────────────────────────────────

export const SKILLS: Record<Persona, Record<Locale, [string, number][]>> = {
  rh: {
    pt: [
      ['Python / Node.js', 92], ['Arquitetura de Software', 90],
      ['React / Next.js', 85], ['IA / LLMs / RAG', 82],
      ['Docker / VPS / Linux', 82], ['Integrações / APIs', 88],
      ['MongoDB / SQL / Redis', 80], ['Microserviços', 85],
      ['Cloud Architecture', 75], ['PHP / Laravel', 70],
    ],
    en: [
      ['Python / Node.js', 92], ['Software Architecture', 90],
      ['React / Next.js', 85], ['AI / LLMs / RAG', 82],
      ['Docker / VPS / Linux', 82], ['Integrations / APIs', 88],
      ['MongoDB / SQL / Redis', 80], ['Microservices', 85],
      ['Cloud Architecture', 75], ['PHP / Laravel', 70],
    ],
  },
  ceo: {
    pt: [
      ['SaaS e white-label', 92], ['IA integrada ao produto', 88],
      ['Plataformas escaláveis', 90], ['Deploy e infraestrutura', 82],
      ['APIs e integrações', 88], ['Do zero à produção', 85],
      ['Bancos de dados', 80], ['Automações de processo', 82],
      ['Multi-tenant', 85], ['Custo de infra controlado', 75],
    ],
    en: [
      ['SaaS & white-label', 92], ['AI product integration', 88],
      ['Scalable platforms', 90], ['Deploy & infrastructure', 82],
      ['APIs & integrations', 88], ['From zero to production', 85],
      ['Databases', 80], ['Process automation', 82],
      ['Multi-tenant', 85], ['Infrastructure cost control', 75],
    ],
  },
  visitor: {
    pt: [
      ['Robôs que atendem clientes', 92], ['Sites e sistemas web', 85],
      ['Conectar ferramentas', 88], ['Servidor sempre no ar', 82],
      ['Tarefas automáticas', 80], ['Sistema que cresce sem quebrar', 85],
      ['Banco de dados', 80], ['IA que responde perguntas', 82],
      ['Hospedagem em nuvem', 75], ['Sistemas antigos', 70],
    ],
    en: [
      ['Bots that handle customers', 92], ['Websites & web systems', 85],
      ['Connecting tools', 88], ['Server always online', 82],
      ['Automatic task processing', 80], ['System that scales', 85],
      ['Databases', 80], ['AI that answers questions', 82],
      ['Cloud hosting', 75], ['Legacy systems', 70],
    ],
  },
}

// ── Services ─────────────────────────────────────────────────────────────

interface Service { icon: string; name: string; desc: string; footer: string | null }
interface ServicesSection { title: string[]; services: Service[] }

export const SERVICES: Record<Persona, Record<Locale, ServicesSection>> = {
  rh: {
    pt: {
      title: ['O que trago', 'para um time'],
      services: [
        { icon: '⬡', name: 'Arquitetura de Sistemas', desc: 'Projeto a estrutura técnica de sistemas do zero ou reestrutura o que já existe. Domain-driven, escalável, sem gambiarra.', footer: 'Sênior · CLT ou PJ · Remoto' },
        { icon: '◈', name: 'Python + IA + Integrações', desc: 'Especialista em automações com Python, LLMs (OpenAI, Claude), RAG, integração com ERPs e APIs de terceiros.', footer: 'Sênior · Python · Node.js' },
        { icon: '◎', name: 'Tech Lead / Mentoria', desc: 'Capacito times em arquitetura, boas práticas e tomada de decisão técnica. Já liderando equipes remotas na Atimo LLC.', footer: 'Disponível imediatamente' },
      ],
    },
    en: {
      title: ['What I bring', 'to a team'],
      services: [
        { icon: '⬡', name: 'Systems Architecture', desc: 'I design the technical structure of systems from scratch or restructure existing ones. Domain-driven, scalable, no shortcuts.', footer: 'Senior · CLT or PJ · Remote' },
        { icon: '◈', name: 'Python + AI + Integrations', desc: 'Specialist in Python automation, LLMs (OpenAI, Claude), RAG, and integrations with ERPs and third-party APIs.', footer: 'Senior · Python · Node.js' },
        { icon: '◎', name: 'Tech Lead / Mentoring', desc: 'I coach teams on architecture, engineering best practices, and technical decision-making. Already leading remote teams at Atimo LLC.', footer: 'Available immediately' },
      ],
    },
  },
  ceo: {
    pt: {
      title: ['O que posso', 'construir pra você'],
      services: [
        { icon: '⬡', name: 'Análise do seu sistema', desc: 'Descubro onde seu sistema está custando mais do que deveria ou impedindo crescimento. Entrego um plano técnico claro — sem tecniquês.', footer: 'R$ 800–1.500 · projeto pontual' },
        { icon: '◈', name: 'Plataforma SaaS / white-label', desc: 'Construo do zero: sistema multi-cliente, cobrança recorrente, painel admin. Pronto para vender ou licenciar.', footer: 'sob orçamento' },
        { icon: '◎', name: 'IA no seu produto', desc: 'Integro IA no que você já tem — ou construo do zero. Agentes, automações, respostas automáticas. Em semanas, não meses.', footer: 'R$ 1.500–3.000 · projeto' },
      ],
    },
    en: {
      title: ['What I can', 'build for you'],
      services: [
        { icon: '⬡', name: 'System Review', desc: "I find where your system is costing more than it should or blocking growth. I deliver a clear technical plan — without the jargon.", footer: 'from $200 · one-time project' },
        { icon: '◈', name: 'SaaS / White-label Platform', desc: 'Built from scratch: multi-client system, recurring billing, admin panel. Ready to sell or license.', footer: 'custom quote' },
        { icon: '◎', name: 'AI in your product', desc: "I integrate AI into what you already have — or build from scratch. Agents, automation, automatic responses. In weeks, not months.", footer: 'from $300 · project' },
      ],
    },
  },
  visitor: {
    pt: {
      title: ['Como', 'posso ajudar'],
      services: [
        { icon: '⬡', name: 'Olho o que você tem', desc: 'Analiso o sistema atual e explico o que está funcionando e o que poderia ser melhor. Em linguagem simples, sem jargão.', footer: null },
        { icon: '◈', name: 'Construo o que falta', desc: 'Se você precisa de um site, sistema ou automação — construo do início ao fim. Você vê funcionando, não só um protótipo.', footer: null },
        { icon: '◎', name: 'Conecto tudo', desc: 'Faço ferramentas diferentes conversarem: WhatsApp, planilhas, sistemas de gestão, CRM. Automatizo o que você faz na mão.', footer: null },
      ],
    },
    en: {
      title: ['How I can', 'help you'],
      services: [
        { icon: '⬡', name: 'I look at what you have', desc: "I analyze your current system and explain what's working and what could be better. Plain language, no jargon.", footer: null },
        { icon: '◈', name: 'I build what is missing', desc: "If you need a website, system, or automation — I build it from start to finish. You see it working, not just a prototype.", footer: null },
        { icon: '◎', name: 'I connect everything', desc: "I make different tools talk to each other: WhatsApp, spreadsheets, management systems, CRMs. I automate what you do by hand.", footer: null },
      ],
    },
  },
}

// ── Projects ─────────────────────────────────────────────────────────────

interface Project { tag: string; tagClass: string; name: string; desc: string; stack: string[]; wip: boolean }

const LIVE = 'bg-[rgba(74,222,128,0.1)] text-[#4ade80] border-[rgba(74,222,128,0.3)]'
const WIP = 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.3)]'

export const PROJECTS: Record<Persona, Record<Locale, Project[]>> = {
  rh: {
    pt: [
      { tag: 'ao vivo', tagClass: LIVE, name: 'Nobreak IA', desc: 'Plataforma multi-tenant de agentes IA para negócios locais. WhatsApp + webchat + LP pública por cliente. Co-fundador e arquiteto do zero.', stack: ['Node.js', 'Next.js', 'MongoDB', 'Docker', 'OpenAI', 'WhatsApp API'], wip: false },
      { tag: 'em construção', tagClass: WIP, name: 'Node API Boilerplate', desc: 'Template open-source com arquitetura limpa, JWT, RBAC, testes e CI/CD pronto para produção.', stack: ['Node.js', 'TypeScript', 'Jest', 'Docker', 'GitHub Actions'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'AI Integration Kit', desc: 'Toolkit para integrar LLMs em sistemas existentes. Abstração de providers (OpenAI, Claude, Gemini) com fallback e cache.', stack: ['Python', 'FastAPI', 'LangChain', 'Redis'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'ADR Template System', desc: 'CLI + sistema de Architecture Decision Records para documentação técnica estruturada e rastreável.', stack: ['Node.js', 'Markdown', 'CLI'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'SaaS Starter Kit', desc: 'Boilerplate completo: auth, billing com Stripe, multi-tenant, dashboard admin.', stack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'Blog Técnico', desc: 'Artigos sobre arquitetura de software, decisões de design e IA aplicada.', stack: ['Next.js', 'MDX'], wip: true },
    ],
    en: [
      { tag: 'live', tagClass: LIVE, name: 'Nobreak IA', desc: 'Multi-tenant AI agent platform for local businesses. WhatsApp + webchat + public LP per client. Co-founder and architect from scratch.', stack: ['Node.js', 'Next.js', 'MongoDB', 'Docker', 'OpenAI', 'WhatsApp API'], wip: false },
      { tag: 'in progress', tagClass: WIP, name: 'Node API Boilerplate', desc: 'Open-source template with clean architecture, JWT, RBAC, tests, and CI/CD ready for production.', stack: ['Node.js', 'TypeScript', 'Jest', 'Docker', 'GitHub Actions'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'AI Integration Kit', desc: 'Toolkit for integrating LLMs into existing systems. Provider abstraction (OpenAI, Claude, Gemini) with fallback and cache.', stack: ['Python', 'FastAPI', 'LangChain', 'Redis'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'ADR Template System', desc: 'CLI + Architecture Decision Records system for structured, traceable technical documentation.', stack: ['Node.js', 'Markdown', 'CLI'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'SaaS Starter Kit', desc: 'Complete boilerplate: auth, Stripe billing, multi-tenant, admin dashboard.', stack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'Technical Blog', desc: 'Articles about software architecture, design decisions, and applied AI.', stack: ['Next.js', 'MDX'], wip: true },
    ],
  },
  ceo: {
    pt: [
      { tag: 'ao vivo', tagClass: LIVE, name: 'Nobreak IA', desc: 'Plataforma de atendimento via IA — white-label para qualquer negócio. WhatsApp + webchat + página própria por cliente. Em produção.', stack: ['Multi-cliente', 'WhatsApp', 'IA', 'White-label'], wip: false },
      { tag: 'em construção', tagClass: WIP, name: 'SaaS Starter Kit', desc: 'Template completo para lançar um micro-SaaS em dias — cobrança recorrente, painel admin, multi-cliente. Você começa a vender, não a configurar.', stack: ['Next.js', 'Stripe', 'Multi-cliente'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'AI Integration Kit', desc: 'Conecta IA ao sistema que você já tem — sem reescrever do zero. Funciona com OpenAI, Claude, Gemini.', stack: ['Qualquer sistema', 'OpenAI', 'Claude'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'Node API Boilerplate', desc: 'Backend pronto para crescer: autenticação, permissões, testes, deploy automático. Sem partir do zero toda vez.', stack: ['Node.js', 'TypeScript', 'Docker'], wip: true },
    ],
    en: [
      { tag: 'live', tagClass: LIVE, name: 'Nobreak IA', desc: 'AI-powered customer service platform — white-label for any business. WhatsApp + webchat + dedicated page per client. In production.', stack: ['Multi-client', 'WhatsApp', 'AI', 'White-label'], wip: false },
      { tag: 'in progress', tagClass: WIP, name: 'SaaS Starter Kit', desc: 'Complete template to launch a micro-SaaS in days — recurring billing, admin panel, multi-client. Start selling, not configuring.', stack: ['Next.js', 'Stripe', 'Multi-client'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'AI Integration Kit', desc: "Connects AI to the system you already have — no full rewrite needed. Works with OpenAI, Claude, Gemini.", stack: ['Any system', 'OpenAI', 'Claude'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'Node API Boilerplate', desc: 'Backend ready to scale: auth, permissions, tests, auto deploy. No starting from scratch every time.', stack: ['Node.js', 'TypeScript', 'Docker'], wip: true },
    ],
  },
  visitor: {
    pt: [
      { tag: 'ao vivo', tagClass: LIVE, name: 'Nobreak IA', desc: 'Um robô que atende clientes pelo WhatsApp — aprende sobre o negócio e responde automaticamente. Já funcionando para empresas reais.', stack: ['WhatsApp', 'Atendimento via IA'], wip: false },
      { tag: 'em construção', tagClass: WIP, name: 'Kit de início rápido', desc: 'Um pacote para quem quer lançar um produto digital sem partir do zero — inclui tudo que uma empresa precisa para começar a cobrar.', stack: ['Produto digital', 'Cobrança', 'Painel admin'], wip: true },
      { tag: 'em construção', tagClass: WIP, name: 'Blog', desc: 'Artigos explicando como sistemas funcionam — sem precisar ser da área de tecnologia para entender.', stack: ['Artigos', 'Explicações simples'], wip: true },
    ],
    en: [
      { tag: 'live', tagClass: LIVE, name: 'Nobreak IA', desc: "A bot that handles customers on WhatsApp — learns about the business and responds automatically. Already running for real businesses.", stack: ['WhatsApp', 'AI Customer Service'], wip: false },
      { tag: 'in progress', tagClass: WIP, name: 'Quick start kit', desc: 'A package for those who want to launch a digital product without starting from zero — everything a company needs to start charging.', stack: ['Digital product', 'Billing', 'Admin panel'], wip: true },
      { tag: 'in progress', tagClass: WIP, name: 'Blog', desc: 'Articles explaining how systems work — without needing to be in tech to understand.', stack: ['Articles', 'Plain explanations'], wip: true },
    ],
  },
}

// ── CTA Titles ───────────────────────────────────────────────────────────

export const CTA_TITLE: Record<Persona, Record<Locale, string[]>> = {
  rh: {
    pt: ['Vamos conversar', 'sobre oportunidades?'],
    en: ["Let's talk about", 'opportunities?'],
  },
  ceo: {
    pt: ['Seu produto está', 'pronto para crescer?'],
    en: ['Is your product ready', 'to scale?'],
  },
  visitor: {
    pt: ['Ficou com alguma', 'dúvida?'],
    en: ['Got any', 'questions?'],
  },
}
