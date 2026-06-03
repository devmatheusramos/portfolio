---
title: "ADR: como documentar decisões de arquitetura para não repetir os mesmos erros"
description: "Architecture Decision Records é a prática que separa times sênior dos que ficam discutindo a mesma decisão a cada 6 meses."
date: "2026-04-28"
category: "DECISÃO TÉCNICA"
keywords: ["architecture decision record", "documentação técnica", "engenharia de software", "ADR template", "decisões de arquitetura"]
published: true
---

Seis meses depois de uma decisão técnica importante, você e seu time vão discutir ela de novo. Alguém vai propor mudar. Alguém vai defender o status quo. E ninguém vai lembrar exatamente por que a decisão original foi tomada.

ADR (Architecture Decision Record) resolve isso. É simples, leve, e faz uma diferença enorme na maturidade do time.

## O que é um ADR

Um ADR é um documento curto que registra:

1. **O contexto** — qual era o cenário e o problema
2. **A decisão** — o que foi escolhido
3. **As alternativas consideradas** — o que foi descartado e por quê
4. **As consequências** — o que essa decisão implica, positivo e negativo

Não é documentação de código. É documentação de raciocínio.

## O template

```markdown
# ADR-001: Uso de JWT para autenticação stateless

**Status:** Aceito
**Data:** 2026-03-15
**Autores:** Matheus Ramos

## Contexto

O sistema precisa de autenticação para uma API que será acessada por
múltiplos clientes (web, mobile). O volume esperado é 10k usuários ativos.
Estamos usando 2 instâncias do servidor com planos de escalar horizontalmente.

## Decisão

Usar JWT (JSON Web Tokens) com access token de 15 minutos e refresh
token persistido no banco com expiração de 30 dias.

## Alternativas consideradas

**Sessão com Redis:** Mais fácil de invalidar imediatamente, mas adiciona
dependência de Redis para cada request. Descartado porque aumenta latência
e complexidade operacional sem benefício proporcional nesse volume.

**OAuth2 com provider externo (Auth0, Clerk):** Reduz código proprietário,
mas adiciona dependência de terceiro e custo por usuário ativo.
Descartado para MVP, revisitar quando atingir 50k usuários.

## Consequências

**Positivo:**
- Stateless: qualquer instância valida o token sem consultar banco
- Fácil de implementar e entender
- Sem latência extra por request autenticado

**Negativo:**
- Invalidação imediata é difícil: um token vazado é válido até expirar (15min)
- Refresh token no banco adiciona uma query a cada renovação
- Gestão de rotação de segredo precisa de atenção

## Revisão

Revisitar se o produto atingir necessidade de invalidação imediata
(ex: banimento de usuário deve ter efeito instantâneo).
```

## Como organizar no repositório

```
docs/
  adr/
    ADR-001-jwt-autenticacao.md
    ADR-002-mongodb-como-banco-principal.md
    ADR-003-redis-para-cache-e-filas.md
    ADR-004-docker-compose-para-dev.md
    README.md  ← índice de todos os ADRs
```

O `README.md` da pasta é um índice:

```markdown
# Architecture Decision Records

| ID | Título | Status | Data |
|---|---|---|---|
| ADR-001 | JWT para autenticação | Aceito | 2026-03-15 |
| ADR-002 | MongoDB como banco principal | Aceito | 2026-03-20 |
| ADR-003 | Redis para cache e filas | Aceito | 2026-04-01 |
| ADR-004 | Migrar de MongoDB para Postgres | Proposto | 2026-06-01 |
```

## Status possíveis

- **Proposto:** em discussão, não implementado
- **Aceito:** aprovado e implementado
- **Depreciado:** foi aceito mas não é mais a abordagem atual
- **Substituído por ADR-XXX:** foi trocado por uma decisão posterior

Quando uma decisão muda, você não edita o ADR antigo. Você cria um novo ADR que referencia o anterior e explica o que mudou e por quê. O histórico fica intacto.

## Por que isso importa na prática

**Para o time:** quando alguém novo entra, pode ler os ADRs e entender não só o que o sistema faz mas *por que* foi construído dessa forma. O onboarding muda completamente.

**Para as discussões técnicas:** "deveríamos usar Kafka?" vira "temos ADR-003 que explica por que escolhemos RabbitMQ. Os critérios ainda se aplicam? Se não, vamos escrever ADR-010 propondo a mudança."

**Para você mesmo:** daqui 1 ano, você vai agradecer ao você do passado que documentou por que tomou aquela decisão que parecia óbvia na época.

A barreira de entrada é zero: um arquivo markdown no repositório. O retorno é imenso.
