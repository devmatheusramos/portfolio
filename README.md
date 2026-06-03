# matheus-ramos.dev

Portfolio + Blog. Next.js 15, App Router, Tailwind, MDX.

## Dev

```bash
npm install && npm run dev
```

## Novo post

Crie `content/posts/meu-post.md`:

```markdown
---
title: "Título"
description: "Descrição para SEO"
date: "2026-06-01"
category: "ARQUITETURA"
keywords: ["keyword 1", "keyword 2"]
published: true
---

Conteúdo aqui.
```

## Deploy VPS

```bash
docker compose up -d --build
```

Nginx reverse proxy apontando para `localhost:3000`.

## Deploy Vercel

```bash
npx vercel
```
