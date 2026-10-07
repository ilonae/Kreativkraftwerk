# Artist submission Worker

A tiny Cloudflare Worker that receives artist profile submissions from
`public/artist-profile-form.html` and creates **Draft** entries in Contentful.

Drafts stay unpublished so you can review each submission in the Contentful
dashboard before it goes live on the site.

---

## One-time setup

### 1. Generate a Contentful CMA token

1. In Contentful, go to **Settings → API keys → Content management tokens**.
2. **Generate personal token** → name it e.g. `kkw-artist-submit`.
3. Copy the token (shown only once). Keep it secret — this is the key that
   lets the Worker write to your space.

### 2. Add the fields to Contentful (if not already)

The `artist` content type needs these fields, matching the shape the frontend
already expects:

| Field ID | Type              | Notes                              |
|----------|-------------------|------------------------------------|
| name     | Short Text        | Required                           |
| field    | Short Text        | Optional                           |
| contact  | Short Text        | Optional                           |
| bio      | Long Text         | Optional (plain, not Rich Text — the Worker writes plain strings) |
| photo    | Media             | Optional (uploaded by you later)   |
| gradient | Short Text        | Optional (fallback gradient class) |
| hashtags | Short Text, List  | Optional                           |
| socials  | Short Text, List  | Optional                           |

> If `bio` is a Rich Text field in your space, the Worker will fail with
> `contentful_error`. Convert it to Long Text, or extend the Worker to wrap
> the submitted string in Rich Text's required JSON document structure.

### 3. Create a Cloudflare account

Sign up at <https://dash.cloudflare.com/sign-up> (free). No credit card needed.

### 4. Install Wrangler + deploy

From inside this `functions/` directory:

```bash
npm install
npx wrangler login              # opens browser, one-time
```

Open `wrangler.toml` and fill in `CONTENTFUL_SPACE_ID`. (You can leave
`CONTENTFUL_ENVIRONMENT` as `master` and `CONTENTFUL_LOCALE` as `en-US`
unless your Contentful space uses different values.)

Then set the CMA token as a secret (never commit it):

```bash
npx wrangler secret put CONTENTFUL_CMA_TOKEN
# paste the token when prompted
```

Deploy:

```bash
npx wrangler deploy
```

Wrangler prints a URL like:

```
https://kkw-artist-submit.<your-subdomain>.workers.dev
```

### 5. Wire the form

Open `public/artist-profile-form.html` and set, near the top of the `<script>`:

```js
const SUBMIT_ENDPOINT = "https://kkw-artist-submit.<your-subdomain>.workers.dev";
```

Commit and deploy the site as usual. The form now shows a primary
**"Submit profile"** button that POSTs straight to the Worker. The old
mailto / copy / download buttons stay available as fallbacks.

### 6. Lock down CORS (recommended)

Once things work with `ALLOWED_ORIGIN="*"`, edit `wrangler.toml` to lock it
down to your actual site origin, then redeploy:

```toml
ALLOWED_ORIGIN = "https://ilonae.github.io"
```

```bash
npx wrangler deploy
```

---

## Local development

Copy `.dev.vars.example` to `.dev.vars` and paste your CMA token there (the
file is gitignored). Then:

```bash
npm run dev
```

Wrangler serves the Worker on `http://localhost:8787`. Point `SUBMIT_ENDPOINT`
at that during local testing, or test with curl:

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Artist","field":"Testing","hashtags":["test"]}'
```

A successful response looks like `{"ok":true,"id":"<entry-id>"}`.

---

## Logs & debugging

Tail live Worker logs:

```bash
npx wrangler tail
```

Common errors returned by the Worker:

| HTTP | `error`               | Meaning                                        |
|------|-----------------------|------------------------------------------------|
| 400  | `invalid_json`        | Body wasn't valid JSON                         |
| 422  | `name_required`       | `name` was missing or empty                    |
| 422  | `nothing_submitted`   | Only a name was sent (likely bot / mis-click)  |
| 500  | `server_not_configured` | Missing `CONTENTFUL_SPACE_ID` or CMA token   |
| 502  | `contentful_error`    | Contentful rejected the create (see `detail`)  |

---

## Optional hardening

- **Rate limiting / abuse protection**: add [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
  to the form and verify the token in the Worker.
- **Cost cap**: free tier is 100k requests/day. Set an alert in Cloudflare
  dashboard if you're worried about abuse.
- **Email notification**: have the Worker also fire a webhook to Slack /
  email when a new submission comes in.
