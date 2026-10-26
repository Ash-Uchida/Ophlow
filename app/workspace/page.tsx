import type { Metadata } from "next";
import { Workspace } from "@/components/workspace";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Your workspace — ${SITE.name}`,
  description: "Set up your community: tell us how your floor runs and we'll build Ophlow around it.",
  robots: { index: false },
};

/** "Get started": a blank copy of the product with setup as its home screen. Also the blank template for demos. */
export default function WorkspacePage() {
  return <Workspace />;
}
