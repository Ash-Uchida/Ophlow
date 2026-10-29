import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy policy — ${SITE.name}`,
  description: "What this website collects when you book a demo or fill in the setup form, where it's kept and how to have it deleted.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="October 28, 2026"
      intro={`This policy covers this website: booking a demo, the "Get started" setup form and the "Build yours" feature builder. The Ophlow product your staff use has its own terms, agreed when you sign up. Questions: ${SITE.email}.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "Only what you type into a form:",
            [
              "Booking a demo: your name, work email, phone number (optional), community or company, role, number of buildings, how your floor runs today, the features you picked, any notes, and the time and time zone you chose.",
              "The setup form: your answers, including the names, emails and jobs of teammates you list, so we can create their logins.",
            ],
            "Please don't enter resident names or health information. The forms don't ask for them, and the product is built to work with room numbers only.",
          ],
        },
        {
          heading: "What stays in your browser",
          body: [
            "Your unfinished setup form and your Build yours picks are saved in your own browser, so you can come back to them. They stay on your device until you send the form or clear your browser's site data.",
          ],
        },
        {
          heading: "Visit statistics",
          body: [
            "We count page visits and a few steps (picking a demo time, booking it, sending the setup form) with Vercel Web Analytics. It uses no cookies and doesn't identify you; we only see totals.",
          ],
        },
        {
          heading: "Where it's kept",
          body: [
            [
              "Form answers are stored in a private database at Supabase, in the United States.",
              "The website runs on Vercel, in the United States.",
              "If email alerts are on, a copy of each booking or setup form is emailed to our team through Resend.",
            ],
            "These companies process the data for us only to run the website.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To schedule and run your demo, set up your account, and reply to you. We don't sell your information, use it for advertising, or share it with anyone except the services above.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "As long as we're talking with you about Ophlow. If it doesn't go ahead, we delete it within a year. You can ask us to delete it sooner at any time.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `Email ${SITE.email} to see what we have about you, correct it, or have it deleted. We'll do it within 30 days.`,
          ],
        },
        {
          heading: "Changes",
          body: ["If this policy changes, we'll update it here and change the date at the top."],
        },
      ]}
    />
  );
}
