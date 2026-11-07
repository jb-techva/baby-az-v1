import type { IncomingMessage, ServerResponse } from 'node:http';

export type RsvpRequest = IncomingMessage & { body?: unknown };
const messageFor = (attending: boolean, count: number, name: string) => attending
  ? `Hooray! We have reserved ${count} seat${count > 1 ? 's' : ''} for ${name}. See you at Baby AZ's fairytale celebration!`
  : `Thank you for letting us know, ${name}. We will miss you, but we send you warm fairytale hugs!`;

/** Public write-only endpoint. Spreadsheet URL and write secret remain server-side. */
export default async function handler(req: RsvpRequest, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const reply = (status: number, data: object) => { res.statusCode = status; res.end(JSON.stringify(data)); };
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, { error: 'Method not allowed.' }); }
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return reply(415, { error: 'Please submit the RSVP form.' });
  try {
    let body = req.body;
    if (body === undefined) {
      let raw = '';
      for await (const chunk of req) {
        raw += chunk.toString();
        if (Buffer.byteLength(raw) > 8192) return reply(413, { error: 'Submission is too large.' });
      }
      body = JSON.parse(raw);
    } else if (typeof body === 'string') {
      if (Buffer.byteLength(body) > 8192) return reply(413, { error: 'Submission is too large.' });
      body = JSON.parse(body);
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { error: 'Invalid RSVP.' });
    const b = body as Record<string, unknown>;
    const name = typeof b.guestName === 'string' ? b.guestName.trim() : '';
    if (name.length < 2 || name.length > 80) return reply(400, { error: 'Name must be between 2 and 80 characters.' });
    if (typeof b.attending !== 'boolean') return reply(400, { error: 'Please choose your attendance.' });
    if (b.privacyAcknowledged !== true) return reply(400, { error: 'Please acknowledge the privacy notice.' });
    if (b.honeypot) return reply(400, { error: 'Invalid submission.' });
    if (!Number.isInteger(b.attendeesCount) || (b.attending ? Number(b.attendeesCount) < 1 || Number(b.attendeesCount) > 5 : b.attendeesCount !== 0)) return reply(400, { error: 'Please select 1 to 5 guests, or zero when declining.' });
    if (b.message !== undefined && (typeof b.message !== 'string' || b.message.length > 500)) return reply(400, { error: 'Please keep your message within 500 characters.' });
    if (typeof b.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(b.requestId)) return reply(400, { error: 'Please refresh the page and try again.' });
    const url = process.env.RSVP_SHEETS_WEB_APP_URL;
    const secret = process.env.RSVP_SHEETS_SECRET;
    if (!url || !secret) return reply(503, { error: 'RSVP registration is not available yet. Please contact the parents or try again later.' });
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(url) || secret.length < 32) return reply(503, { error: 'RSVP registration is temporarily unavailable. Please contact the parents.' });
    const upstream = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, requestId: b.requestId, guestName: name, attending: b.attending, attendeesCount: b.attendeesCount, message: String(b.message || '').trim(), privacyAcknowledged: true }),
      signal: AbortSignal.timeout(12000),
    });
    const saved = await upstream.json() as { success?: boolean; requestId?: string };
    if (!upstream.ok || saved.success !== true || saved.requestId !== b.requestId) throw new Error('Storage did not confirm');
    return reply(200, { success: true, message: messageFor(b.attending, Number(b.attendeesCount), name), status: b.attending ? 'attending' : 'declined', attendeesCount: b.attendeesCount });
  } catch (error) {
    if (error instanceof SyntaxError) return reply(400, { error: 'Invalid submission format.' });
    return reply(502, { error: 'We could not confirm your RSVP was saved. Please retry; the same response will not be added twice.' });
  }
}
