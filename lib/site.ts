export const SITE = {
  name: "Ophlow",
  tagline: "Cleaning and repairs for Airbnb and VRBO owners.",
  description:
    "Ophlow is the management company for owners with one rental or a few. We send a cleaner after every checkout and a handyman when something breaks, and you see the photos and the costs.",
  email: "ophlow@gmail.com",
};

export const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#dashboard", label: "What you see" },
  { href: "/#faq", label: "FAQ" },
  // Hidden while the blog posts are about senior living: { href: "/blog", label: "Blog" },
];

/**
 * When we take demos. Times are wall-clock in the team's time zone; the booking page shows them in the
 * visitor's. The site is static, so there's no calendar check: the booking email is how a slot gets confirmed.
 */
export const AVAILABILITY = {
  timeZone: "America/Denver",
  /** 0 = Sunday. Several windows a day are fine. */
  hours: {
    1: [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "17:00" }],
    2: [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "17:00" }],
    3: [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "17:00" }],
    4: [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "17:00" }],
    5: [{ start: "09:00", end: "12:00" }],
  } as Record<number, { start: string; end: string }[]>,
  slotMinutes: 20,
  /** No booking sooner than this from now. */
  minNoticeHours: 12,
  daysAhead: 21,
};
