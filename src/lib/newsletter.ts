// Newsletter signups are stored in a Google Sheet through an Apps Script
// web app. GitHub Pages is static, so this endpoint is the only "backend".
//
// Source of the script: scripts/newsletter-apps-script.gs
// Re-deploying it in Apps Script (Deploy -> New deployment) mints a new URL,
// which has to be pasted here as well.
const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxEJHe8zgsLVeMWfkkPC4oOuGuDxfZzSka7K6dIjcQYoZevllB1kjbevWsPPN3hQa1Lgg/exec';

// Shared with the Apps Script. Visible in the bundle by design - it only
// filters out drive-by bots that hit the endpoint directly, it is not a
// security boundary.
const SECRET = 'xHh6hINXqPhHOi3DWA40U5Q5z1b2';

export type SignupResult = 'success' | 'invalid' | 'error';

/**
 * Sends one email address to the sheet.
 *
 * Note the deliberately bare fetch: setting a Content-Type header would turn
 * this into a preflighted request, and Apps Script does not answer OPTIONS.
 * Without custom headers the browser sends a simple request, follows the
 * redirect to script.googleusercontent.com, and we can read the JSON back.
 */
export async function submitSignup(
  email: string,
  source: string,
  botcheck: string,
): Promise<SignupResult> {
  const trimmed = email.trim();

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) return 'invalid';

  if (!ENDPOINT) {
    console.warn('[newsletter] ENDPOINT is not configured yet.');
    return 'error';
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ secret: SECRET, email: trimmed, source, botcheck }),
    });

    const data = await response.json();
    return data.success ? 'success' : 'error';
  } catch {
    return 'error';
  }
}
