# KreativKraftwerk

An interdisciplinary arts collective based in Berlin. This is the official website showcasing our projects, members, approach, and collective network.

## Overview

KreativKraftwerk brings together artists, architects, designers, and researchers to create exhibitions, workshops, and cultural initiatives that critically engage with contemporary art, history, and society.

## Features

- **Projects**: Featured exhibitions and ongoing projects with detailed exhibition information
- **Collective Network**: Meet our artists and collaborators across disciplines
- **Approach**: Our conceptual framework and working principles
- **About**: Milestones and the history of KreativKraftwerk
- **Contact**: Get in touch with the collective

## Tech Stack

- **Frontend**: React 19 + Vite 5 + TypeScript 5
- **Styling**: Tailwind CSS
- **CMS**: Contentful Delivery API
- **Deployment**: GitHub Pages
- **Language Support**: German & English (DE/EN toggle)

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/ilonae/Kreativkraftwerk.git
cd Kreativkraftwerk
npm install
```

### Development

```bash
npm run dev
```

Starts the dev server at `http://localhost:3000`.

### Build

```bash
npm run build
```

Compiles TypeScript and bundles with Vite into the `dist/` directory.

## Environment Variables

To connect to Contentful, create a `.env` file in the root:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
```

Get these from your Contentful workspace under **Settings → API Keys**.

## Contentful Setup

The site pulls content from three Contentful content types:

- **Project**: Exhibitions and projects with rich detail fields (concept, framework, sections, etc.)
- **Artist**: Collective members with bios and contact information
- **Milestone**: Timeline events marking the collective's history

All Rich Text fields are automatically flattened to plain strings via the `richTextToPlain()` helper in each hook.

## Deployment

The site deploys automatically to GitHub Pages when you push to the `dev` branch. GitHub Actions handles the build, pulls Contentful credentials from repository secrets, and deploys the `dist/` folder.

**GitHub Pages Source**: Set to **"GitHub Actions"** in your repo settings.

**Required Secrets**:
- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_ACCESS_TOKEN`

Live site: [https://ilonae.github.io/Kreativkraftwerk/](https://ilonae.github.io/Kreativkraftwerk/)

## Project Structure

```
src/
├── components/        # React components (NavBar, ProjectCard, ProjectDetail, etc.)
├── pages/            # Page components (Projects, About, Approach, etc.)
├── hooks/            # Custom React hooks (useProjects, useArtists, useMilestones)
├── context/          # Language context for DE/EN toggle
├── lib/              # Contentful client setup
├── data/             # Types and local fallback data
├── i18n/             # German and English translations
├── App.tsx           # Main app with tab-based routing
├── index.css         # Global styles
└── main.tsx          # Entry point
```

## Key Components

- **ProjectDetail**: Full exhibition view with framework, sections, artists, and concept
- **Projects**: Featured hero + project cards grouped by status (ongoing, upcoming, completed)
- **About**: Milestone timeline
- **Approach**: Principles and conceptual framework
- **NavBar**: Navigation with language toggle

## Styling

Tailwind CSS with a custom color palette:
- `kkw-pink`: `#E8006F`
- `kkw-black`: `#0a0a0a`
- `kkw-gray`: `#f4f4f4`

Dynamic gradients from Contentful are forced into the build via `tailwind.config.cjs` safelist.

## Development Notes

- Tab-based routing (no React Router)
- Contentful Rich Text fields are flattened in hooks, not in components
- All ID fields are strings (from Contentful)
- Images and gradients come from Contentful; fallbacks use Tailwind utilities
- Posts to `dev` branch trigger automatic deployment

## License

© 2025 KreativKraftwerk. All rights reserved.

## Contact

For inquiries, reach out via the website contact form or visit [kreativkraftwerk.de](https://kreativkraftwerk.de)
