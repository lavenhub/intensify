import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { IndustryRow } from "@/components/IndustryRow";
import { CTASection } from "@/components/CTASection";
import { industries } from "@/data/industries";
import heroImg from "@/assets/automotive.jpg";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries Served"
        description="Specialised technical-cleanliness expertise across automotive & e-mobility, engineering, medical, cutting tools, defence, aerospace, heat treatment, and renewable energy."
        path="/industries"
      />

      <PageHero
        eyebrow="Industries"
        title="Industries Served"
        intro="We bring specialised technical cleanliness expertise to diverse sectors, adapting our core technologies to meet unique industry challenges."
        image={heroImg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      <section className="overflow-hidden bg-white py-24 lg:py-32">
        <div className="container-px space-y-24 lg:space-y-32">
          {industries.map((ind, i) => (
            <div key={ind.slug} id={ind.slug} className="scroll-mt-28">
              <IndustryRow industry={ind} index={i} />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Don't See Your Sector?"
        text="Our technologies adapt to almost any precision-cleaning challenge. Tell us about your parts and we'll engineer a solution."
        primary={{ label: "Talk to an Engineer", to: "/contact" }}
        secondary={{ label: "Explore Products", to: "/products" }}
      />
    </>
  );
}
