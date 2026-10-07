/**
 * Maps a social URL to a short uppercase label and normalised href.
 * Unknown domains fall back to a shortened host label.
 */
const PLATFORM_LABELS: { host: RegExp; label: string }[] = [
  { host: /(^|\.)instagram\.com$/i,   label: 'IG'  },
  { host: /(^|\.)twitter\.com$/i,     label: 'X'   },
  { host: /(^|\.)x\.com$/i,           label: 'X'   },
  { host: /(^|\.)facebook\.com$/i,    label: 'FB'  },
  { host: /(^|\.)linkedin\.com$/i,    label: 'LI'  },
  { host: /(^|\.)tiktok\.com$/i,      label: 'TT'  },
  { host: /(^|\.)youtube\.com$/i,     label: 'YT'  },
  { host: /(^|\.)youtu\.be$/i,        label: 'YT'  },
  { host: /(^|\.)vimeo\.com$/i,       label: 'VM'  },
  { host: /(^|\.)behance\.net$/i,     label: 'BE'  },
  { host: /(^|\.)soundcloud\.com$/i,  label: 'SC'  },
  { host: /(^|\.)bandcamp\.com$/i,    label: 'BC'  },
  { host: /(^|\.)threads\.net$/i,     label: 'TH'  },
  { host: /(^|\.)mastodon\./i,        label: 'MA'  },
  { host: /(^|\.)are\.na$/i,          label: 'AR'  },
  { host: /(^|\.)cargo\.site$/i,      label: 'WEB' },
];

export interface SocialLink {
  label: string;
  href: string;
  raw: string;
}

export function parseSocial(raw: string): SocialLink | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;

  const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let host = '';
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return { label: 'WEB', href: trimmed, raw };
  }

  const match = PLATFORM_LABELS.find(p => p.host.test(host));
  if (match) return { label: match.label, href, raw };

  const short = host.split('.').slice(-2, -1)[0]?.toUpperCase() ?? 'WEB';
  return { label: short.slice(0, 3), href, raw };
}
