# Ophlow website — roadmap

What's left to finish the public site at [ophlow.com](https://ophlow.com). The product itself has its own roadmap in
the Living-Assistance repo.

**Hosting:** moving from GitHub Pages to **Vercel** (team "Ash Uchida's projects", Pro), so the server routes in
`app/api` can save bookings and setup forms. Until ophlow.com points at Vercel it keeps serving the last GitHub
Pages build; the Pages deploy workflow is gone, so merges to `main` don't change it.

**Data:** bookings and setup forms are saved in the **Living-Assistance** Supabase project, in a private `leads`
schema (`supabase/leads.sql`). Read them in Supabase → Table Editor → schema `leads`.

## Your to-dos

Account steps only you can do, for both landing pages (and the apps), most important first. Tell Claude when one is
done and it does the follow-up.

- [ ] **GoDaddy DNS:** sign in to GoDaddy in Claude's browser pane and say "go". Claude switches ophlow.com to Vercel
      (section 1), and can add a restaurant address (e.g. `restaurants.ophlow.com`) and the Resend domain records in
      the same sitting. Then turn off GitHub Pages: repo → Settings → Pages.
- [ ] **Turn on Analytics:** Vercel → `ophlow-landing-page` and `ophlow-restaurants` → **Analytics** → Enable.
- [ ] **Review the privacy policy and terms drafts:** pull requests Ophlow-landing-page #14 and
      Landing-page-Restuarant #4. Check the 1-year keep period and the 30-day reply promise, then merge.
- [ ] **Resend:** sign up at resend.com with ophlow@gmail.com → API key → add `RESEND_API_KEY` in both Vercel projects
      (Settings → Environment Variables) → redeploy. Every booking and setup form is then emailed to you.
- [ ] **Leaked password protection** (for the apps' staff sign-ins, not the landing pages; needs Supabase Pro, which
      you have): supabase.com → **Living-Assistance** → Authentication → Sign In / Providers (or Attack Protection)
      → Email → turn on **Prevent use of leaked passwords** → Save. Then the same in **Righteous-Slice**. Existing
      passwords keep working; it applies the next time someone sets one. Afterwards Claude can rerun Supabase's
      security check to confirm the warning is gone.
- [ ] **Restaurant site decisions:** product name, demo hours, pricing wording, whether "Get started" is self-serve.
- [ ] **Social proof:** one real quote or number for each site, with the person's OK.
- [ ] **Try both sites on your own phone:** Build yours (drag and tap) and a test booking.
- [ ] **Vercel tools for Claude:** in a Claude Code terminal, run `/mcp` → vercel → approve.
- [ ] **Archive the old "landing page living-assistance" chat**, which still points to the old folder.

## Live now

| Page | What it does |
| --- | --- |
| `/` | Pitch, product tour, **Build yours** (drag-and-drop feature builder: click to add, click again to remove), FAQ. **Book a demo** and **Get started** everywhere. |
| `/book` | Demo calendar in the visitor's time zone, built from our hours in `lib/site.ts` (`AVAILABILITY`). Booked times disappear for everyone; confirming saves the booking (pre-filled email if the database can't be reached). |
| `/workspace` | "Get started": an empty workspace with a 6-step setup form (draft saved in the browser, sent answers saved in Supabase). Opened from Build yours, it shows only the picked features, with a **Laptop / Phone** switch. |

No customer is named. The site says it was built with an assisted living operations team, which is true; it no
longer claims a live pilot.

## To do

### 0. "Get started": an owner buys it themselves and it just works — *new, Oct 29*

**Goal:** a small Airbnb or VRBO owner can sign up, pay and be running without a call. A "Get started" button
next to "Book a call".

**What the owner sees**

1. **Add your place:** name, email, phone; the place's address, how many it sleeps, check-out and check-in times;
   the Airbnb and VRBO **calendar links** (Export calendar); their **repair limit** (default $200); optional cleaning
   instructions and photos.
2. **Price and terms** (from the Cabin Care owner offer): 10% of their payout billed monthly; cleaning paid per clean
   to the cleaner; repairs at the pro's price, over $200 needs their OK; supplies at cost; cancel with 30 days'
   notice. They tick "I agree" (needs the terms and privacy pages).
3. **Pay:** Stripe Checkout in **setup mode**: it saves their card and charges nothing today. We charge once a month,
   after the work is done.
4. **Done page:** "You're set." Steps to add Ophlow as a **co-host** on Airbnb (for guest messages), and an email with
   a sign-in link to their owner dashboard.

**What happens behind it**

- Stripe sends `checkout.session.completed` to a webhook on our server. It creates, in the app's database: the owner's
  account (Owner job, sees only their places), the place with its calendar links and limit. Calendar sync starts,
  so the next checkout already makes a turnover clean. No one on our team has to do anything.
- **Monthly statement** (1st of the month): our share + cleans + repairs → a Stripe invoice charged to the saved
  card, and the same statement on the owner's dashboard.
- Repairs under the limit just go on the statement; over it, the owner approves in the app first.

**Problem to solve first:** calendar links have dates but **no prices**, so we can't see the payout our 10% comes from.
Options: the owner's monthly Airbnb earnings report, co-host earnings if we're co-host, or the owner types the
month's income. Pick one before the share-of-income price can be charged automatically.

**Build order:** (1) "Add your place" form, saved like the other forms (replaces the senior-living `/workspace`);
(2) Stripe Checkout + webhook; (3) the webhook creates the owner and place in the app; (4) monthly statement and
invoice.

**Needs from Ash:** a Stripe account in the business's name (needs the legal entity and its tax ID, or start as a
sole proprietor); `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and the publishable key in Vercel; the terms and
privacy pages; the percentage. Test everything in Stripe's test mode first.

### 1. Go live on Vercel — *most important* · You

Code is done: bookings and setup forms save to Supabase, booked times are hidden, double-booking is refused, and the
database can't be read from outside. What's left is account setup:

- [ ] Vercel → **Add New → Project** → import `Ophlow-com/Ophlow-landing-page` into **Ash Uchida's projects (Pro)**.
      Preset Next.js, root `./`.
- [ ] Settings → Environment Variables: `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (values in `.env.example` /
      Supabase → Project Settings → API keys, Living-Assistance project) → redeploy.
- [ ] On the `*.vercel.app` address: book a test demo and send a test setup form, check both rows in Supabase
      (schema `leads`), then delete them.
- [ ] Vercel → Project → **Domains** → add `ophlow.com` and `www.ophlow.com` → change the DNS records at your domain
      registrar to the ones Vercel shows. The site can blink for a few minutes while DNS updates.
- [ ] GitHub → `Ophlow-landing-page` → Settings → **Pages** → remove the custom domain and turn Pages off.

*Done when:* ophlow.com loads from Vercel and a test booking from a browser with no mail app shows up in Supabase.

**Email alerts (optional, ≈15 min):** sign up at resend.com with ophlow@gmail.com → API key → Vercel env
`RESEND_API_KEY` → redeploy. Each booking and setup form is then also emailed to ophlow@gmail.com. Without it,
check Supabase for new rows.

### 2. Know whether anyone uses it

- [x] Vercel Web Analytics in the code (no cookies), with events: "Demo time picked", "Demo booked",
      "Setup form sent".
- [ ] **You:** Vercel → ophlow-landing-page → **Analytics** → Enable. Nothing is counted until it's on.

*Done when:* we can see last week's visits and how many people started vs finished a booking.

### 3. Add social proof that's true

- [ ] One real quote, e.g. from the operations manager we built it with, without naming the company unless they
      agree.
- [ ] Or a true number from our own testing (e.g. taps to finish a clean), labelled as such.

*Done when:* the home page has one piece of proof we'd be happy for a buyer to check.

### 4. Test what hasn't been tested

- [x] Automated run on the live site (2026-10-28): Chrome, Safari and Firefox on desktop, plus iPhone and Android
      phone emulation. Pages, no sideways scrolling, Build yours (click, tap, drag), workspace phone view and a
      full booking all pass.
- [ ] Drag-and-drop on a real phone and tablet (emulation passed; tap-to-add and the arrow buttons are the touch
      fallback).
- [ ] The fallback booking email opening in Apple Mail, Outlook and Gmail (only used if the database is down).

*Done when:* each of these has been tried once and anything broken is fixed.

### 5. Before promoting it

- [ ] **Privacy policy + terms** pages, linked in the footer: the forms collect names, work emails and phone numbers.
      **You:** approve the text.
- [ ] **Confirmation email to the visitor** after booking (time in their zone + a calendar file). Needs Resend with
      ophlow.com verified (a few GoDaddy records); one verification covers the restaurant site too.
- [x] **Share image + page descriptions**, so links look right in texts, Slack and LinkedIn.
- [ ] Rate limit per IP on `/api/book` and `/api/onboarding` (Vercel Firewall rule), only if spam gets past the
      hidden spam-trap field.

### 6. Later: the bigger pieces

Same plan as the restaurant site's roadmap (Steps 4, 7 and 8 there), done once and reused:

- [ ] **Team calendars:** Google Calendar free/busy hides times the team is busy; booking sends a real invite with a
      Meet link.
- [ ] **Take payment:** "Get started" → Stripe Checkout → back to `/workspace`; a billing link for customers.
- [ ] **File uploads → real workspace:** the setup form takes checklists and schedules (Supabase Storage); at
      sign-up each community gets its own empty copy of the product, and `/workspace` links into it.

### 7. Move the site into the Ophlow GitHub organization — *done*: now `Ophlow-com/Ophlow-landing-page`

The site lives in `Ash-Uchida/Ophlow`, a personal account. Moving it into the existing Ophlow organization means
the company owns the code, teammates can be added in one place, and it sits next to the Living-Assistance product
repo.

**Recommended: transfer the repo.** In `Ash-Uchida/Ophlow` → Settings → Danger Zone → **Transfer** → the Ophlow
organization (rename it at the same time if wanted, e.g. `website`). This keeps commits, pull requests #1–#10, Actions
history and the Pages settings, and old links redirect automatically.

**Alternative: a new repo in the organization**, with the code and every branch pushed to it. Pull requests and
Actions history stay behind on the old repo, and old links don't redirect. Only one repo can own ophlow.com, so
the order matters (the site can be down for a few minutes between steps 3 and 5):

1. Create the empty repo in the organization.
2. Push the code and all branches to it.
3. Old repo: Settings → Pages, remove the custom domain (or turn Pages off), then archive the repo.
4. New repo: Settings → Pages → Source **GitHub Actions**, custom domain `ophlow.com`.
5. Merge anything to `main` to deploy, then check ophlow.com loads.

Either way, afterwards:

- [x] Point the local folder at the new repo (`git remote set-url origin …`).
- [x] Check Settings → Pages still shows `ophlow.com` with HTTPS, and re-save the domain if it warns.
- [x] ~~Merge one small change and check it deploys.~~ Replaced by the Vercel move (section 1).
- [ ] Rename the local folder to match the repo (it's `landing-page-living-assistance` today).
- [x] Move Living-Assistance into the organization the same way.

*Done when:* ophlow.com deploys from the organization's repo and nothing points at `Ash-Uchida/Ophlow` any more.

### 8. Housekeeping

- [ ] Archive the old "landing page living-assistance" chat, which still points to the old folder
      (`Landing-page-ophlow`).
- [ ] Use a fresh branch per change instead of reusing `codex/landing-rewrite`.
