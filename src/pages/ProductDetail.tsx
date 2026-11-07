import { useParams, Link, Navigate } from "react-router-dom";
import { Check, ArrowRight, FileText } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { findProduct } from "@/data/products";

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const found = findProduct(slug);

  if (!found) return <Navigate to="/products" replace />;
  const { product, category } = found;
  const related = category.products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <Seo
        title={product.name}
        description={`${product.name} — ${product.description}`}
        path={`/products/${product.slug}`}
      />

      <PageHero
        eyebrow={category.title}
        title={product.name}
        intro={product.tagline}
        image={product.image}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: product.name },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-ink">
                <span className="h-2 w-2 bg-yellow" aria-hidden /> Overview
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl">About the {product.name}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {product.description}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="text-xl font-bold">Key Highlights</h3>
              <ul className="mt-5 space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-yellow text-ink">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-ink/80">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Specifications placeholder — honestly flagged */}
            <Reveal className="mt-10">
              <div className="border-2 border-dashed border-light-grey bg-offwhite p-6">
                <div className="flex items-center gap-2 text-ink">
                  <FileText className="h-5 w-5 text-yellow-dark" aria-hidden />
                  <h3 className="text-lg font-bold">Technical Specifications</h3>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Detailed specifications (tank capacity, cycle times, footprint, power,
                  and cleanliness performance) are configured per application.
                  <span className="font-semibold text-ink">
                    {" "}
                    Verified specification sheets will be provided here once supplied by
                    Intensify Technologies.
                  </span>{" "}
                  Contact us for the datasheet relevant to your parts.
                </p>
                <ButtonLink to="/contact" variant="dark" arrow className="mt-5">
                  Request Datasheet
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden border-2 border-ink shadow-offset-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/3] w-full object-cover grayscale"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 bg-ink p-6 text-white">
                <h3 className="text-lg font-bold">Enquire about the {product.name}</h3>
                <p className="mt-2 text-sm text-white/70">
                  Our engineers will help you validate the right configuration for your
                  cleanliness targets.
                </p>
                <ButtonLink to="/contact" variant="primary" arrow className="mt-5 w-full">
                  Get a Quote
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-offwhite py-20 lg:py-24">
          <div className="container-px">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl">More in {category.title}</h2>
              <Link to="/products" className="link-underline text-sm font-bold">
                All products
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
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
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
