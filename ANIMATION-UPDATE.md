# Baby AZ animation update

## Changes
- Layered ice-blue envelope with a folding flap, rising Baby AZ invitation card, sparkle burst, and 2.2-second reveal.
- Envelope and main button both support keyboard activation; repeated clicks are ignored.
- Music begins on the opening interaction. A Skip animation control appears during the reveal.
- Background page is inert until revealed; opening locks page scrolling.
- Hero entrance animations restart when the invitation is revealed.
- Bounded desktop snowflake pointer trail and small touch bursts on links/buttons.
- Reduced-motion preference disables the new particle trail and uses a fast reveal.
- Existing photos, content, registry, RSVP, and navigation retained.
- Updated esbuild dependency to ^0.28.0 to satisfy Vite 8's peer dependency.

## Run and deploy
Use Node 22.12+ (or another Node version supported by your installed Vite).
Run `npm install`, then `npm run lint` and `npm run build`.
For a local front-end preview: `npx vite --host 0.0.0.0`.
Copy the updated source into your existing project or commit it to the repository connected to Vercel. Keep your existing Vercel environment variables and backend configuration.
The deployed website has not been changed by this update.

## Editing later
Photos, wishlist, and event settings remain in src/config/invitation.ts.
The opening card wording is in src/components/OpeningEnvelope.tsx.
Envelope and particle styling is at the end of src/index.css.
