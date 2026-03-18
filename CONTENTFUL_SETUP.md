# Contentful Content Model Setup

This document describes how to configure the two content types in your Contentful space.

**Architecture note:** There is one unified `project` content type for everything on the Projects page. Setting `featured: true` on an entry makes it the hero — it gets the full detail view (framework, sections, concept text). All other projects render as cards. Artists are managed separately via the `artist` content type.

---

## 1. Create a Contentful Space

1. Go to [app.contentful.com](https://app.contentful.com) and create a free account.
2. Create a new **Space** (free tier supports 1 space, 25 content types, 5000 records).
3. Go to **Settings → API keys** and create a new API key.
4. Copy **Space ID** and **Content Delivery API access token** into your `.env` file:

```
VITE_CONTENTFUL_SPACE_ID=xxxxxxxxxxxx
VITE_CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

---

## 2. Content Type: `artist`

**Content type ID:** `artist`


| Field name | Type       | Required | Notes                                                       |
| ---------- | ---------- | -------- | ----------------------------------------------------------- |
| `name`     | Short text | ✅       | Full name                                                   |
| `field`    | Short text | ✅       | e.g.`Architecture & Spatial Design`                         |
| `contact`  | Short text | ✅       | Email address                                               |
| `bio`      | Long text  |          | Short biography                                             |
| `photo`    | Media      |          | Portrait photo                                              |
| `gradient` | Short text |          | Tailwind fallback gradient, e.g.`from-gray-400 to-gray-300` |

---

## 3. Content Type: `project`

**Content type ID:** `project`

One content type covers both the hero and the cards. Set `featured: true` on exactly one entry — that becomes the large hero with full detail. All others render as cards below.

### Card fields — required for every project


| Field name      | Type       | Required | Notes                                                     |
| --------------- | ---------- | -------- | --------------------------------------------------------- |
| `title`         | Short text | ✅       |                                                           |
| `subtitle`      | Short text |          | Italic tagline shown under the title                      |
| `categoryEn`    | Short text | ✅       | e.g.`Urban Dialogue Series`                               |
| `categoryDe`    | Short text | ✅       | e.g.`Urbane Dialogreihe`                                  |
| `descriptionEn` | Long text  | ✅       | Plain or Rich Text — both work                           |
| `descriptionDe` | Long text  | ✅       | Plain or Rich Text — both work                           |
| `year`          | Short text | ✅       | e.g.`2025 – Ongoing`                                     |
| `status`        | Short text | ✅       | One of:`ongoing`, `upcoming`, `completed`                 |
| `gradient`      | Short text | ✅       | Tailwind classes e.g.`from-red-900 via-zinc-900 to-black` |
| `image`         | Media      |          | Shown instead of gradient if present                      |
| `featured`      | Boolean    |          | **true** = hero card with full detail view                |

### Rich detail fields — featured project only


| Field name          | Type        | Notes                                                                                                                                     |
| ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `dates`             | Short text  | e.g.`19. – 24. September 2024`                                                                                                           |
| `venue`             | Short text  | e.g.`Stadtwerkstatt Friedrichshain-Kreuzberg`                                                                                             |
| `city`              | Short text  | e.g.`Berlin`                                                                                                                              |
| `partner`           | Short text  | e.g.`Zusammenstelle`                                                                                                                      |
| `visitors`          | Short text  | e.g.`900+`                                                                                                                                |
| `duration`          | Short text  | e.g.`5 Tage / 5 Days`                                                                                                                     |
| `conceptDe`         | Long text   | German concept paragraph                                                                                                                  |
| `conceptEn`         | Long text   | English concept paragraph                                                                                                                 |
| `triggerDe`         | Long text   | German motivation/trigger paragraph                                                                                                       |
| `triggerEn`         | Long text   | English motivation/trigger paragraph                                                                                                      |
| `framework`         | JSON object | `[{ "term": "Inside", "de": "...", "en": "..." }]`                                                                                        |
| `insideOutsideBody` | JSON object | `{ "de": ["para 1", "para 2"], "en": ["para 1", "para 2"] }`                                                                              |
| `sections`          | JSON object | `[{ "name": "Kontinuitäten", "nameEN": "Continuities", "description": "...", "descriptionEN": "...", "artists": ["Name 1", "Name 2"] }]` |

### Example: Spit on H*tler's Grave (featured)

```
title:        Spit on H*tler's Grave
subtitle:     inside threating history — outside totalarity — besides democracy
categoryEn:   Exhibition
categoryDe:   Ausstellung
descriptionEn: An interdisciplinary group exhibition critically engaging with memory
               culture, resistance, and the continuity of right-wing ideologies.
descriptionDe: Eine interdisziplinäre Gruppenausstellung, die sich kritisch mit
               Erinnerungskultur, Widerstand und der Kontinuität rechter Ideologien
               auseinandersetzt.
year:         2024
status:       completed
gradient:     from-red-900 via-zinc-900 to-black
featured:     true
dates:        19. – 24. September 2024
venue:        Stadtwerkstatt Friedrichshain-Kreuzberg
city:         Berlin
partner:      Zusammenstelle
visitors:     900+
duration:     5 Tage / 5 Days
conceptEn:    (full concept paragraph)
conceptDe:    (full concept paragraph in German)
triggerEn:    (trigger paragraph)
triggerDe:    (trigger paragraph in German)
framework:    [{"term":"Inside","de":"der Gefühlslage des Individuums","en":"the emotional state of the individual"},
               {"term":"Outside","de":"im Rechtsdruck von Politik und der Gesellschaft","en":"the political pressure of society and the state"},
               {"term":"Besides","de":"ein Gefühl der Ohnmächtigkeit","en":"a feeling of powerlessness"}]
insideOutsideBody: {"de":["Inside der Gefühlslage...","Inside eines Bezirks..."],"en":["Inside the emotional state...","Inside a district..."]}
sections:     [{"name":"Kontinuitäten","nameEN":"Continuities","description":"...","descriptionEN":"...","artists":["Isaac Waldvogel","Johannes Weilandt"]},
               {"name":"Reaktionen","nameEN":"Reactions","description":"...","descriptionEN":"...","artists":["Elena Rabinka","Monika Mausolf"]},
               {"name":"Aktionen","nameEN":"Actions","description":"...","descriptionEN":"...","artists":["Ilona Eisenbraun","Sophie Linde"]}]
```

---

## 4. Deploying to IONOS

After running `npm run build`, a `dist/` folder is created. Upload its contents to your IONOS webspace via FTP or the IONOS File Manager.

For clean URL routing (so `/projects` doesn't 404 on reload), add a `.htaccess` file to the root of your IONOS space:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

---

## 5. Local development

```bash
# Install dependencies
npm install

# Copy and fill in your credentials
cp .env.example .env

# Start dev server at http://localhost:3000
npm run dev

# Production build → dist/
npm run build
```
