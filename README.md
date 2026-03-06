# 🕰️ TimeTravel — Agence de Voyages dans le Temps

> Site vitrine d'une agence de voyages temporels fictive, avec chatbot IA intégré.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.2-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-pink?logo=framer)

---

## ✨ Fonctionnalités

- 🎬 **Hero animé** — Vidéo de fond plein écran + particules canvas flottantes
- 🏛️ **Galerie de destinations** — 3 époques avec effets de survol et notes
- 📋 **Formulaire de réservation** — Avec validation Zod
- ❓ **FAQ interactive** — Accordéon animé
- 🤖 **Chatbot IA** — Propulsé par Groq + LLaMA 3.3 70B *(ou mode FAQ si pas de clé API)*
- 🌙 **Thème sombre/clair** — Basculement automatique
- 📱 **Responsive** — Mobile-first design

---

## 🗺️ Destinations proposées

| Destination | Époque | Durée | Prix |
|---|---|---|---|
| 🏺 Égypte Ancienne | 2500 av. J.-C. | 7 jours | 12 500 € |
| ⚔️ Europe Médiévale | 1200 ap. J.-C. | 5 jours | 9 800 € |
| 🎨 Renaissance Italienne | 1500 ap. J.-C. | 6 jours | 11 200 € |

---

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework React (App Router) |
| [TypeScript 5.7](https://www.typescriptlang.org/) | Typage statique |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styles utilitaires |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Radix UI](https://www.radix-ui.com/) | Composants accessibles |
| [Groq API](https://console.groq.com/) | LLM ultra-rapide pour le chatbot |
| [Zod](https://zod.dev/) | Validation des formulaires |
| [Lucide React](https://lucide.dev/) | Icônes |

---

## 🚀 Démarrage rapide

### Prérequis

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/Angele-dhs/timetravel.git
cd timetravel

# Installer les dépendances
npm install
```

### Configuration

Copiez le fichier d'exemple et configurez vos variables d'environnement :

```bash
cp .env.example .env.local
```

Éditez `.env.local` :

```env
# Optionnel — gratuit sur https://console.groq.com
# Sans clé : le chatbot fonctionne en mode FAQ
GROQ_API_KEY=gsk_votre_cle_api_ici
```

### Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🤖 Chatbot IA

Le chatbot fonctionne dans **deux modes** :

| Mode | Condition | Comportement |
|---|---|---|
| 🧠 **Mode IA** | Clé `GROQ_API_KEY` configurée | Réponses naturelles via LLaMA 3.3 70B |
| 📋 **Mode FAQ** | Pas de clé API | Réponses prédéfinies par mots-clés |

### Activer le mode IA (gratuit)

1. Créez un compte sur [console.groq.com](https://console.groq.com)
2. Générez une clé API (**API Keys** → **Create API Key**)
3. Collez la clé dans `.env.local` :
   ```env
   GROQ_API_KEY=gsk_xxxxxxxxxxxx
   ```
4. Redémarrez le serveur : `npm run dev`

> **Quota gratuit Groq** : ~14 400 requêtes/jour avec LLaMA 3.3 70B — largement suffisant pour un site vitrine.

### Alternatives d'API compatibles

Le chatbot utilise le format OpenAI standard, il est facilement adaptable :

| Fournisseur | Variable | Modèle suggéré |
|---|---|---|
| **Groq** ✅ | `GROQ_API_KEY` | `llama-3.3-70b-versatile` |
| **Mistral AI** | `MISTRAL_API_KEY` | `mistral-small-latest` |
| **OpenRouter** | `OPENROUTER_API_KEY` | `meta-llama/llama-3.3-70b` |

---

## 📁 Structure du projet

```
TimeTravel/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Route API chatbot (Groq)
│   ├── destinations/
│   │   └── [slug]/             # Pages de destination dynamiques
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # Composants Radix UI
│   ├── chatbot.tsx             # Chatbot IA
│   ├── hero-section.tsx        # Bannière hero avec vidéo + particules
│   ├── destinations-gallery.tsx # Galerie des 3 destinations
│   ├── booking-form.tsx        # Formulaire de réservation
│   ├── faq-section.tsx         # FAQ accordéon
│   ├── navigation.tsx          # Navbar
│   ├── footer.tsx
│   └── motion.tsx              # Wrappers Framer Motion
├── .env.local                  # Variables d'environnement (non versionné)
├── .env.example                # Exemple de configuration
└── next.config.mjs
```

---

## 🚢 Déploiement

### Vercel *(recommandé)*

La solution la plus simple — compatible 100% avec les API routes Next.js.

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Ou connectez directement votre dépôt GitHub sur [vercel.com](https://vercel.com).

> **Important** : Pensez à ajouter `GROQ_API_KEY` dans les variables d'environnement Vercel :
> Dashboard → Projet → Settings → Environment Variables

### Autres plateformes supportées

- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Render](https://render.com)

> ⚠️ **GitHub Pages** n'est pas compatible avec ce projet car il ne supporte pas les routes API Next.js (serveur Node.js requis).

---

## 📜 Scripts disponibles

```bash
npm run dev      # Serveur de développement (http://localhost:3000)
npm run build    # Build de production
npm run start    # Démarrer en mode production
npm run lint     # Vérification du code
```

---

## 📄 Licence

Ce projet est un projet éducatif fictif. Libre d'utilisation et de modification.

---

<p align="center">
  Fait avec ❤️ et beaucoup de voyages dans le temps 🕰️
</p>
