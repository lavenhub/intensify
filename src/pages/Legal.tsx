import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

type Props = { kind: "privacy" | "terms" };

const content = {
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    intro:
      "How Intensify Technologies collects, uses, and protects the information you share with us.",
    sections: [
      {
        h: "Information We Collect",
        p: "When you submit an enquiry, we collect the details you provide — such as your name, email address, company, phone number, and message — so we can respond to your request.",
      },
      {
        h: "How We Use Your Information",
        p: "We use your information solely to respond to enquiries, provide quotations, and communicate about our products and services. We do not sell your personal data.",
      },
      {
        h: "Data Retention & Security",
        p: "We retain enquiry information only as long as necessary to serve your request and apply reasonable safeguards to protect it.",
      },
      {
        h: "Contact",
        p: `For any privacy-related questions, email us at ${site.contact.email}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Legal",
    intro:
      "The terms governing your use of the Intensify Technologies website and its content.",
    sections: [
      {
        h: "Use of This Website",
        p: "This website is provided for informational purposes. Product descriptions and imagery are indicative; final specifications are confirmed per project.",
      },
      {
        h: "Intellectual Property",
        p: "All trademarks, logos, and content on this site are the property of Intensify Technologies unless otherwise stated and may not be reproduced without permission.",
      },
      {
        h: "No Warranty",
        p: "Content is provided “as is” without warranties of any kind. Engineering commitments are made only through signed agreements.",
      },
      {
        h: "Contact",
        p: `Questions about these terms can be sent to ${site.contact.email}.`,
      },
    ],
  },
} as const;

export default function Legal({ kind }: Props) {
  const c = content[kind];
  return (
    <>
      <Seo title={c.title} description={c.intro} path={`/${kind}`} />
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: "Home", to: "/" }, { label: c.title }]}
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="container-px max-w-3xl">
          <Reveal className="mb-10 border-l-4 border-yellow bg-offwhite p-5 text-sm text-muted">
            This is a template policy provided for completeness. It should be reviewed and
            finalised by Intensify Technologies' legal team before publication.
          </Reveal>
          <div className="space-y-10">
            {c.sections.map((s) => (
              <Reveal key={s.h}>
                <h2 className="text-2xl">{s.h}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
