import { Bell, BrushCleaning, CalendarDays, ChartLine, DoorOpen, House, ListChecks, Users, Utensils, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** The product's sidebar, as an operations manager sees it. Used by the blank workspace. */
export type AppSection = "setup" | "today" | "rooms" | "housekeeping" | "dining" | "maintenance" | "calendar" | "alerts" | "pulse" | "team";

export const APP_NAV: { id: AppSection; label: string; icon: LucideIcon }[] = [
  { id: "setup", label: "Get set up", icon: ListChecks },
  { id: "today", label: "Today", icon: House },
  { id: "rooms", label: "Rooms", icon: DoorOpen },
  { id: "housekeeping", label: "Housekeeping", icon: BrushCleaning },
  { id: "dining", label: "Dining", icon: Utensils },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "calendar", label: "Activities", icon: CalendarDays },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "pulse", label: "Weekly pulse", icon: ChartLine },
  { id: "team", label: "Team & access", icon: Users },
];

/** What each empty screen will hold, and which setup step fills it. */
export const EMPTY: Record<Exclude<AppSection, "setup">, { title: string; body: string; step: number }> = {
  today: { title: "Nothing to do yet", body: "Once you're set up, every department's day shows up here: rooms to turn, cleans running late, repairs waiting.", step: 0 },
  rooms: { title: "No rooms yet", body: "We add each building's rooms by number. Check-ins and check-outs land here, and a move-out creates a deep clean.", step: 2 },
  housekeeping: { title: "No cleans scheduled", body: "Routine cleans repeat from each room's schedule; housekeepers start, tick and finish them on their phone.", step: 3 },
  dining: { title: "No meal orders yet", body: "Nurse stations order by room and the kitchen sees the queue live. Snap the paper menu and the week fills in.", step: 3 },
  maintenance: { title: "No repair requests", body: "Anyone can send a request with photos. Urgent ones buzz the crew's phones and it's tracked to done.", step: 3 },
  calendar: { title: "No activities yet", body: "One shared calendar for every building, with attendance by head count.", step: 3 },
  alerts: { title: "All quiet", body: "The right people get told — on their phone if it can't wait.", step: 4 },
  pulse: { title: "No data yet", body: "After your first week you'll see where work gets stuck, against your targets.", step: 1 },
  team: { title: "Just you, for now", body: "Add department heads and floor staff. Each job only opens its own screens.", step: 4 },
};

/** Which sidebar screen each feature from the home page's builder lives on. */
const FEATURE_SECTION: Record<string, Exclude<AppSection, "setup">> = {
  rooms: "rooms",
  "stay-history": "rooms",
  housekeeping: "housekeeping",
  orders: "dining",
  menus: "dining",
  "kitchen-logs": "dining",
  feedback: "dining",
  maintenance: "maintenance",
  calendar: "calendar",
  today: "today",
  pulse: "pulse",
  alerts: "alerts",
  access: "team",
  phone: "team",
};

/** The sidebar for a workspace built from picked features: setup, then only the screens those features need. */
export function navFor(featureIds: string[]) {
  const wanted = new Set(featureIds.map((id) => FEATURE_SECTION[id]));
  return APP_NAV.filter((n) => n.id === "setup" || wanted.has(n.id as Exclude<AppSection, "setup">));
}
