export const SITE = {
  name: "Ophlow",
  tagline: "Operations software, built on the floor.",
  description:
    "Ophlow helps companies organize day-to-day operations with simple software for tasks, checklists, requests and shift handoffs. Our first product is built for senior living, with applications across hotels, restaurants and other industries.",
  email: "ophlow@gmail.com",
};

export const NAV = [
  { href: "/#product", label: "Product" },
  { href: "/#build", label: "Build yours" },
  { href: "/#how", label: "How we work" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
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
