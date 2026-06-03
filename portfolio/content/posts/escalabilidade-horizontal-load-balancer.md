---
title: "Escalabilidade horizontal sem drama: load balancer, stateless e containers"
description: "Como preparar sua API para multiplicar instâncias sem quebrar sessão, cache ou consistência de dados."
date: "2026-05-25"
category: "ESCALA"
keywords: ["escalabilidade horizontal", "load balancer", "stateless API", "Docker", "Nginx", "escalabilidade Node.js"]
published: true
---

Escalar verticalmente é fácil: pega um servidor maior. Funciona até um limite — e o limite chega mais rápido do que você imagina.

Escalar horizontalmente é o caminho real: múltiplas instâncias da mesma aplicação, distribuindo carga. Mas tem um pré-requisito que a maioria ignora até o momento errado.

## O inimigo da escala horizontal: estado local

Se sua aplicação guarda qualquer estado em memória — sessão, cache, upload em processamento — ela não está pronta para escalar horizontalmente.

Imagine duas instâncias do seu servidor. O usuário faz login na instância A. A sessão fica em memória na instância A. Próximo request cai na instância B. Usuário está "deslogado".

O princípio é simples: **sua aplicação precisa ser stateless.** Qualquer estado que precisa persistir entre requests vai para um serviço externo.

## O que externalizar

**Sessão → Redis**

```javascript
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'

const client = createClient({ url: process.env.REDIS_URL })
await client.connect()

app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
```

**Cache → Redis**

Qualquer coisa que você cacheava em `Map` ou variável global precisa ir para Redis. O benefício extra: o cache é compartilhado entre todas as instâncias.

**Arquivos em processamento → Object Storage**

Upload que precisa ser processado? Salva no S3 (ou MinIO se for self-hosted) e coloca o job em fila. Qualquer instância pode pegar o job e processar.

## Load balancer com Nginx

Com a aplicação stateless, o load balancer distribui requests entre instâncias. Nginx faz isso nativamente:

```nginx
upstream api {
  least_conn;
  server api_1:3000;
  server api_2:3000;
  server api_3:3000;
}

server {
  listen 80;

  location / {
    proxy_pass http://api;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

`least_conn` distribui para a instância com menos conexões ativas — melhor que round-robin para requests com tempo de resposta variável.

## Docker Compose para múltiplas instâncias

```yaml
services:
  api:
    build: .
    deploy:
      replicas: 3
    environment:
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://db:5432/app
    depends_on:
      - redis
      - db

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api

  db:
    image: postgres:16-alpine
    volumes:
      - pg_data:/var/lib/postgresql/data
```

Uma linha (`replicas: 3`) e você tem 3 instâncias da API. Nginx distribui a carga. Redis compartilha o estado.

## Health checks

Antes de subir uma instância nova, o load balancer precisa saber se ela está pronta:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})
```

```yaml
# No docker-compose
healthcheck:
  test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
  interval: 10s
  timeout: 5s
  retries: 3
  start_period: 10s
```

O Nginx só manda tráfego para instâncias que passaram no health check. Isso garante que uma instância que subiu mas ainda está inicializando não recebe requests.

## O resultado

Com essa estrutura, escalar é rodar um comando:

```bash
docker compose up --scale api=5
```

Cinco instâncias da API, load balancer distribuindo, estado compartilhado no Redis. Sem downtime, sem sessão perdida, sem dado inconsistente.

Essa é a diferença entre uma aplicação que aguenta crescer e uma que precisa ser reescrita quando o volume aumenta.
