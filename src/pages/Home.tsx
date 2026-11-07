import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { HeroSection } from "@/components/hero/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductCategoryBlock } from "@/components/ProductCategoryBlock";
import { IndustryCard } from "@/components/IndustryCard";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ValuePillars } from "@/components/ValuePillars";
import { CTASection } from "@/components/CTASection";
import { productCategories } from "@/data/products";
import { industries } from "@/data/industries";
import introImg from "@/assets/company-line.jpg";

export default function Home() {
  return (
    <>
      <Seo
        title="Intensify Technologies"
        description="Advanced industrial cleaning, precision engineering, and intelligent manufacturing solutions engineered around your production challenges."
        path="/"
      />

      <HeroSection />

      {/* Company introduction */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative overflow-hidden border-2 border-ink shadow-offset">
              <img
                src={introImg}
                alt="Automated precision cleaning and robotics production line"
                className="aspect-[5/4] w-full object-cover grayscale"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 right-4 bg-ink p-6 text-white sm:p-8 lg:-right-8">
              <div className="font-display text-4xl font-extrabold text-yellow sm:text-5xl">
                Two Decades
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                of precision cleaning expertise
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title={
                <>
                  Built Around Precision.
                  <br />
                  Driven by Innovation.
                </>
              }
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Intensify Technologies revolutionises the cleaning industry with
                advanced, customised machines designed to meet the exact
                cleanliness needs of precision engineering sectors.
              </p>
              <p>
                With over two decades of expertise and partnerships with German
                technology leaders, we deliver innovative, reliable, and
                eco-friendly solutions tailored for your success.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["ISO 16232", "Cleanliness standards"],
                ["Eco-Friendly", "Sustainable solutions"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-3 border-l-2 border-yellow pl-4">
                  <div>
                    <div className="font-bold text-ink">{t}</div>
                    <div className="text-sm text-muted">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink to="/about" variant="outline" arrow className="mt-8">
              More About Us
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Products overview */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-px">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our Products"
              title="Precision Cleaning Systems, Engineered to Order"
              intro="From aqueous to solvent-based systems, we deliver customised technology for your specific cleanliness challenges."
            />
            <ButtonLink to="/products" variant="outline" arrow className="shrink-0">
              All Products
            </ButtonLink>
          </div>

          <div className="mt-16 space-y-20 lg:space-y-28">
            {productCategories.map((cat, i) => (
              <ProductCategoryBlock key={cat.slug} category={cat} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="container-px">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Industries We Serve"
              title="Specialised Expertise, Across Sectors"
              intro="We adapt our core technical-cleanliness technologies to meet the unique challenges of eight demanding industries."
            />
            <ButtonLink to="/industries" variant="outline" arrow className="shrink-0">
              All Industries
            </ButtonLink>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.slug} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Our Capabilities"
            title="Integrated Service Solutions"
            intro="From lab analysis to custom machine design, we provide comprehensive support for your technical cleanliness needs."
          />
          <div className="mt-16">
            <ServicesGrid />
          </div>
          <Reveal className="mt-12 text-center">
            <ButtonLink to="/services" variant="dark" arrow>
              Explore Our Services
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Why Intensify */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                eyebrow="Why Intensify"
                title={
                  <>
                    Engineered for
                    <br />
                    Global Impact
                  </>
                }
                intro="We are not just manufacturers — we are architects of the future industrial landscape, empowering the world's leading organisations with intelligent, precise, and sustainable technology."
              />
              <ul className="mt-8 space-y-3">
                {[
                  "German-engineered technology partnerships",
                  "ISO 16232 & VDA 19 aligned processes",
                  "Eco-friendly, sustainable system design",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-yellow" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <ValuePillars tone="dark" layout="stack" />
              <Reveal className="mt-10">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 font-bold text-yellow"
                >
                  Discover our purpose
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
