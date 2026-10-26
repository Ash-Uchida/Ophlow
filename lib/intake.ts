/**
 * What a new community tells us so we can set them up. Each part maps to the product: buildings and rooms,
 * departments and their routines, who signs in and what job they do. Never resident names, health info or passwords.
 */

import { FEATURES } from "./features";

export type MemberRow = { name: string; email: string; role: string };

export type Intake = {
  // Your community
  community: string;
  contactName: string;
  email: string;
  phone: string;
  role: string;
  timeZone: string;
  buildingCount: string;
  buildings: string;
  careTypes: string[];
  // How you work today
  current: string;
  tools: string[];
  toolsOther: string;
  pains: string;
  // Rooms & buildings
  roomCount: string;
  roomNumbers: string;
  commonAreas: string;
  // Departments
  departments: string[];
  housekeepers: string;
  cleanSchedule: string;
  mealsPerDay: string;
  menuSource: string;
  repairTracking: string;
  // Team
  members: MemberRow[];
  signIn: string;
  // Make it yours
  modules: string[];
  wishes: string;
  goLive: string;
  notes: string;
};

export const CONTACT_ROLES = ["Executive director", "Operations / admin", "Department head", "Owner / investor", "Something else"];

export const CARE_TYPES = ["Independent living", "Assisted living", "Memory care", "Skilled nursing", "Something else"];

export const CURRENT_OPTIONS = [
  { value: "paper", label: "Paper and clipboards", note: "Binders, sticky notes, whiteboards" },
  { value: "texts", label: "Group texts and calls", note: "Work happens in the chat" },
  { value: "spreadsheets", label: "Spreadsheets", note: "Excel, Google Sheets" },
  { value: "software", label: "Software that isn't working", note: "Glitchy, unused, or doesn't report" },
];

/** Systems we work alongside, not replace. Named by what they do. */
export const TOOLS = [
  "EHR / clinical records",
  "Reporting dashboard (e.g. Power BI)",
  "Scheduling / time & attendance",
  "Payroll",
  "Menu planning software",
  "Food distributor ordering",
  "Google Sheets / Excel",
];

export const DEPARTMENTS = ["Housekeeping", "Dining / kitchen", "Maintenance", "Activities", "Nurse station / front desk"];

export const MENU_SOURCES = ["Paper menu from the kitchen", "Menu planning software", "We type it each week", "Not sure"];

export const ROLES = ["Operations manager", "Department head", "Housekeeper", "Kitchen", "Maintenance", "Nurse station", "Activities"];

export const MODULES = FEATURES.map((f) => f.name);

export const emptyIntake = (timeZone = "America/Denver"): Intake => ({
  community: "",
  contactName: "",
  email: "",
  phone: "",
  role: CONTACT_ROLES[0],
  timeZone,
  buildingCount: "1",
  buildings: "",
  careTypes: ["Assisted living"],
  current: "paper",
  tools: [],
  toolsOther: "",
  pains: "",
  roomCount: "50–100",
  roomNumbers: "",
  commonAreas: "",
  departments: ["Housekeeping", "Dining / kitchen", "Maintenance"],
  housekeepers: "",
  cleanSchedule: "",
  mealsPerDay: "3",
  menuSource: "Paper menu from the kitchen",
  repairTracking: "",
  members: [{ name: "", email: "", role: "Department head" }],
  signIn: "Work emails",
  modules: ["Rooms", "Housekeeping", "Meal orders & kitchen", "Maintenance", "Today dashboard"],
  wishes: "",
  goLive: "",
  notes: "",
});

const list = (xs: string[]) => xs.join(", ");

/** Grouped label/value rows for the email to us (and the copy-able text). */
export function intakeGroups(i: Intake): { heading: string; rows: [string, string][] }[] {
  const currentLabel = CURRENT_OPTIONS.find((o) => o.value === i.current)?.label ?? i.current;
  return [
    {
      heading: "Community",
      rows: [
        ["Community", i.community],
        ["Contact", `${i.contactName}${i.role ? ` (${i.role})` : ""}`],
        ["Email", i.email],
        ["Phone", i.phone],
        ["Time zone", i.timeZone],
        ["Buildings", `${i.buildingCount}${i.buildings ? ` — ${i.buildings.replace(/\n+/g, "; ")}` : ""}`],
        ["Care types", list(i.careTypes)],
      ],
    },
    {
      heading: "How they work today",
      rows: [
        ["Runs the floor with", currentLabel],
        ["Other systems", list([...i.tools, ...(i.toolsOther ? [i.toolsOther] : [])])],
        ["Biggest headaches", i.pains],
      ],
    },
    {
      heading: "Rooms & buildings",
      rows: [
        ["Rooms (approx.)", i.roomCount],
        ["Room numbers", i.roomNumbers],
        ["Common areas", i.commonAreas],
      ],
    },
    {
      heading: "Departments",
      rows: [
        ["On the floor", list(i.departments)],
        ["Housekeepers", i.housekeepers],
        ["Clean schedule", i.cleanSchedule],
        ["Meals a day", i.mealsPerDay],
        ["Menus come from", i.menuSource],
        ["Repairs tracked by", i.repairTracking],
      ],
    },
    {
      heading: "Team",
      rows: [
        ...i.members.filter((m) => m.name.trim() || m.email.trim()).map((m) => [m.role, `${m.name} <${m.email}>`] as [string, string]),
        ["Staff sign in with", i.signIn],
      ],
    },
    {
      heading: "Make it yours",
      rows: [
        ["Features", list(i.modules)],
        ["Wishes", i.wishes],
        ["Go-live", i.goLive],
        ["Anything else", i.notes],
      ],
    },
  ];
}

export function intakeText(i: Intake) {
  return [`Setup for ${i.community}`, ""]
    .concat(intakeGroups(i).flatMap((g) => [`== ${g.heading}`, ...g.rows.map(([k, v]) => `${k}: ${v || "—"}`), ""]))
    .join("\n");
}
