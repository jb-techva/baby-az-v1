# Baby AZ's Magical Frozen 1st Birthday & Christening Invitation Website ❄️✨

A production-ready, mobile-first, interactive storybook invitation website celebrating **Avryl Zaliyah ("Baby AZ")** turning **ONE** and receiving the sacred blessing of her **Christening** on **Saturday, December 5, 2026** in Bacoor, Cavite, Philippines.

Inspired by the Frozen winter wonderland aesthetic with pink highlights honoring **Jollibee Fairytale Land**.

---

## ✨ Features

1. **Interactive Opening Storybook Envelope**
   - Fullscreen magical invitation screen with cute snowman holding a gift.
   - Animated envelope opening upon tapping **"CLICK TO OPEN"**.
   - Initiates audio playback directly from guest interaction and smoothly unveils the royal invitation.

2. **Instrumental Music ("Do You Want to Build a Snowman?")**
   - Exact uploaded instrumental audio stored at `public/audio/baby-az-music.mp3`.
   - Continuous looping background playback with 30% default volume.
   - Floating Elsa avatar disc player with play/pause and mute/unmute controls.

3. **Authentic Detailed Frozen Snowflakes (Canvas Animation)**
   - Replaced basic circular dots with true Frozen crystalline snowflakes (branching dendrites, star crystals, six-ray ice stars).
   - Natural falling speeds, gentle drifting, subtle rotation, depth layering, and `prefers-reduced-motion` compliance.

4. **Real Baby AZ Hero Photo & Royal Reveal**
   - Features Baby AZ's actual photograph in her blue tutu outfit (`az rawr.jpg` saved at `public/images/baby-az-hero.jpg`).
   - Natural sideways pose preserved within an arched icy-blue crystal frame with silver sparkles and waving Olaf companion.
   - Smooth reveal animation on invitation opening: soft glow, crystal shimmer, and name reveal.

5. **Confirmed Locations & Direct Navigation**
   - **The Sacred Blessing (9:00 AM – 11:00 AM):**  
     **Our Lady Queen of Peace Parish**, Queen's Row West, Bacoor City, Cavite (`public/images/venues/church.png`).
   - **Baby AZ's Royal Birthday Celebration (12:30 PM – 3:00 PM):**  
     **Jollibee Molino Bayanan** (`public/images/venues/jollibee-bayanan.jpg`).

6. **Updated Celebration Timeline**
   - **9:00 AM – 11:00 AM:** Christening Ceremony (Our Lady Queen of Peace Parish)
   - **11:00 AM – 12:00 PM:** Family & Friends Picture Taking (At the church after the Christening)
   - **12:00 PM – 12:30 PM:** Travel to Birthday Venue (Transfer to Jollibee Molino Bayanan)
   - **12:30 PM – 3:00 PM:** Baby AZ's Royal Birthday Party (Jollibee Fairytale Land)

7. **Frozen-Themed Gift Registry & Functional Wishlist (`/wishlist`)**
   - Registry section on invitation featuring Olaf holding a gift and *"VIEW BABY AZ'S WISHLIST"* button.
   - Dedicated `/wishlist` page with category filters and editable gift cards.

8. **Baby AZ's Magical Moments Gallery (8 Real Photos & Lightbox)**
   - Displays all 8 real uploaded photos in exact sequence:
     1. Blue tutu outfit (`baby-az-01.jpg`)
     2. Baby AZ with a book (`baby-az-02.jpg`)
     3. Smiling in red in high chair (`baby-az-03.jpg`)
     4. Crocheted sunflower dress & hat (`baby-az-04.jpg`)
     5. Storybook Snow White costume (`baby-az-05.jpg`)
     6. Cheerful in pink (`baby-az-06.jpg`)
     7. Outdoors by the pool (`baby-az-07.jpg`)
     8. Beaming with turquoise hair accessories (`baby-az-08.jpg`)
   - Interactive staggered grid with subtle shimmer and glow borders.
   - Fullscreen lightbox with high-quality natural aspect ratio, mobile swipe gestures, desktop arrows, and keyboard navigation.

9. **Secure RSVP with Supabase PostgreSQL Integration**
   - Private RSVP form with duplicate protection, rate limiting, and parent CSV export (`/api/rsvp/export-csv?pin=2026`).

---

## 📂 Project Structure

```
├── public/
│   ├── assets/aistudio/       # Uploaded Frozen artwork & original MP3
│   └── audio/
│       └── baby-az-music.mp3  # Dedicated audio path
├── src/
│   ├── assets/images/         # High-resolution generated placeholders
│   ├── config/
│   │   └── invitation.ts      # CENTRAL EDITABLE CONFIGURATION
│   ├── components/
│   │   ├── OpeningEnvelope.tsx
│   │   ├── SnowBackground.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CountdownSection.tsx
│   │   ├── VenuesSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── DressCodeSection.tsx
│   │   ├── GiftNoteSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── RsvpSection.tsx
│   │   └── FooterSection.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── schema.sql             # PostgreSQL schema with RLS and indices
├── server.ts                  # Express fullstack server & RSVP API
├── package.json
└── README.md
```

---

## 🛠️ Central Configuration (`src/config/invitation.ts`)

All celebration details are safely editable in one single file:
- **Celebrant:** Baby AZ's name, parents' names, welcome note, and photo URLs.
- **Event Date:** `2026-12-05T09:00:00+08:00`.
- **Venues:** Church and Jollibee names, addresses, photos, and Google Maps URLs.
- **Timeline:** Schedule times, titles, descriptions, and locations.
- **RSVP:** Deadlines, max party size, and disclaimers.

---

## 🗄️ Supabase PostgreSQL Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open `supabase/schema.sql` and run the entire script.
4. Add your Supabase credentials to `.env`:
   ```bash
   SUPABASE_URL="https://your-project.supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"
   ADMIN_EXPORT_PIN="2026"
   ```
5. **How to View & Export RSVPs:**
   - In Supabase, open **Table Editor** > `rsvps`.
   - Click the **Export** button in the top right to download a CSV.
   - Alternatively, use the **Organizer Export** button in the website's RSVP section and enter PIN `2026` to download the CSV directly.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser:
http://localhost:3000
```

With love for **Avryl Zaliyah ("Baby AZ")**, Mommy Chaye, and Daddy Jerome! ❄️👑
