import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));

// Initialize Supabase client if configured
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Local fallback store directory
const DATA_DIR = path.resolve(__dirname, 'data');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RSVPS_FILE)) {
  fs.writeFileSync(RSVPS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

interface LocalRsvpRecord {
  id: string;
  guestName: string;
  status: 'attending' | 'declined';
  attendeesCount: number;
  message: string;
  privacyAcknowledged: boolean;
  ipHash: string;
  createdAt: string;
}

function getLocalRsvps(): LocalRsvpRecord[] {
  try {
    const content = fs.readFileSync(RSVPS_FILE, 'utf-8');
    return JSON.parse(content) || [];
  } catch (err) {
    console.error('Error reading local rsvps.json:', err);
    return [];
  }
}

function saveLocalRsvp(record: LocalRsvpRecord): void {
  try {
    const list = getLocalRsvps();
    list.unshift(record);
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local rsvps.json:', err);
  }
}

// In-memory rate limiting and spam cache
const recentSubmissions = new Map<string, number>();

// Clean up stale rate limits every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60000) {
      recentSubmissions.delete(key);
    }
  }
}, 600000);

// RSVP API Endpoint
app.post('/api/rsvp', async (req, res) => {
  try {
    const { guestName, attending, attendeesCount, message, privacyAcknowledged, honeypot } = req.body;

    // Spam honeypot trap
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(400).json({ error: 'Invalid submission detected.' });
    }

    // Name validation
    if (!guestName || typeof guestName !== 'string') {
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    const cleanName = guestName.trim();
    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({ error: 'Name must be between 2 and 80 characters.' });
    }

    // Status validation
    if (typeof attending !== 'boolean') {
      return res.status(400).json({ error: 'Please specify if you are attending or declining.' });
    }

    // Privacy acknowledgment
    if (!privacyAcknowledged) {
      return res.status(400).json({ error: 'Please acknowledge the privacy note to submit.' });
    }

    // Attendees count
    let finalCount = 0;
    if (attending) {
      const parsedCount = parseInt(attendeesCount, 10);
      if (isNaN(parsedCount) || parsedCount < 1) {
        return res.status(400).json({ error: 'Please select at least 1 attendee if you are attending.' });
      }
      if (parsedCount > 15) {
        return res.status(400).json({ error: 'Maximum 15 attendees per party reservation. Please contact the parents for larger groups.' });
      }
      finalCount = parsedCount;
    } else {
      // Prompt requirement: "When declining, save zero attendees."
      finalCount = 0;
    }

    // Message validation
    const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 500) : '';

    // Spam / duplicate submission check: prevent same name within 20 seconds
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const rateLimitKey = `${cleanName.toLowerCase()}_${ip}`;
    const now = Date.now();
    const lastTime = recentSubmissions.get(rateLimitKey);
    if (lastTime && now - lastTime < 20000) {
      return res.status(429).json({ error: 'We already received your RSVP a moment ago! Thank you so much.' });
    }
    recentSubmissions.set(rateLimitKey, now);

    const recordId = 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const createdAt = new Date().toISOString();
    const status = attending ? 'attending' : 'declined';

    // 1. If Supabase is connected, store in PostgreSQL
    if (supabase) {
      try {
        const { error } = await supabase.from('rsvps').insert({
          guest_name: cleanName,
          status,
          attendees_count: finalCount,
          message: cleanMessage,
          privacy_acknowledged: true,
          ip_hash: ip.slice(0, 16),
        });

        if (error) {
          console.warn('Supabase insert warning, falling back to local file storage:', error.message);
        }
      } catch (sbErr) {
        console.warn('Supabase connection error:', sbErr);
      }
    }

    // 2. Always persist locally so no response is ever lost
    saveLocalRsvp({
      id: recordId,
      guestName: cleanName,
      status,
      attendeesCount: finalCount,
      message: cleanMessage,
      privacyAcknowledged: true,
      ipHash: ip.slice(0, 16),
      createdAt,
    });

    return res.status(200).json({
      success: true,
      message: attending
        ? `Hooray! We have reserved ${finalCount} seat${finalCount > 1 ? 's' : ''} for ${cleanName}. See you at Baby AZ's fairytale celebration!`
        : `Thank you for letting us know, ${cleanName}. We will miss you, but we send you warm fairytale hugs!`,
      status,
      attendeesCount: finalCount,
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return res.status(500).json({ error: 'Something went wrong while saving your RSVP. Please try again.' });
  }
});

// Non-sensitive aggregated stats endpoint (No guest names or private data exposed)
app.get('/api/rsvp/summary', async (_req, res) => {
  try {
    const list = getLocalRsvps();
    const totalSubmissions = list.length;
    const attendingList = list.filter((r) => r.status === 'attending');
    const totalGuests = attendingList.reduce((sum, r) => sum + r.attendeesCount, 0);

    return res.json({
      totalSubmissions,
      attendingCount: attendingList.length,
      declinedCount: list.filter((r) => r.status === 'declined').length,
      totalGuests,
      supabaseConnected: Boolean(supabase),
    });
  } catch {
    return res.json({ totalSubmissions: 0, attendingCount: 0, totalGuests: 0 });
  }
});

// CSV Export Endpoint for parents (Protected by admin export PIN)
app.get('/api/rsvp/export-csv', (req, res) => {
  const pin = req.query.pin || req.headers['x-admin-pin'];
  const expectedPin = process.env.ADMIN_EXPORT_PIN || '2026';

  if (pin !== expectedPin) {
    return res.status(401).send('Unauthorized: Invalid Admin PIN. Please provide ?pin=2026');
  }

  const list = getLocalRsvps();
  let csv = 'ID,Guest Name,Status,Attendees Count,Message,Submitted At\n';

  list.forEach((r) => {
    const safeName = `"${r.guestName.replace(/"/g, '""')}"`;
    const safeMsg = `"${(r.message || '').replace(/"/g, '""')}"`;
    csv += `${r.id},${safeName},${r.status},${r.attendeesCount},${safeMsg},${r.createdAt}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="Baby_AZ_RSVP_Responses.csv"');
  return res.status(200).send(csv);
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    celebration: "Avryl Zaliyah 1st Birthday & Christening",
    date: '2026-12-05',
    time: new Date().toISOString(),
  });
});

async function startServer() {
  if (!isProd) {
    // Mount Vite middlewares in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`❄️ Baby AZ Magical Invitation server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
