# moltron-frontend

> *Frontend Specialist with shadcn/ui - Creates distinctive, production-grade interfaces*

Skill criado com [Moltron](https://github.com/theredlobstercartel) para geração de interfaces frontend de alta qualidade.

## 🎨 Características

- **shadcn/ui**: Componentes baseados em Radix UI + Tailwind
- **6 Aesthetics Únicos**: Cyber-neon, Brutalist, Organic, Retro-future, Editorial, Minimal-luxury
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards automáticos
- **TypeScript**: Código tipado e seguro
- **Motion**: Framer Motion para animações suaves
- **Anti-AI Slop**: Design distintivo, não genérico

## 🚀 Instalação

```bash
git clone https://github.com/theredlobstercartel/moltron-frontend.git
cd moltron-frontend
npm install
npm run build
```

## 📖 Uso

### Inicializar Projeto

```bash
# Projeto cyber-neon dark
node dist/index.js init meu-app --aesthetic cyber-neon --dark

# Projeto brutalist light
node dist/index.js init meu-app --aesthetic brutalist --light

# Projeto organic
node dist/index.js init meu-app --aesthetic organic --dark
```

### Aesthetics Disponíveis

| Aesthetic | Descrição | Fonte Principal |
|-----------|-----------|-----------------|
| **cyber-neon** | Tech/gaming, neon colors | Geist |
| **brutalist** | Raw, strong contrasts | Space Grotesk |
| **organic** | Natural, earth tones | Instrument Serif |
| **retro-future** | 80s sci-fi, vaporwave | Orbitron |
| **editorial** | Magazine-style, elegant | Playfair Display |
| **minimal-luxury** | Refined, gold accents | Cormorant Garamond |

## 🎨 Design System

### Cores
Cada aesthetic tem seu próprio sistema de cores HSL:
- `--background`: Cor de fundo
- `--foreground`: Cor do texto
- `--primary`: Cor principal
- `--secondary`: Cor secundária
- `--accent`: Cor de destaque
- `--muted`: Cor sutil

### Tipografia
- **Sans-serif**: Display/body (varia por aesthetic)
- **Monospace**: Código/dados técnicos

### Animações
- Framer Motion para React
- CSS animations para HTML vanilla
- Transições suaves em hover
- Micro-interactions em botões

## 🛠️ Tech Stack (Latest Versions)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ | React framework (App Router) |
| React | 19+ | UI library |
| TypeScript | 5.5+ | Type safety |
| shadcn/ui | Latest | Component library |
| Tailwind CSS | 3.4+ | Styling |
| Framer Motion | 11+ | Animations |
| next-seo | Latest | SEO optimization |
| Lucide React | Latest | Icons |

## Requirements

- **Node.js**: 18.17+ (required for Next.js 15+)
- **npm**: 9+ or **pnpm**: 8+

## 📦 Componentes shadcn Incluídos

- button
- card
- input
- badge
- separator
- scroll-area
- tooltip
- dialog

## 🌐 SEO

Meta tags geradas automaticamente:
- Title e Description
- Open Graph (Facebook)
- Twitter Cards
- Viewport
- Robots

## Exemplo

```bash
# Criar app de dashboard cyberpunk
node dist/index.js init cyber-dashboard --aesthetic cyber-neon --dark
cd cyber-dashboard/my-app
npm run dev
```

## 🦞 The Red Lobster Cartel

Parte da fábrica de software pessoal.

- **Org**: https://github.com/theredlobstercartel
