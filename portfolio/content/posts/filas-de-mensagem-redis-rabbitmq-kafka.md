---
title: "Filas de mensagem na prática: Redis, RabbitMQ ou Kafka?"
description: "Cada uma serve um propósito. Escolher errado custa caro. Um guia direto para decidir sem virar refém de hype."
date: "2026-05-18"
category: "FILAS & ASYNC"
keywords: ["message queue", "Redis pub/sub", "processamento assíncrono", "RabbitMQ", "Kafka", "filas de mensagem Node.js"]
published: true
---

A primeira vez que você descobre filas de mensagem, quer colocar em tudo. É normal. Mas escolher a ferramenta errada resolve um problema e cria três.

## Por que usar fila em primeiro lugar

Processamento síncrono tem um limite: o usuário espera. Fila quebra esse vínculo.

Exemplos onde fila faz sentido:
- Envio de email após cadastro — não precisa bloquear o response
- Processamento de imagem após upload — pode levar segundos ou minutos
- Notificações em massa — não deve competir com requests de usuário
- Integração com sistema lento — o sistema externo responde em 3s, você não quer que o usuário espere

A regra simples: **se a operação pode acontecer depois, coloque em fila.**

## Redis: simples e já está instalado

Redis tem pub/sub e listas que funcionam como fila. Se você já usa Redis para cache, a tentação de usar pra fila é grande — e muitas vezes é a decisão certa.

```javascript
// Producer
await redis.lpush('email:queue', JSON.stringify({ to, subject, body }))

// Consumer
while (true) {
  const job = await redis.brpop('email:queue', 0)
  await sendEmail(JSON.parse(job[1]))
}
```

**Quando usar Redis como fila:**
- Volume baixo a médio (até ~10k msgs/s)
- Você já tem Redis no stack
- Não precisa de roteamento complexo
- Tolerância a perda de mensagem em caso de crash é aceitável (Redis sem persistência)

**Limitação importante:** Redis não tem redelivery automático. Se o consumer crashar no meio do processamento, a mensagem some. Para resolver isso, use `BRPOPLPUSH` ou migre para Redis Streams.

## RabbitMQ: quando você precisa de controle

RabbitMQ é um broker completo. Tem acknowledgment, dead letter queue, roteamento por exchange, prioridade de mensagens.

```javascript
// Producer
channel.publish('orders', 'order.created', Buffer.from(JSON.stringify(order)), {
  persistent: true,
  contentType: 'application/json'
})

// Consumer com ack manual
channel.consume('orders.process', async (msg) => {
  try {
    await processOrder(JSON.parse(msg.content.toString()))
    channel.ack(msg)
  } catch (err) {
    channel.nack(msg, false, true) // requeue
  }
})
```

**Quando usar RabbitMQ:**
- Você precisa garantir que a mensagem seja processada ao menos uma vez
- Precisa rotear mensagens para diferentes consumers baseado em tipo
- Dead letter queue para mensagens que falharam N vezes
- Volume médio a alto com processamento complexo

## Kafka: quando o volume é sério

Kafka não é uma fila. É um log distribuído. Mensagens ficam armazenadas por tempo configurável. Múltiplos consumers podem ler a mesma mensagem independentemente.

Kafka faz sentido quando:
- Volume é alto (centenas de milhares de eventos por segundo)
- Você precisa de replay — reprocessar eventos do passado
- Múltiplos sistemas consomem o mesmo stream de eventos
- Event sourcing como padrão de persistência

**Kafka é complexo de operar.** Precisa de Zookeeper (ou KRaft no Kafka 3+), particionamento bem pensado, consumer groups configurados. Para a maioria dos casos, é over-engineering.

## A decisão prática

| Situação | Escolha |
|---|---|
| Já tenho Redis, volume baixo | Redis Lists ou Streams |
| Preciso de garantia de entrega | RabbitMQ |
| Múltiplos consumers, replay, alto volume | Kafka |
| Não sei ainda | RabbitMQ |

Comece com RabbitMQ se você não sabe o volume futuro. É simples de operar, tem todas as garantias que você precisa, e escala bem até volumes que a maioria dos produtos nunca vai atingir.

Migrar de RabbitMQ pra Kafka quando o volume exigir é um trabalho de dias. Manter Kafka desde o início quando você não precisava é um custo permanente.
