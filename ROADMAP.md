# Ophlow website — roadmap

What's left to finish the public site at [ophlow.com](https://ophlow.com). The product itself has its own roadmap in
the Living-Assistance repo.

**Hosting today:** plain HTML on GitHub Pages, deployed on every merge to `main` (`.github/workflows/deploy.yml`).
There is no server, so the site can't send email or read a calendar by itself.

## Live now

| Page | What it does |
| --- | --- |
| `/` | Pitch, product tour, **Build yours** (drag-and-drop feature builder: click to add, click again to remove), FAQ. **Book a demo** and **Get started** everywhere. |
| `/book` | Demo calendar in the visitor's time zone, built from our hours in `lib/site.ts` (`AVAILABILITY`). Confirming opens a pre-filled email to ophlow@gmail.com. |
| `/workspace` | "Get started": an empty workspace with a 6-step setup form (saved in the browser). Opened from Build yours, it shows only the picked features, with a **Laptop / Phone** switch. |

No customer is named. The site says it was built with an assisted living operations team, which is true; it no
longer claims a live pilot.

## To do

### 1. Make sure bookings and setup forms reach us — *most important*

Today both open the visitor's email app. Anyone without one set up (lots of people only use Gmail in the browser)
clicks and nothing happens, and we never find out. Nothing checks our real calendar either, so two people can pick
the same slot, and a long setup form is too big for the email (they have to paste their answers in).

Options, simplest first:

- [ ] **Form service** (Web3Forms or Formspree, free tier). Works on GitHub Pages as-is; submissions land in
      ophlow@gmail.com. Sign up with ophlow@gmail.com, put the access key in `lib/site.ts`, send booking and setup
      forms there and keep the email link as the fallback. Doesn't stop double-booking.
- [ ] **Real availability**: a Google Calendar appointment schedule or Cal.com, linked or embedded from `/book`.
      Handles busy times and sends invites, but replaces (or sits inside) our own booking page.
- [ ] **Move to Vercel** and copy the restaurant site's `/api/book`, `/api/availability` and `/api/onboarding`
      routes (Resend for email, Google Calendar for availability). Most work, most complete.

*Done when:* a test booking and a test setup form from a browser with no mail app land in ophlow@gmail.com.

### 2. Know whether anyone uses it

- [ ] Add privacy-friendly analytics (Plausible or GoatCounter): visits, Build yours use, Book a demo clicks,
      booking confirmations, setup form sends.

*Done when:* we can see last week's visits and how many people started vs finished a booking.

### 3. Add social proof that's true

- [ ] One real quote, e.g. from the operations manager we built it with, without naming the company unless they
      agree.
- [ ] Or a true number from our own testing (e.g. taps to finish a clean), labelled as such.

*Done when:* the home page has one piece of proof we'd be happy for a buyer to check.

### 4. Test what hasn't been tested

- [ ] Drag-and-drop on a real phone and tablet (tap-to-add and the arrow buttons are the touch fallback).
- [ ] The booking email opening in Apple Mail, Outlook and Gmail.
- [ ] Safari and Firefox (only Chrome has been checked).

*Done when:* each of these has been tried once and anything broken is fixed.

### 5. Move the site into the Ophlow GitHub organization

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

- [ ] Point the local folder at the new repo (`git remote set-url origin …`).
- [ ] Check Settings → Pages still shows `ophlow.com` with HTTPS, and re-save the domain if it warns.
- [ ] Merge one small change and check it deploys.
- [ ] Rename the local folder to match the repo (it's `landing-page-living-assistance` today).
- [ ] Move Living-Assistance into the organization the same way.

*Done when:* ophlow.com deploys from the organization's repo and nothing points at `Ash-Uchida/Ophlow` any more.

### 6. Housekeeping

- [ ] Archive the old "landing page living-assistance" chat, which still points to the old folder
      (`Landing-page-ophlow`).
- [ ] Use a fresh branch per change instead of reusing `codex/landing-rewrite`.
