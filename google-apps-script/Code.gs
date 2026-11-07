/** Deploy as owner; public callers may only write with the server-side shared secret. */
function doGet() { return json_({ success: false, error: 'Not available' }); }
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('RSVP_SHEETS_SECRET');
    var sheetId = props.getProperty('RSVP_SPREADSHEET_ID');
    if (!secret || secret.length < 32 || !sheetId) return json_({ success: false });
    if (!e || !e.postData || e.postData.contents.length > 8192) return json_({ success: false });
    var b = JSON.parse(e.postData.contents);
    if (b.secret !== secret) return json_({ success: false });
    if (typeof b.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(b.requestId)) return json_({ success: false });
    if (typeof b.guestName !== 'string' || b.guestName.trim().length < 2 || b.guestName.trim().length > 80 || b.privacyAcknowledged !== true || typeof b.attending !== 'boolean') return json_({ success: false });
    if (!Number.isInteger(b.attendeesCount) || (b.attending ? b.attendeesCount < 1 || b.attendeesCount > 5 : b.attendeesCount !== 0)) return json_({ success: false });
    if (typeof b.message !== 'string' || b.message.length > 500) return json_({ success: false });
    lock.waitLock(10000);
    var book = SpreadsheetApp.openById(sheetId);
    var sheet = book.getSheetByName('RSVP Responses');
    if (!sheet) sheet = book.insertSheet('RSVP Responses');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Response ID', 'Submitted at (Philippine time)', 'Guest name', 'Attendance', 'Total guests', 'Warm wishes', 'Privacy acknowledged']);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    // Persisted ID makes retries safe even after a timeout or a fresh server instance.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(b.requestId).matchEntireCell(true).findNext()) return json_({ success: true, requestId: b.requestId });
    var row = [b.requestId, Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd HH:mm:ss'), safeText_(b.guestName.trim()), b.attending ? 'Attending' : 'Declined', b.attendeesCount, safeText_(b.message.trim()), 'Yes'];
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, 7).setValues([row]);
    SpreadsheetApp.flush();
    return json_({ success: true, requestId: b.requestId });
  } catch (err) {
    return json_({ success: false });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
function safeText_(text) { return /^[\s]*[=+@-]/.test(text) ? "'" + text : text; }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
