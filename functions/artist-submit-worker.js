/**
 * KreativKraftwerk — artist profile submission Worker.
 *
 * Receives submissions from public/artist-profile-form.html, validates them,
 * and creates a Draft `artist` entry via Contentful's Content Management API.
 *
 * Two supported content types on the inbound request:
 *   application/json             — text-only submission, existing behaviour
 *   multipart/form-data          — same fields plus an optional "photo" file
 *
 * When a photo is included, it's uploaded as a Contentful Asset first, then
 * linked to the artist entry via the `photo` field. Both the Asset and the
 * Entry stay as Drafts — admin reviews + publishes both in the Contentful UI.
 *
 * Secrets (wrangler secret put <NAME> or Cloudflare dashboard):
 *   CONTENTFUL_CMA_TOKEN   Personal access token with content write access.
 *
 * Vars (wrangler.toml or dashboard):
 *   CONTENTFUL_SPACE_ID    Space id.
 *   CONTENTFUL_ENVIRONMENT Defaults to "master".
 *   CONTENTFUL_LOCALE      Defaults to "en-US".
 *   ALLOWED_ORIGIN         CORS origin, e.g. https://kreativkraftwerk.com.
 */

const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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

    // ─── Parse body (json or multipart) ───
    const contentType = (request.headers.get("content-type") || "").toLowerCase();
    let parsed;
    try {
      parsed = contentType.startsWith("multipart/form-data")
        ? await parseMultipart(request)
        : await parseJson(request);
    } catch (e) {
      return json({ error: e.code || "invalid_body", detail: e.message }, 400, corsHeaders);
    }

    // ─── Validate + normalise text fields ───
    const name = str(parsed.name, 200);
    if (!name) return json({ error: "name_required" }, 422, corsHeaders);

    const field    = str(parsed.field, 200);
    const contact  = str(parsed.contact, 200);
    const bio      = str(parsed.bio, 4000);
    const hashtags = cleanList(parsed.hashtags, 60, 20, s => s.replace(/^#/, ""));
    const socials  = cleanList(parsed.socials, 300, 20, s => s, s => /^https?:\/\//i.test(s));

    if (!field && !contact && !bio && !hashtags.length && !socials.length && !parsed.photo) {
      return json({ error: "nothing_submitted" }, 422, corsHeaders);
    }

    // ─── Env check ───
    const spaceId     = env.CONTENTFUL_SPACE_ID;
    const environment = env.CONTENTFUL_ENVIRONMENT || "master";
    const locale      = env.CONTENTFUL_LOCALE || "en-US";
    const missing = [];
    if (!spaceId) missing.push("CONTENTFUL_SPACE_ID");
    if (!env.CONTENTFUL_CMA_TOKEN) missing.push("CONTENTFUL_CMA_TOKEN");
    if (missing.length) {
      return json({ error: "server_not_configured", missing }, 500, corsHeaders);
    }

    // ─── Upload photo first (if any), get asset id to link ───
    let photoAssetId = null;
    if (parsed.photo) {
      try {
        photoAssetId = await uploadPhoto(parsed.photo, name, {
          spaceId, environment, locale, token: env.CONTENTFUL_CMA_TOKEN,
        });
      } catch (e) {
        return json({ error: "photo_upload_failed", detail: e.message }, 502, corsHeaders);
      }
    }

    // ─── Build + POST entry ───
    const fields = { name: { [locale]: name } };
    if (field)           fields.field    = { [locale]: field };
    if (contact)         fields.contact  = { [locale]: contact };
    if (bio)             fields.bio      = { [locale]: bio };
    if (hashtags.length) fields.hashtags = { [locale]: hashtags };
    if (socials.length)  fields.socials  = { [locale]: socials };
    if (photoAssetId) {
      fields.photo = {
        [locale]: {
          sys: { type: "Link", linkType: "Asset", id: photoAssetId },
        },
      };
    }

    const entryRes = await fetch(
      `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.CONTENTFUL_CMA_TOKEN}`,
          "Content-Type": "application/vnd.contentful.management.v1+json",
          "X-Contentful-Content-Type": "artist",
        },
        body: JSON.stringify({ fields }),
      },
    );

    if (!entryRes.ok) {
      const detail = await entryRes.text().catch(() => "");
      return json(
        { error: "contentful_error", status: entryRes.status, detail: detail.slice(0, 500) },
        502,
        corsHeaders,
      );
    }

    const entry = await entryRes.json();
    return json(
      { ok: true, id: entry.sys?.id, assetId: photoAssetId },
      200,
      corsHeaders,
    );
  },
};

// ─── Parsers ───
async function parseJson(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    const e = new Error("Body was not valid JSON");
    e.code = "invalid_json";
    throw e;
  }
  return { ...body, photo: null };
}

async function parseMultipart(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    const e = new Error("Could not parse multipart body");
    e.code = "invalid_multipart";
    throw e;
  }
  const out = {
    name:     form.get("name"),
    field:    form.get("field"),
    contact:  form.get("contact"),
    bio:      form.get("bio"),
    hashtags: form.getAll("hashtags[]"),
    socials:  form.getAll("socials[]"),
    photo:    null,
  };

  const photoField = form.get("photo");
  if (photoField && typeof photoField === "object" && photoField.size > 0) {
    if (photoField.size > MAX_PHOTO_BYTES) {
      const e = new Error(`Photo exceeds ${Math.round(MAX_PHOTO_BYTES / 1024 / 1024)}MB limit`);
      e.code = "photo_too_large";
      throw e;
    }
    const type = (photoField.type || "").toLowerCase();
    if (!ALLOWED_PHOTO_TYPES.includes(type)) {
      const e = new Error(`Unsupported photo type: ${type || "unknown"}. Use JPG, PNG, WebP or GIF.`);
      e.code = "photo_type_unsupported";
      throw e;
    }
    out.photo = {
      buffer:   await photoField.arrayBuffer(),
      filename: safeFilename(photoField.name),
      mimeType: type,
    };
  }
  return out;
}

// ─── Contentful photo upload ───
// Three-step flow:
//   1. POST binary to /uploads             → returns upload id
//   2. POST asset referencing the upload   → returns asset id + version
//   3. PUT /process                        → tells Contentful to process the file
// The entry links the asset id; both remain Draft until admin publishes.
async function uploadPhoto(photo, artistName, { spaceId, environment, locale, token }) {
  // 1. Upload binary
  const uploadRes = await fetch(
    `https://upload.contentful.com/spaces/${spaceId}/uploads`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      body: photo.buffer,
    },
  );
  if (!uploadRes.ok) {
    throw new Error(`upload step: ${uploadRes.status} ${(await uploadRes.text()).slice(0, 200)}`);
  }
  const uploadBody = await uploadRes.json();
  const uploadId = uploadBody.sys?.id;
  if (!uploadId) throw new Error("upload step: missing upload id");

  // 2. Create asset
  const assetPayload = {
    fields: {
      title: { [locale]: `${artistName} — portrait` },
      file: {
        [locale]: {
          contentType: photo.mimeType,
          fileName:    photo.filename,
          uploadFrom:  { sys: { type: "Link", linkType: "Upload", id: uploadId } },
        },
      },
    },
  };
  const assetRes = await fetch(
    `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/assets`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify(assetPayload),
    },
  );
  if (!assetRes.ok) {
    throw new Error(`asset create: ${assetRes.status} ${(await assetRes.text()).slice(0, 200)}`);
  }
  const assetBody = await assetRes.json();
  const assetId      = assetBody.sys?.id;
  const assetVersion = assetBody.sys?.version;
  if (!assetId) throw new Error("asset create: missing asset id");

  // 3. Trigger processing (async on Contentful's side; we return the id either way)
  const processRes = await fetch(
    `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/assets/${assetId}/files/${locale}/process`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Contentful-Version": String(assetVersion),
      },
    },
  );
  if (!processRes.ok) {
    throw new Error(`asset process: ${processRes.status} ${(await processRes.text()).slice(0, 200)}`);
  }

  return assetId;
}

// ─── helpers ───
function str(value, maxLen) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function cleanList(value, maxItemLen, maxCount, transform, keep = () => true) {
  const arr = Array.isArray(value) ? value : (value == null ? [] : [value]);
  return arr
    .map(x => (typeof x === "string" ? transform(x.trim()).slice(0, maxItemLen) : ""))
    .filter(Boolean)
    .filter(keep)
    .slice(0, maxCount);
}

function safeFilename(name) {
  if (typeof name !== "string" || !name) return "photo";
  return name.replace(/[^\w.-]+/g, "_").slice(0, 120) || "photo";
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
