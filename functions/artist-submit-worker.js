/**
 * KreativKraftwerk — artist profile submission Worker.
 *
 * Receives JSON POST from public/artist-profile-form.html, validates it,
 * and creates a Draft `artist` entry via Contentful's Content Management API.
 * Drafts stay unpublished so the admin reviews them in Contentful before
 * they appear on the live site.
 *
 * Secrets (wrangler secret put <NAME> or Cloudflare dashboard):
 *   CONTENTFUL_CMA_TOKEN   Personal access token with content write access.
 *
 * Vars (wrangler.toml or dashboard):
 *   CONTENTFUL_SPACE_ID    Space id.
 *   CONTENTFUL_ENVIRONMENT Defaults to "master".
 *   CONTENTFUL_LOCALE      Defaults to "en-US".
 *   ALLOWED_ORIGIN         CORS origin, e.g. https://ilonae.github.io.
 *                          Use "*" during development. Lock in production.
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return json({ error: "method_not_allowed" }, 405, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, corsHeaders);
    }

    // ─── Validate + normalise ───
    const name = str(body.name, 200);
    if (!name) return json({ error: "name_required" }, 422, corsHeaders);

    const field    = str(body.field, 200);
    const contact  = str(body.contact, 200);
    const bio      = str(body.bio, 4000);

    const hashtags = Array.isArray(body.hashtags)
      ? body.hashtags
          .map(x => (typeof x === "string" ? x.trim().replace(/^#/, "").slice(0, 60) : ""))
          .filter(Boolean)
          .slice(0, 20)
      : [];

    const socials = Array.isArray(body.socials)
      ? body.socials
          .map(x => (typeof x === "string" ? x.trim().slice(0, 300) : ""))
          .filter(x => /^https?:\/\//i.test(x))
          .slice(0, 20)
      : [];

    // Reject spam-ish empty payloads (name but literally nothing else)
    if (!field && !contact && !bio && !hashtags.length && !socials.length) {
      return json({ error: "nothing_submitted" }, 422, corsHeaders);
    }

    // ─── Build Contentful fields payload ───
    const locale = env.CONTENTFUL_LOCALE || "en-US";
    const fields = { name: { [locale]: name } };
    if (field)           fields.field    = { [locale]: field };
    if (contact)         fields.contact  = { [locale]: contact };
    if (bio)             fields.bio      = { [locale]: bio };
    if (hashtags.length) fields.hashtags = { [locale]: hashtags };
    if (socials.length)  fields.socials  = { [locale]: socials };

    // ─── Create the Draft entry via CMA ───
    const spaceId     = env.CONTENTFUL_SPACE_ID;
    const environment = env.CONTENTFUL_ENVIRONMENT || "master";
    const missing = [];
    if (!spaceId) missing.push("CONTENTFUL_SPACE_ID");
    if (!env.CONTENTFUL_CMA_TOKEN) missing.push("CONTENTFUL_CMA_TOKEN");
    if (missing.length) {
      return json({ error: "server_not_configured", missing }, 500, corsHeaders);
    }

    const url = `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CONTENTFUL_CMA_TOKEN}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
        "X-Contentful-Content-Type": "artist",
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json(
        { error: "contentful_error", status: res.status, detail: detail.slice(0, 500) },
        502,
        corsHeaders,
      );
    }

    const entry = await res.json();
    return json({ ok: true, id: entry.sys?.id }, 200, corsHeaders);
  },
};

// ─── helpers ───
function str(value, maxLen) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}
