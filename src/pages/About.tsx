import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ValuePillars } from "@/components/ValuePillars";
import { AnimatedStat } from "@/components/AnimatedStat";
import { CTASection } from "@/components/CTASection";
import { stats } from "@/data/site";
import boardroom from "@/assets/boardroom.jpg";

export default function About() {
  return (
    <>
      <Seo
        title="Who We Are"
        description="Intensify Technologies is a global team of engineers and innovators redefining the boundaries of industrial manufacturing and precision cleaning."
        path="/about"
      />

      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        intro="We are a global team of engineers, innovators, and problem-solvers dedicated to redefining the boundaries of industrial manufacturing."
        image={boardroom}
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Purpose */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden border-2 border-ink shadow-offset">
              <img
                src={boardroom}
                alt="Intensify Technologies engineering and leadership team in discussion"
                className="aspect-[4/3] w-full object-cover grayscale"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our Purpose"
              title="Engineered for Global Impact"
              intro="We are not just manufacturers; we are architects of the future industrial landscape. Our mission is to empower the world's leading organisations with intelligent, precise, and sustainable technologies."
            />
            <div className="mt-8">
              <ValuePillars layout="stack" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-yellow" aria-hidden />
        <div className="container-px">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="text-3xl text-white sm:text-4xl">
              A track record built on precision.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                unverified={s.unverified}
              />
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-white/40">
            * Figures are indicative and pending final confirmation by Intensify
            Technologies before publication.
          </p>
        </div>
      </section>

      {/* Values row */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="What Drives Us"
            title="Principles That Define Our Engineering"
            intro="Every system we design and every service we deliver is grounded in three core commitments."
          />
          <div className="mt-16">
            <ValuePillars layout="row" />
          </div>
        </div>
      </section>

      <CTASection
        heading="Let's Build Something Precise."
        text="Talk to our engineering team about your technical cleanliness and precision manufacturing goals."
      />
    </>
  );
}
