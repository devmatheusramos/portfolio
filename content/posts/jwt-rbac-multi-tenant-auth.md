---
title: "JWT, sessão e RBAC: como construir auth que não vira pesadelo"
description: "Auth parece simples até você precisar de multi-tenant, roles por recurso e refresh token sem vazar. Um guia para acertar desde o início."
date: "2026-05-05"
category: "JWT & AUTH"
keywords: ["autenticação JWT", "RBAC Node.js", "multi-tenant auth", "refresh token", "autorização por roles", "segurança API"]
published: true
---

Auth parece simples. Login, senha, token. Mas quando o produto cresce, o que era simples vira um nó.

Multi-tenant aparece. Roles diferentes por organização. Permissões granulares por recurso. Token expira no meio de uma operação crítica. Esse guia é para você não chegar nesse ponto sem estar preparado.

## JWT: o básico que a maioria erra

JWT é stateless: toda informação necessária está no token. O servidor não precisa consultar banco para validar.

```typescript
import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: string
  clientId: string
  role: 'owner' | 'admin' | 'user'
  iat: number
  exp: number
}

function signToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
}

function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
}
```

**Erros comuns:**

1. **Token com expiração longa.** Se um token de 30 dias vazar, o atacante tem 30 dias. Use 15 minutos para access token.
2. **Payload com dados sensíveis.** JWT é codificado, não criptografado. Qualquer pessoa consegue decodificar o payload. Nunca coloque senha, dados de cartão ou informações confidenciais.
3. **Segredo fraco.** O JWT_SECRET precisa ser longo e aleatório: `openssl rand -hex 64`.

## Refresh Token: renovação sem re-login

Access token curto (15min) + refresh token longo (30 dias) salvo no banco:

```typescript
async function login(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new Error('Credenciais inválidas')
  }

  const accessToken = signToken({ userId: user.id, clientId: user.clientId, role: user.role })

  const refreshToken = randomBytes(64).toString('hex')
  await db.refreshTokens.create({
    token: await bcrypt.hash(refreshToken, 10),
    userId: user.id,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  return { accessToken, refreshToken }
}

async function refreshAccessToken(refreshToken: string) {
  const stored = await db.refreshTokens.findMany({ where: { userId: /* decode */ } })

  for (const record of stored) {
    if (await bcrypt.compare(refreshToken, record.token)) {
      if (record.expiresAt < new Date()) throw new Error('Refresh token expirado')

      // Rotacionar: invalida o atual, emite novo
      await db.refreshTokens.delete({ where: { id: record.id } })
      return login(/* reissue */)
    }
  }

  throw new Error('Refresh token inválido')
}
```

Rotacionar o refresh token a cada uso significa que um token roubado é detectado: quando o atacante usa, o token original invalida; quando o usuário legítimo tenta usar o original, já foi invalidado.

## Middleware de autenticação

```typescript
export async function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token não fornecido' })

  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
```

## RBAC: autorização por role

Role-Based Access Control define o que cada tipo de usuário pode fazer:

```typescript
type Role = 'owner' | 'admin' | 'user'

const permissions: Record<Role, string[]> = {
  owner: ['*'],
  admin: ['agents:read', 'agents:write', 'channels:read', 'channels:write', 'users:read'],
  user: ['agents:read', 'channels:read'],
}

function can(role: Role, action: string): boolean {
  const allowed = permissions[role]
  return allowed.includes('*') || allowed.includes(action)
}

export function authorize(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!can(req.user.role, action)) {
      return res.status(403).json({ error: 'Sem permissão' })
    }
    next()
  }
}

// Uso nas rotas
router.delete('/agents/:id', protect, authorize('agents:write'), deleteAgent)
```

## Multi-tenant: isolamento por clientId

Em sistemas multi-tenant, o `clientId` no token garante que cada usuário só acessa dados da sua organização:

```typescript
export async function getAgents(req: Request, res: Response) {
  // clientId vem do token, não da query string
  // usuário não pode manipular isso
  const agents = await db.agents.findMany({
    where: { clientId: req.user.clientId }
  })
  res.json(agents)
}
```

Nunca confie no `clientId` que vem na query string ou body. Sempre use o que está no token JWT, que foi assinado pelo servidor.

Esse padrão garante que mesmo que um usuário tente acessar dados de outro tenant modificando a requisição, o middleware vai usar o `clientId` do token — que é imutável sem o segredo do servidor.
