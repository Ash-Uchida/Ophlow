/**
 * US time zones by the names people actually use, each with the states in it, so typing "Idaho" or "MST" finds it.
 * States split between zones (Idaho, Texas, Florida…) are listed under each.
 */
export type ZoneOption = { id: string; name: string; cities: string; states: string[]; keywords: string[]; /** Standard-time code for the quick buttons. */ short?: string };

export const US_ZONES: ZoneOption[] = [
  {
    id: "America/New_York",
    name: "Eastern Time",
    short: "EST",
    cities: "New York, Atlanta, Miami",
    states: [
      "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Indiana", "Kentucky", "Maine", "Maryland",
      "Massachusetts", "Michigan", "New Hampshire", "New Jersey", "New York", "North Carolina", "Ohio", "Pennsylvania",
      "Rhode Island", "South Carolina", "Tennessee", "Vermont", "Virginia", "West Virginia",
    ],
    keywords: ["et", "est", "edt", "eastern"],
  },
  {
    id: "America/Chicago",
    name: "Central Time",
    short: "CST",
    cities: "Chicago, Dallas, Nashville",
    states: [
      "Alabama", "Arkansas", "Florida", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Michigan",
      "Minnesota", "Mississippi", "Missouri", "Nebraska", "North Dakota", "Oklahoma", "South Dakota", "Tennessee", "Texas",
      "Wisconsin",
    ],
    keywords: ["ct", "cst", "cdt", "central"],
  },
  {
    id: "America/Denver",
    name: "Mountain Time",
    short: "MST",
    cities: "Denver, Salt Lake City, Boise",
    states: ["Colorado", "Idaho", "Kansas", "Montana", "Nebraska", "New Mexico", "North Dakota", "Oregon", "South Dakota", "Texas", "Utah", "Wyoming"],
    keywords: ["mt", "mst", "mdt", "mountain"],
  },
  {
    id: "America/Phoenix",
    name: "Arizona Time",
    short: "MST · AZ",
    cities: "Phoenix, Tucson — no daylight saving",
    states: ["Arizona"],
    keywords: ["mst", "mountain", "arizona"],
  },
  {
    id: "America/Los_Angeles",
    name: "Pacific Time",
    short: "PST",
    cities: "Los Angeles, Seattle, Las Vegas",
    states: ["California", "Idaho", "Nevada", "Oregon", "Washington"],
    keywords: ["pt", "pst", "pdt", "pacific"],
  },
  { id: "America/Anchorage", name: "Alaska Time",
    short: "AKST", cities: "Anchorage, Juneau", states: ["Alaska"], keywords: ["akt", "akst", "akdt", "alaska"] },
  { id: "Pacific/Honolulu", name: "Hawaii Time",
    short: "HST", cities: "Honolulu", states: ["Hawaii"], keywords: ["ht", "hst", "hawaii"] },
];

/** "MST", "PDT"… right now in a zone (falls back to "GMT-7" style outside the US). */
export function abbreviation(timeZone: string, at = new Date()) {
  return new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(at).find((p) => p.type === "timeZoneName")?.value ?? "";
}

export function clockIn(timeZone: string, at = new Date()) {
  return new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(at);
}

const offsetMinutes = (timeZone: string, at: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(at);
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(parts.find((p) => p.type === "timeZoneName")?.value ?? "");
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0;
};

/** A zone we didn't list (America/Boise, America/Detroit…) folded into the listed one that keeps the same clock. */
export function closestListed(timeZone: string): ZoneOption | null {
  const exact = US_ZONES.find((z) => z.id === timeZone);
  if (exact) return exact;
  const year = new Date().getFullYear();
  const jan = new Date(Date.UTC(year, 0, 15));
  const jul = new Date(Date.UTC(year, 6, 15));
  return US_ZONES.find((z) => offsetMinutes(z.id, jan) === offsetMinutes(timeZone, jan) && offsetMinutes(z.id, jul) === offsetMinutes(timeZone, jul)) ?? null;
}

/** "Europe/London" → "London"; anything outside our US list gets named by its city. */
export const cityName = (timeZone: string) => timeZone.split("/").pop()!.replace(/_/g, " ");

export function zoneLabel(timeZone: string) {
  const listed = US_ZONES.find((z) => z.id === timeZone);
  return `${listed ? listed.name : cityName(timeZone)} (${abbreviation(timeZone)})`;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** US zones matching a typed state, city, name or abbreviation; then any other zone in the world by city. */
export function searchZones(query: string): { option: ZoneOption; matched?: string }[] {
  const q = norm(query);
  if (!q) return US_ZONES.map((option) => ({ option }));
  const results: { option: ZoneOption; matched?: string }[] = [];
  for (const option of US_ZONES) {
    const state = option.states.find((s) => norm(s).startsWith(q));
    const hit =
      state ||
      option.keywords.some((k) => k.startsWith(q)) ||
      norm(option.name).includes(q) ||
      norm(option.cities).includes(q) ||
      norm(abbreviation(option.id)).startsWith(q);
    if (hit) results.push({ option, matched: state });
  }
  if (q.length >= 3 && typeof Intl.supportedValuesOf === "function") {
    const listed = new Set(US_ZONES.map((z) => z.id));
    for (const id of Intl.supportedValuesOf("timeZone")) {
      // Whole words from the start, so "mst" doesn't find Amsterdam.
      if (listed.has(id) || !norm(cityName(id)).split(" ").some((_, i, words) => words.slice(i).join(" ").startsWith(q))) continue;
      results.push({ option: { id, name: cityName(id), cities: id.split("/")[0].replace(/_/g, " "), states: [], keywords: [] } });
      if (results.length >= 12) break;
    }
  }
  return results;
}
