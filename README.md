# DoramaAI Bot

Bot do Telegram com videos D-ID lip-sync, voz humana (Microsoft Neural) e narracao em 14 idiomas para 5 doramas x 10 episodios (50 no total). Inclui gerador de personagens anime com IA e animacao D-ID.

## Run & Operate

- `npm run dev` — inicia o servidor + bot Telegram
- `npm run typecheck` — verifica tipos
- `npm run build` — compila tudo

## Stack

- Node.js 20+, TypeScript, ESM
- API: Express 5
- Bot: node-telegram-bot-api (polling)
- Video: D-ID API (lip-sync com voz Microsoft Neural)
- Vozes: 14 idiomas (PT-BR, EN, ES, KO, JA, FR, IT, DE, ZH, HI, etc.)
- Personagens: Gerador de personagens anime com IA

## Where things live

- `src/bot/bot.ts` — logica principal do bot Telegram
- `src/bot/catalog.ts` — 5 doramas x 10 episodios + textos Yuna
- `src/bot/did.ts` — integracao D-ID (lip-sync + voz Neural)
- `src/bot/character-generator.ts` — gerador de personagens anime com IA
- `src/bot/subscribers.ts` — gerenciamento de usuarios/VIP
- `src/bot/ads.ts` — sistema de propagandas rotativas
- `src/routes/health.ts` — health check endpoint
- `render.yaml` — configuracao deploy Render.com (gratis, 24h)

## Architecture decisions

- Bot roda como polling dentro do Express (sem webhook), funciona em qualquer host
- D-ID com voz Microsoft Neural (`pt-BR-ThalitaMultilingualNeural` padrao) — voz humana real
- Cada idioma tem sua propria voz Neural dedicada
- Video de boas-vindas com lip-sync da Yuna gerado a cada /start
- Gerador de personagens anime: `/personagem` gera um personagem aleatorio com video D-ID
- Galeria de personagens: `/galeria` lista todos os personagens disponiveis
- Subscribers salvos em JSON local

## Product

- 5 doramas x 10 episodios = 50 episodios totais
- Episodio 1 de cada dorama GRATIS com video D-ID completo
- VIP: todos os 50 episodios, zero propaganda
- Pagamento via PIX ou Toncoin
- 14 idiomas de narracao
- Gerador de personagens anime com animacao D-ID

## Secrets necessarios

- `TELEGRAM_BOT_TOKEN` — token do @BotFather
- `TELEGRAM_ADMIN_ID` — seu ID do Telegram
- `DID_API_KEY` — chave da API D-ID
- `PIX_KEY` — chave PIX (opcional, configurar com /setpix)
- `TONCOIN_ADDRESS` — endereco Toncoin (opcional, configurar com /settoncoin)

## Deploy 24h no Render.com (GRATIS)

1. Crie conta em https://render.com
2. New > Background Worker > conecte seu GitHub
3. Configure as variaveis de ambiente
4. Build: `npm install && npm run build`
5. Start: `node dist/index.mjs`
6. Clique Create Worker — roda 24h gratis!

## Comandos do Bot

### Usuarios
- `/start` — iniciar o bot e ver menu principal
- `/personagem` — gerar personagem anime com video D-ID
- `/galeria` — ver todos os personagens disponiveis

### Admin (no Telegram)
- `/setvip <id> true` — ativar VIP de um usuario
- `/setvip <id> false` — remover VIP
- `/broadcast <mensagem>` — enviar para todos
- `/setpix <chave>` — definir chave PIX
- `/settoncoin <endereco>` — definir endereco Toncoin
- `/stats` — estatisticas do bot
- `/adminhelp` — lista de comandos

## Gotchas

- D-ID demora ~30-90s para gerar cada video (normal)
- Render.com plano gratuito pode ter cold start de ~30s
- Sempre rodar build antes de reiniciar o servidor
