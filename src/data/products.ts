import companyLine from "@/assets/company-line.jpg";
import cuttingTools from "@/assets/cutting-tools.jpg";
import aerospace from "@/assets/aerospace.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
};

export type ProductCategory = {
  id: string; // e.g. "01"
  slug: string;
  title: string;
  summary: string;
  image: string;
  products: Product[];
};

// Product descriptions are sourced directly from the Our Products reference PDF.
// No technical specifications are invented — detail pages clearly flag where
// verified specifications are still required.
export const productCategories: ProductCategory[] = [
  {
    id: "01",
    slug: "aqueous-based-cleaning-systems",
    title: "Aqueous-Based Cleaning Systems",
    summary:
      "Advanced water-based cleaning technology engineered for reliability, versatility, and environmental compliance.",
    image: companyLine,
    products: [
      {
        slug: "aquawash-series",
        name: "AquaWash Series",
        tagline: "Single-tank, multi-process precision cleaning.",
        description:
          "Single tank multi-process cleaning systems designed for versatility and high-precision cleaning.",
        highlights: [
          "Single-tank, multi-process architecture",
          "Engineered for high-precision cleanliness",
          "Versatile across diverse part geometries",
        ],
        image: companyLine,
      },
      {
        slug: "powerclean-series",
        name: "PowerClean Series",
        tagline: "Built for complex geometries & heavy contamination.",
        description:
          "Industrial cleaning machines engineered for complex geometries and high contamination levels.",
        highlights: [
          "Handles complex, intricate geometries",
          "Designed for high contamination levels",
          "Robust industrial-duty construction",
        ],
        image: companyLine,
      },
      {
        slug: "multiline-series",
        name: "MultiLine Series",
        tagline: "Continuous-flow cleaning for flat-geometry parts.",
        description:
          "Continuous flow cleaning systems optimized for simple flat geometry parts with high productivity demands.",
        highlights: [
          "Continuous-flow process design",
          "Optimized for simple, flat geometries",
          "High-productivity throughput",
        ],
        image: companyLine,
      },
      {
        slug: "tunnelwash-series",
        name: "TunnelWash Series",
        tagline: "High-volume conveyor cleaning for continuous lines.",
        description:
          "High-volume conveyor-based cleaning systems for continuous manufacturing processes.",
        highlights: [
          "Conveyor-based, high-volume cleaning",
          "Integrates into continuous manufacturing",
          "Consistent, repeatable results at scale",
        ],
        image: companyLine,
      },
    ],
  },
  {
    id: "02",
    slug: "solvent-based-cleaning-systems",
    title: "Solvent-Based Cleaning Systems",
    summary:
      "Precision solvent and hybrid technology for the most demanding contamination and sensitive-component challenges.",
    image: cuttingTools,
    products: [
      {
        slug: "solvacs",
        name: "SOLVACS",
        tagline: "Vacuum-assisted solvent cleaning.",
        description:
          "Vacuum Assisted Solvent Systems for removing contaminants from hard-to-reach areas without harming sensitive components.",
        highlights: [
          "Vacuum-assisted solvent process",
          "Reaches blind holes & complex cavities",
          "Gentle on sensitive components",
        ],
        image: cuttingTools,
      },
      {
        slug: "vaiocs",
        name: "VAIOCS",
        tagline: "Hybrid water + solvent cleaning.",
        description:
          "Hybrid Cleaning Systems combining water and solvent processes for specialized cleaning requirements.",
        highlights: [
          "Combined aqueous & solvent processes",
          "Tailored to specialized requirements",
          "Flexible across contamination types",
        ],
        image: cuttingTools,
      },
    ],
  },
  {
    id: "03",
    slug: "specialized-solutions",
    title: "Specialized Solutions",
    summary:
      "Purpose-built technologies for delicate, precision, and rapid component-processing applications.",
    image: aerospace,
    products: [
      {
        slug: "ultrasonic-cleaners",
        name: "Ultrasonic Cleaners",
        tagline: "Fine cleaning for delicate precision parts.",
        description:
          "Advanced ultrasonic cleaning technology for delicate and precision parts.",
        highlights: [
          "Ultrasonic cavitation cleaning",
          "Ideal for delicate precision parts",
          "Micro-level contaminant removal",
        ],
        image: aerospace,
      },
      {
        slug: "ngct-mecanofast",
        name: "NGCT – MecanoFast",
        tagline: "Rapid, efficient component processing.",
        description:
          "Specialized cleaning solutions for rapid and efficient component processing.",
        highlights: [
          "Engineered for rapid cycle times",
          "Efficient component throughput",
          "Specialized processing capability",
        ],
        image: aerospace,
      },
    ],
  },
];

export const allProducts: Product[] = productCategories.flatMap((c) => c.products);

export function findProduct(slug: string) {
  for (const c of productCategories) {
    const p = c.products.find((x) => x.slug === slug);
    if (p) return { product: p, category: c };
  }
  return null;
}
