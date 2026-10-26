import {
  Bell,
  BrushCleaning,
  CalendarDays,
  Camera,
  ChartLine,
  DoorOpen,
  House,
  Smartphone,
  TableProperties,
  Thermometer,
  ThumbsUp,
  UserLock,
  Utensils,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * What a building can turn on, as the feature builder on the home page shows it. Same catalog as the
 * Demo-moveable "Ophlow Feature Builder" we use on calls.
 */
export type Feature = {
  id: string;
  group: (typeof FEATURE_GROUPS)[number];
  name: string;
  icon: LucideIcon;
  tone: keyof typeof TONES;
  tagline: string;
  /** Features that work best alongside this one. */
  pairs: string[];
  caps: string[];
};

export const FEATURE_GROUPS = ["Rooms & cleaning", "Dining", "Building", "Team & oversight"] as const;

/** Icon chip colours, kept inside the site's forest / rust / cream palette. */
export const TONES = {
  forest: "bg-forest-100 text-forest-800",
  rust: "bg-rust-100 text-rust-700",
  amber: "bg-amber-soft/40 text-ink-800",
  ink: "bg-ink-200 text-ink-700",
};

export const FEATURES: Feature[] = [
  {
    id: "rooms",
    group: "Rooms & cleaning",
    name: "Rooms",
    icon: DoorOpen,
    tone: "forest",
    tagline: "Check rooms in and out by room number",
    pairs: ["housekeeping", "stay-history"],
    caps: [
      "See every room on one board: occupied, needs cleaning, or vacant",
      "Check a room in with a stay start date (end date optional)",
      "Add or clear a move-out date later, e.g. a 30-day notice",
      "Check a room out, which creates a deep clean automatically",
      "Blocks check-in to a room that is occupied or still dirty",
      "Filter by building (remembered on each device)",
      "Room numbers only: no resident names or health info",
    ],
  },
  {
    id: "stay-history",
    group: "Rooms & cleaning",
    name: "Stay history",
    icon: TableProperties,
    tone: "forest",
    tagline: "Every check-in and check-out, as a spreadsheet",
    pairs: ["rooms"],
    caps: ["One list of every stay: room, building, in, out, days", "Filter by room", "Download what you see as a CSV for Excel or Power BI"],
  },
  {
    id: "housekeeping",
    group: "Rooms & cleaning",
    name: "Housekeeping",
    icon: BrushCleaning,
    tone: "amber",
    tagline: "Cleans, checklists and timers that don't glitch",
    pairs: ["rooms", "alerts"],
    caps: [
      "Routine cleans repeat weekly from each room's schedule",
      "Deep clean created automatically on move-out",
      "Housekeepers see only their cleans; the director sees everyone",
      "Start / Finish timer kept by the server (no phone resets)",
      "Finish is blocked until every checklist item is ticked",
      "Director edits the routine and deep checklists",
      "Pause part-way and hand the rest to someone else",
      "Mark “Resident refused” with a reason",
      "Assign rooms + weekdays; 7-day on-time score per housekeeper",
      "Notes and repair requests from inside a clean",
    ],
  },
  {
    id: "orders",
    group: "Dining",
    name: "Meal orders & kitchen",
    icon: Utensils,
    tone: "rust",
    tagline: "Nurse station orders by room, kitchen sees them live",
    pairs: ["menus", "alerts"],
    caps: [
      "Take an order by room: meal, today's plate or an always-available dish",
      "Special orders, dine in or to-go tray",
      "Kitchen queue updates live: New → Preparing → Ready → Complete",
      "Special orders listed first",
      "“Ready” alerts the nurse station and whoever ordered",
      "Memory care buildings are left out automatically",
    ],
  },
  {
    id: "menus",
    group: "Dining",
    name: "Menus (AI scan)",
    icon: Camera,
    tone: "rust",
    tagline: "Snap the paper menu; AI fills in the week",
    pairs: ["orders"],
    caps: [
      "Take one photo per meal sheet (breakfast, lunch…)",
      "AI reads each day into that date's plate; staff check and save",
      "Upload a PDF or type the days in instead",
      "An “Always available” list per meal (soup, sandwiches…)",
      "Take order offers today's plate automatically",
    ],
  },
  {
    id: "kitchen-logs",
    group: "Dining",
    name: "Kitchen logs",
    icon: Thermometer,
    tone: "ink",
    tagline: "Fridge temperatures and end-of-shift checklist",
    pairs: ["orders"],
    caps: [
      "Fridge and freezer temperature log per shift",
      "Out-of-range readings are flagged",
      "Logged by station and time; no silent edits",
      "End-of-shift kitchen checklist",
      "Download temperatures as CSV for inspections",
    ],
  },
  {
    id: "feedback",
    group: "Dining",
    name: "Meal feedback",
    icon: ThumbsUp,
    tone: "rust",
    tagline: "Big thumbs up / down, and which dishes people dislike",
    pairs: ["orders"],
    caps: [
      "Large thumbs-up / thumbs-down survey, easy for residents",
      "Likes and dislikes for every dish over the last 7 days",
      "Dishes with 2+ thumbs down marked “Disliked”",
      "Daily counts: dine in vs to-go, by building",
    ],
  },
  {
    id: "maintenance",
    group: "Building",
    name: "Maintenance",
    icon: Wrench,
    tone: "ink",
    tagline: "Repair requests with photos, tracked to done",
    pairs: ["alerts", "housekeeping"],
    caps: [
      "Anyone can send a request: room or common area",
      "Up to 3 photos, routine or urgent",
      "Urgent requests buzz the crew's and manager's phones",
      "Assign to a crew member",
      "Open → In progress → Waiting on parts → Complete, with notes",
      "“After” photos when it's fixed",
      "The sender is told every time it moves",
    ],
  },
  {
    id: "calendar",
    group: "Building",
    name: "Activities calendar",
    icon: CalendarDays,
    tone: "forest",
    tagline: "One shared calendar with attendance by head count",
    pairs: ["rooms"],
    caps: [
      "Day, week and month views; week strip on the phone",
      "Each department in its own colour, risks flagged",
      "Click or drag to add; drag to move or resize",
      "Every activity tied to a building",
      "Attendance: head count plus optional room taps",
      "Move-ins and move-outs show up from Rooms",
      "Download attendance as CSV",
    ],
  },
  {
    id: "today",
    group: "Team & oversight",
    name: "Today dashboard",
    icon: House,
    tone: "forest",
    tagline: "The manager's home: every department at a glance",
    pairs: ["pulse", "alerts"],
    caps: [
      "A card per department with today's numbers",
      "“Problems to solve” worked out from live data",
      "Only shows what your job can act on",
      "Send a notice to chosen jobs",
    ],
  },
  {
    id: "pulse",
    group: "Team & oversight",
    name: "Weekly pulse",
    icon: ChartLine,
    tone: "ink",
    tagline: "Where work gets stuck, against your targets",
    pairs: ["today"],
    caps: [
      "Bottlenecks vs targets: clean times, kitchen speed, repairs",
      "Stage-by-stage breakdown with a tip for each",
      "What residents are telling us (meal feedback)",
      "Filter by building",
    ],
  },
  {
    id: "alerts",
    group: "Team & oversight",
    name: "Alerts",
    icon: Bell,
    tone: "rust",
    tagline: "The right people get told, on their phone if it can't wait",
    pairs: ["phone"],
    caps: [
      "Bell with unread count on every screen",
      "Alerts go to a job (e.g. kitchen) or a person",
      "Phone push for urgent repairs, food ready, deep cleans",
      "All notes from cleans and repairs in one list",
      "Emergency button",
    ],
  },
  {
    id: "access",
    group: "Team & oversight",
    name: "Access & sign-in",
    icon: UserLock,
    tone: "ink",
    tagline: "Drag staff emails into job boxes; the job decides the screens",
    pairs: ["phone"],
    caps: [
      "Work email + password, with a 6-digit email code",
      "Only emails on the list can sign in",
      "Drag a person from New into a job box",
      "Each job opens only its screens; managers see everything",
      "Each building's data is kept separate",
      "Every access change is recorded",
    ],
  },
  {
    id: "phone",
    group: "Team & oversight",
    name: "Staff phone app",
    icon: Smartphone,
    tone: "forest",
    tagline: "Floor staff get their screens on their phone",
    pairs: ["alerts", "access"],
    caps: [
      "Installs to the home screen (no app store needed)",
      "Big tap targets and bottom tabs",
      "Shows only the screens for that person's job",
      "Turn on phone alerts",
      "Same data as the manager website, live",
    ],
  },
];

export const FEATURE_BY_ID = Object.fromEntries(FEATURES.map((f) => [f.id, f])) as Record<string, Feature>;

/** The builder's picks travel to /book and /workspace as `?features=rooms,housekeeping`. */
export const FEATURES_PARAM = "features";

export function featuresHref(path: string, ids: string[]) {
  return ids.length ? `${path}?${FEATURES_PARAM}=${ids.join(",")}` : path;
}

/** Feature ids from a URL's query string, in the order they were picked; unknown ids are dropped. */
export function featuresFromSearch(search: string): string[] {
  const raw = new URLSearchParams(search).get(FEATURES_PARAM) ?? "";
  return [...new Set(raw.split(",").filter((id) => FEATURE_BY_ID[id]))];
}

export const featureNames = (ids: string[]) => ids.map((id) => FEATURE_BY_ID[id]?.name).filter(Boolean) as string[];
