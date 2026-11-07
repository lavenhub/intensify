import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProductCategoryBlock } from "@/components/ProductCategoryBlock";
import { CTASection } from "@/components/CTASection";
import { productCategories } from "@/data/products";
import productsHero from "@/assets/cutting-tools.jpg";

export default function Products() {
  return (
    <>
      <Seo
        title="Our Products"
        description="Precision cleaning solutions engineered for excellence — aqueous, solvent-based, and specialised systems customised for your specific needs."
        path="/products"
      />

      <PageHero
        eyebrow="Our Products"
        title="Our Products"
        intro="Precision cleaning solutions engineered for excellence. From aqueous to solvent-based systems, we deliver customised technology for your specific needs."
        image={productsHero}
        crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
      />

      {productCategories.map((cat, i) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`scroll-mt-24 py-20 lg:py-28 ${i % 2 === 1 ? "bg-offwhite" : "bg-white"}`}
        >
          <div className="container-px">
            <Reveal className="mb-12 max-w-3xl">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-yellow-dark">
                Category {cat.id}
              </span>
              <h2 className="mt-2 text-4xl sm:text-5xl">{cat.title}</h2>
              <p className="mt-4 text-lg text-muted">{cat.summary}</p>
            </Reveal>
            <ProductCategoryBlock category={cat} flip={i % 2 === 1} hideSummary />
          </div>
        </section>
      ))}

      <CTASection
        heading="Need a System Built Around Your Parts?"
        text="Tell us about your geometry, contamination, and cleanliness targets — we'll engineer a solution to match."
        primary={{ label: "Request a Quote", to: "/contact" }}
        secondary={{ label: "Explore Services", to: "/services" }}
      />
    </>
  );
}
