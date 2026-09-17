/**
 * Google Apps Script backing the newsletter forms on massivedreamers.com.
 *
 * Kept in the repo for reference only - it is NOT bundled with the site.
 * It lives in the "MD Newsletter" spreadsheet: Extensions -> Apps Script.
 *
 * Deploy: Deploy -> New deployment -> Web app
 *   Execute as:      Me
 *   Who has access:  Anyone
 * Then paste the resulting /exec URL into ENDPOINT in src/lib/newsletter.ts
 */

const SHEET_NAME = 'Subscribers';
const SECRET = 'xHh6hINXqPhHOi3DWA40U5Q5z1b2';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SECRET) return json({ success: false, error: 'unauthorized' });

    // Honeypot: answer OK so the bot stops retrying, but write nothing.
    if (body.botcheck) return json({ success: true });

    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ success: false, error: 'invalid_email' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();
      const existing = lastRow < 2
        ? []
        : sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(function (r) { return r[0]; });

      // A repeat signup is still a success for the visitor - just don't duplicate the row.
      if (existing.indexOf(email) === -1) {
        sheet.appendRow([
          email,
          new Date(),
          String(body.source || 'unknown').slice(0, 60),
          'website form opt-in'
        ]);
      }
    } finally {
      lock.releaseLock();
    }

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: 'server_error' });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
