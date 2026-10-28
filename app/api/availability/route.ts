import { leadsConnected, takenSlots } from "@/lib/server/leads";
import { AVAILABILITY } from "@/lib/site";
import { openSlots } from "@/lib/slots";

export const dynamic = "force-dynamic";

/** Open demo slots: our hours (lib/site.ts) minus demos already booked. Only times leave the server. */
export async function GET() {
  const now = Date.now();
  let busy: Awaited<ReturnType<typeof takenSlots>> = [];
  if (leadsConnected()) {
    try {
      busy = await takenSlots(new Date(now).toISOString(), new Date(now + (AVAILABILITY.daysAhead + 2) * 86_400_000).toISOString(), AVAILABILITY.slotMinutes);
    } catch (error) {
      // Better to show our hours than no calendar at all; booking re-checks the slot anyway.
      console.error("reading booked demos failed", error);
    }
  }
  return Response.json({ slots: openSlots(busy, now) });
}
