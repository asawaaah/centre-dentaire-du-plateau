# Product Requirement Document (PRD) - Centre dentaire plateau

## 1. Vision du Produit
Créer une expérience numérique haut de gamme pour le "Centre dentaire plateau". Le site doit transformer l'anxiété liée aux soins dentaires en une sensation de bien-être et de professionnalisme grâce à un design épuré et des performances instantanées.

## 2. Stack Technique
- **Framework :** Next.js (App Router).
- **Internationalisation :** i18n pour le support bilingue (Français/Anglais).
- **Langage :** TypeScript / React.
- **Style :** Tailwind CSS.
- **Hébergement :** Cloudflare Pages (via `@cloudflare/next-on-pages`).
- **Backend (Serverless) :** Next.js API Routes (Edge Runtime).
- **Emails :** Resend (via API).
- **Base de données :** Google Sheets (via API).

## 3. Fonctionnalités Clés
- **Multilingue :** Support complet en Français et Anglais via i18n.
- **Navigation Fluide :** Transitions douces entre Accueil, Équipe, Services et Contact.
- **SEO Ready :** Génération automatique de `sitemap.xml` et `robots.txt`. Optimisation des balises Meta et images WebP.
- **Formulaire de Rendez-vous :**
    - Validation côté client (React).
    - Envoi d'email à la clinique via Resend.
    - Email de confirmation automatique au patient.
    - Enregistrement des données dans un Google Sheets.

## 4. Contraintes de Performance
- Score Lighthouse SEO : > 95.
- LCP (Largest Contentful Paint) : < 1.5s.
- Zéro JavaScript inutile (optimisation via le chargement sélectif des composants).

## 5. Copywriting & SEO Multilingue
- Le contenu du site doit être rédigé et optimisé SEO dans les deux langues (Français et Anglais).
- Chaque traduction doit faire l'objet d'une optimisation sémantique propre (mots-clés locaux, expressions courantes) et ne pas être une simple traduction littérale.
- Une attention particulière doit être portée sur le copywriting de chaque page pour toujours refléter l'expérience de bien-être propre au Centre dentaire plateau.