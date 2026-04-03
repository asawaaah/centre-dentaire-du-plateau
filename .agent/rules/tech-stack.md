---
trigger: always_on
---

# Règles de Développement & Cloudflare

## Next.js (Fullstack / Edge)
- Utilise le App Router.
- Ne pas forcer l'export statique strict (autoriser SSR, Middleware, Server Actions).
- Utilise le composant `<Image />` de Next.js. L'optimisation automatique doit être gérée si besoin.

## Cloudflare Pages (via @cloudflare/next-on-pages)
- Pour le formulaire de contact, utilise les routes de l'API de Next.js (`app/api/...`).
- Le backend tourne en Edge Runtime (`export const runtime = 'edge'`).
- Utilise des variables d'environnement (`process.env`) pour les clés API Resend et les IDs Google Sheets.

## Sécurité
- Ne jamais exposer les clés API (`RESEND_API_KEY`) dans le code client.
- Les appels API du formulaire doivent pointer vers le endpoint relatif `/api/submit`.