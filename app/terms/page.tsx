import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of use — ${SITE.name}`,
  description: "The terms for using this website, booking a demo and sending the setup form.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="October 28, 2026"
      intro={`These terms cover using this website. Using the Ophlow product itself is covered by a separate agreement when you sign up. Questions: ${SITE.email}.`}
      sections={[
        {
          heading: "Demos and the setup form",
          body: [
            "Booking a demo or sending the setup form doesn't commit you to anything, and it doesn't create an account or a charge. Pricing is agreed with you directly before you start.",
            "If a booked time no longer works for us, we'll contact you to find another one.",
          ],
        },
        {
          heading: "What you send us",
          body: [
            "Please only send information you're allowed to share, and no resident names or health information. You keep ownership of everything you send; we use it only as our privacy policy describes.",
          ],
        },
        {
          heading: "The website's content",
          body: [
            "The product tour, Build yours and the example screens show how Ophlow works; the numbers in them are examples, not real data. Features can change as we build them with the teams who use them.",
            "The site is provided as it is. We work to keep it accurate and available, but can't promise it will always be either.",
          ],
        },
        {
          heading: "Fair use",
          body: ["Please don't misuse the site: no automated form submissions, attempts to break in, or copying it to pass off as your own."],
        },
        {
          heading: "Changes",
          body: ["If these terms change, we'll update them here and change the date at the top."],
        },
      ]}
    />
  );
}
