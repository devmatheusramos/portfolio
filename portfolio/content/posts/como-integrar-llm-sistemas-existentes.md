---
title: "Como integrar LLMs em sistemas existentes sem reescrever tudo"
description: "O erro mais comum é achar que IA exige uma nova stack. Veja como encaixar agentes e RAG no que você já tem."
date: "2026-06-01"
category: "IA APLICADA"
keywords: ["integração de LLM", "RAG em produção", "agente IA Node.js", "OpenAI API", "LLM arquitetura", "IA em sistemas legados"]
published: true
---

A primeira reação ao adicionar IA num sistema existente é querer reconstruir tudo. Nova stack, novo banco de dados vetorial, nova arquitetura. Isso é quase sempre errado.

LLMs são mais um serviço externo que você chama. A arquitetura que você já tem funciona.

## O padrão mais simples: LLM como serviço

Sua API já existe. Você só precisa de um novo endpoint que chama a OpenAI (ou outro provider) e retorna o resultado:

```javascript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function chat(userMessage: string, systemPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    max_tokens: 1000,
  })

  return response.choices[0].message.content ?? ''
}
```

Isso já resolve muitos casos de uso. Classificação de tickets, geração de resumos, extração de dados de texto.

## RAG: quando o modelo precisa conhecer seus dados

LLMs têm conhecimento até a data de treinamento e não conhecem seus dados específicos. RAG (Retrieval Augmented Generation) resolve isso: antes de chamar o LLM, você busca os dados relevantes e inclui no prompt.

**O fluxo é:**
1. Usuário faz uma pergunta
2. Você busca os documentos/dados relevantes (vetorial ou texto)
3. Monta um prompt com a pergunta + contexto encontrado
4. LLM responde com base no contexto

```javascript
async function ragQuery(question: string): Promise<string> {
  // 1. Buscar contexto relevante
  const context = await searchRelevantDocs(question)

  // 2. Montar prompt com contexto
  const prompt = `
    Responda com base apenas nas informações abaixo.
    Se não encontrar a resposta, diga que não sabe.

    Contexto:
    ${context.map(doc => doc.content).join('\n\n')}

    Pergunta: ${question}
  `

  // 3. Chamar LLM
  return chat(prompt, 'Você é um assistente especializado.')
}
```

Para a busca, você pode começar com pesquisa por texto completo no Postgres antes de partir para embedding vetorial. Muitos casos de uso são resolvidos com `ILIKE` e `tsvector`.

## Embeddings e busca vetorial

Quando a busca semântica realmente importa, você usa embeddings. Cada documento vira um vetor numérico. Documentos com significado similar ficam próximos no espaço vetorial.

```javascript
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

// Salvar no banco
await db.query(`
  INSERT INTO documents (content, embedding)
  VALUES ($1, $2)
`, [content, JSON.stringify(embedding)])

// Buscar similares (com pgvector no Postgres)
const similar = await db.query(`
  SELECT content, 1 - (embedding <=> $1) as similarity
  FROM documents
  ORDER BY embedding <=> $1
  LIMIT 5
`, [JSON.stringify(queryEmbedding)])
```

pgvector é uma extensão do Postgres. Você não precisa de um banco vetorial separado para começar.

## Gerenciando custos e latência

LLMs têm custo por token e latência de 1-5 segundos. Dois padrões essenciais:

**Cache de respostas para perguntas repetidas:**

```javascript
async function cachedChat(question: string): Promise<string> {
  const key = `llm:${createHash('md5').update(question).digest('hex')}`

  const cached = await redis.get(key)
  if (cached) return cached

  const response = await chat(question, systemPrompt)
  await redis.setex(key, 3600, response) // cache por 1h

  return response
}
```

**Processamento assíncrono para operações longas:**

Se o usuário não precisa da resposta imediatamente, coloque em fila. Resultado fica disponível via webhook ou polling.

## Abstração de providers

Hoje é OpenAI. Amanhã pode ser Anthropic, Gemini ou um modelo local. Vale abstrair desde o início:

```typescript
interface LLMProvider {
  chat(messages: Message[], options?: ChatOptions): Promise<string>
  embed(text: string): Promise<number[]>
}

class OpenAIProvider implements LLMProvider {
  async chat(messages: Message[]) { /* ... */ }
  async embed(text: string) { /* ... */ }
}

class AnthropicProvider implements LLMProvider {
  async chat(messages: Message[]) { /* ... */ }
  async embed(text: string) { /* ... */ }
}
```

Trocar de provider vira uma linha de configuração.

A integração de IA não exige reinventar sua arquitetura. Exige entender onde o LLM resolve um problema real e encaixá-lo como mais um serviço no que você já tem.
