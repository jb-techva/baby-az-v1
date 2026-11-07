# Private Google Sheets RSVP setup

The website accepts submissions only; it has no guest-list read or export endpoint. Responses are acknowledged only after Google confirms a saved row. Five guests maximum, including adults and children; declines store zero.

## One-time Google setup
1. In your Google account create a Sheet named Baby AZ — RSVP Responses. Leave Share > General access set to Restricted. Share individually only with the other parent if desired; do not publish the Sheet to the web.
2. From the Sheet open Extensions > Apps Script. Paste google-apps-script/Code.gs into Code.gs.
3. In Apps Script > Project Settings > Script properties add:
   - RSVP_SPREADSHEET_ID: the ID between /d/ and /edit in your Sheet URL.
   - RSVP_SHEETS_SECRET: a unique random secret of at least 32 characters (use a password manager). Do not commit it to GitHub or put it in a VITE_ variable.
4. Deploy > New deployment > Web app. Execute as yourself; access Anyone. Authorize the script to write to your Sheet. This makes the submission receiver reachable, NOT the private spreadsheet. It returns no guest-list data and rejects writes without the server's shared secret.
5. Copy the deployment URL ending in /exec.

## Vercel setup
In the existing Vercel project's Settings > Environment Variables add to Production:
- RSVP_SHEETS_WEB_APP_URL: the /exec URL from step 5.
- RSVP_SHEETS_SECRET: exactly the same secret as in Apps Script.
Redeploy after saving. These variables are server-only; never prefix them with VITE_. GitHub access does not provide access to Vercel's environment variables.

## Verify before sending invitations
- Submit a test acceptance for five guests; verify exactly one row in the private Sheet.
- Submit a decline; verify its count is zero.
- Confirm the public dropdown offers only 1–5. The backend rejects values above five.
- Open the Sheet URL while signed out: it must deny access/request sign-in.
- Repeating the same submission after a network failure must not append another row.
- Remove test rows in Google Sheets when done.

Until credentials are configured, the form clearly reports unavailable and never falsely claims a reservation was saved.
No existing stored responses are migrated by this change; retain any earlier database or export separately.
