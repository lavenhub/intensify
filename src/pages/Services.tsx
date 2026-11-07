import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { services } from "@/data/services";
import heroImg from "@/assets/company-line.jpg";

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Comprehensive industrial support from design to deployment — technical cleanliness analysis, cleaning trials, custom machine build, QA, commissioning and support."
        path="/services"
      />

      <PageHero
        eyebrow="Our Services"
        title="Our Services"
        intro="Comprehensive industrial support from design to deployment. We ensure your manufacturing operations run at peak performance."
        image={heroImg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="End to End"
            title="Integrated Service Solutions"
            intro="From lab analysis to custom machine design, we provide comprehensive support for every stage of your technical cleanliness journey."
          />
        </div>

        {/* Editorial service list — alternating numbered rows */}
        <div className="container-px mt-16">
          <div className="divide-y divide-light-grey border-y border-light-grey">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.slug} as="div">
                  <div
                    id={s.slug}
                    className="group grid scroll-mt-24 items-start gap-6 py-10 transition-colors hover:bg-offwhite md:grid-cols-12 md:gap-10"
                  >
                    <div className="flex items-center gap-5 md:col-span-4">
                      <span className="font-display text-4xl font-extrabold text-light-grey transition-colors group-hover:text-yellow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-yellow transition-transform duration-300 ease-premium group-hover:-translate-y-1">
                        <Icon className="h-7 w-7" aria-hidden />
                      </span>
                      <h3 className="text-2xl leading-tight">{s.name}</h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="max-w-2xl text-lg leading-relaxed text-muted">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Elevate Your Production?"
        text="Partner with Intensify Technologies for precision-engineered solutions designed to meet your specific engineering challenges."
        primary={{ label: "Request Consultation", to: "/contact" }}
        secondary={{ label: "View Our Products", to: "/products" }}
      />
    </>
  );
}
