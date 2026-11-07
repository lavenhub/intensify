import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { findIndustry, industries } from "@/data/industries";
import { productCategories } from "@/data/products";

const suggested = productCategories.flatMap((c) => c.products).slice(0, 3);

export default function IndustryDetail() {
  const { slug = "" } = useParams();
  const industry = findIndustry(slug);
  if (!industry) return <Navigate to="/industries" replace />;

  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <>
      <Seo
        title={industry.name}
        description={`${industry.name} — ${industry.description}`}
        path={`/industries/${industry.slug}`}
      />

      <PageHero
        eyebrow={`Sector ${industry.sector}`}
        title={industry.name}
        intro={industry.description}
        image={industry.image}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          { label: industry.name },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-ink">
                <span className="h-2 w-2 bg-yellow" aria-hidden /> Focus Areas
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                Where we add value in {industry.name.replace(" Industry", "")}
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {industry.focus.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.05}>
                  <div className="flex items-start gap-4 border-l-2 border-yellow bg-offwhite p-5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-ink text-yellow">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-lg font-medium text-ink">{f}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="overflow-hidden border-2 border-ink shadow-offset-sm">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="aspect-[4/3] w-full object-cover grayscale"
                  loading="lazy"
                />
              </div>
              <div className="border-2 border-ink p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Positioning
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {industry.metrics.map((m) => (
                    <span
                      key={m}
                      className="bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-yellow p-6">
                <h3 className="text-lg font-bold text-ink">
                  Cleaning solutions for {industry.name.replace(" Industry", "")}
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  Let's match the right system to your components and cleanliness targets.
                </p>
                <ButtonLink to="/contact" variant="dark" arrow className="mt-5 w-full">
                  Explore Solutions
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Suggested products */}
      <section className="bg-offwhite py-20 lg:py-24">
        <div className="container-px">
          <h2 className="text-3xl sm:text-4xl">Recommended Systems</h2>
          <p className="mt-3 max-w-2xl text-muted">
            A starting point — our engineers tailor the final configuration to your
            application.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group flex h-full flex-col border border-light-grey bg-white p-6 transition-all duration-300 hover:border-ink hover:shadow-card-hover"
                >
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{p.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Other industries */}
          <div className="mt-16 border-t border-light-grey pt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
              Other Industries
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/industries/${o.slug}`}
                  className="border-2 border-ink px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
