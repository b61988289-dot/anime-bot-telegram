# DoramaAI Bot — 100% Gerado por IA

Bot do Telegram com personagens anime sensuais gerados por IA, vídeos D-ID lip-sync com movimentos faciais, e voz Neural humana sedutora em 14 idiomas. 5 doramas × 10 episódios = 50 no total.

## Tecnologia IA

- **Imagens**: Pollinations AI (modelo Flux) — personagens anime ecchi únicos
- **Vídeos**: D-ID API — lip-sync com movimentos faciais animados
- **Voz**: Microsoft Neural Voice — voz humana sedutora (14 idiomas)

## Stack

- Node.js 20+, TypeScript, esbuild
- API: Express 5
- Bot: node-telegram-bot-api (polling)
- Vídeo: D-ID API (lip-sync + voz Microsoft Neural)
- Imagens: Pollinations AI + Flux model
- Vozes: 14 idiomas neurais

## Funcionalidades

- 🎬 **Catálogo** — 5 doramas sensuais com 10 episódios cada
- 🎭 **Vídeos D-ID** — Animação facial lip-sync em tempo real
- 🖼️ **Imagens IA** — Personagens anime sensuais gerados por Pollinations
- 🗣️ **14 Idiomas** — Voz Neural Microsoft em cada idioma
- 🌸 **Yuna** — Narradora anime sensual 100% IA
- ❤️ **Favoritos** — Salve seus doramas favoritos
- ⭐ **Avaliação** — Avalie episódios de 1-5 estrelas
- 📜 **Histórico** — Acompanhe o que já assistiu
- 🎲 **Aleatório** — Episódio surpresa
- 🔍 **Busca** — Encontre doramas por nome
- 🎨 **Galeria IA** — Veja as artes geradas por IA
- 👑 **VIP** — HD, sem propaganda, 50 episódios
- 📢 **Propagandas** — Sistema de ads rotativo para não-VIP
- 💰 **Pagamento** — PIX e Toncoin

## Instalação

```bash
npm install
npm run build
```

## Variáveis de Ambiente

```env
TELEGRAM_BOT_TOKEN=seu_token_do_botfather
TELEGRAM_ADMIN_ID=seu_id_telegram
DID_API_KEY=sua_chave_did
PIX_KEY=opcional
TONCOIN_ADDRESS=opcional
PORT=3000
```

## Executar

```bash
npm run build && npm run start
```

## Deploy 24h no Render.com (GRÁTIS)

1. Crie conta em https://render.com
2. New > Background Worker > conecte seu GitHub
3. Configure as variáveis de ambiente
4. Build: `npm install && npm run build`
5. Start: `node dist/index.mjs`
6. Clique Create Worker — roda 24h grátis!

## Comandos do Bot

### Usuário
- `/start` — Iniciar com vídeo de boas-vindas da Yuna
- `/menu` — Menu principal com todos os botões

### Admin (no Telegram)
- `/setvip <id> true|false` — Ativar/remover VIP
- `/broadcast <mensagem>` — Enviar para todos
- `/setpix <chave>` — Definir chave PIX
- `/settoncoin <endereço>` — Definir endereço Toncoin
- `/stats` — Estatísticas do bot
- `/adminhelp` — Lista de comandos
