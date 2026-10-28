# Ophlow website

The public site for Ophlow: who we are, what we build, and product one (Ophlow for Senior Living).

- `npm install` once, copy `.env.example` to `.env.local` and fill it in, then `npm run dev` and open http://localhost:3002
- Hosted on Vercel: the routes in `app/api` save demo bookings and setup forms to Supabase (`supabase/leads.sql`).
  With no keys set, the forms fall back to a pre-filled email.

The contact address lives in `lib/site.ts` and the page text lives in `app/page.tsx`.

What's left to do is in [ROADMAP.md](ROADMAP.md).

The site names no customers and shows only room numbers in its drawings of the app.
