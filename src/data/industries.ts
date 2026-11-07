import automotive from "@/assets/automotive.jpg";
import companyLine from "@/assets/company-line.jpg";
import medical from "@/assets/medical.jpg";
import cuttingTools from "@/assets/cutting-tools.jpg";
import defence from "@/assets/defence.jpg";
import aerospace from "@/assets/aerospace.jpg";
import heatTreatment from "@/assets/heat-treatment.jpg";
import renewable from "@/assets/renewable.jpg";

export type Industry = {
  sector: string; // "01"
  slug: string;
  name: string;
  description: string;
  // Focus areas / applications described in the reference material.
  focus: string[];
  // Short "key metric" labels shown in the reference (descriptive, not measured claims).
  metrics: [string, string];
  image: string;
};

// Content sourced from the Industries reference PDF. Focus areas preserve the
// source's intended meaning. "Key metric" labels are descriptive positioning
// taken from the reference, not independently measured performance claims.
export const industries: Industry[] = [
  {
    sector: "01",
    slug: "automotive-e-mobility",
    name: "Automotive & E-Mobility",
    description:
      "Precision cleaning solutions for battery components, powertrains, and critical EV systems — ensuring reliability and safety across next-generation mobility.",
    focus: [
      "Battery component & pack cleaning",
      "Powertrain & transmission parts",
      "Critical EV system components",
    ],
    metrics: ["VDA 19 Compliant", "Battery Pack Safe"],
    image: automotive,
  },
  {
    sector: "02",
    slug: "engineering",
    name: "Engineering Industry",
    description:
      "Versatile cleaning systems for machined parts, hydraulic components, and precision gears, built for high-throughput engineering environments.",
    focus: [
      "Machined & turned parts",
      "Hydraulic components",
      "Precision gears & assemblies",
    ],
    metrics: ["Rust Protection", "High Throughput"],
    image: companyLine,
  },
  {
    sector: "03",
    slug: "medical",
    name: "Medical Industry",
    description:
      "Implant and instrument cleaning meeting strict biocompatibility and ISO standards for the medical device sector.",
    focus: [
      "Surgical instrument cleanliness",
      "Implant preparation",
      "Biocompatibility-driven processes",
    ],
    metrics: ["ISO 13485 Ready", "Bio-Burden Control"],
    image: medical,
  },
  {
    sector: "04",
    slug: "cutting-tools",
    name: "Cutting Tools",
    description:
      "Specialized cleaning for coating preparation and final finish of drills, end mills, and inserts.",
    focus: [
      "Pre-coating surface preparation",
      "Final-finish cleaning",
      "Drills, end mills & inserts",
    ],
    metrics: ["Coating Ready", "Edge Protection"],
    image: cuttingTools,
  },
  {
    sector: "05",
    slug: "defence-ammunition",
    name: "Defence & Ammunition",
    description:
      "Robust cleaning solutions for ordnance, shell casings, and firearm components built to demanding defence standards.",
    focus: [
      "Ordnance component cleaning",
      "Shell casing processing",
      "Firearm component finishing",
    ],
    metrics: ["Mil-Spec Standard", "Explosion Proof"],
    image: defence,
  },
  {
    sector: "06",
    slug: "aerospace",
    name: "Aerospace Industry",
    description:
      "Critical component cleaning for turbine blades, fuel systems, and hydraulic actuators where cleanliness is non-negotiable.",
    focus: [
      "Turbine blade cleaning",
      "Fuel system components",
      "Hydraulic actuators",
    ],
    metrics: ["AS9100 Compatible", "FOD Free"],
    image: aerospace,
  },
  {
    sector: "07",
    slug: "heat-treatment",
    name: "Heat Treatment Industry",
    description:
      "Pre- and post-heat-treatment cleaning to remove quenching oils and scale, protecting surface integrity through thermal processing.",
    focus: [
      "Quenching oil removal",
      "Scale & residue removal",
      "Pre- & post-process cleaning",
    ],
    metrics: ["Oil Removal", "Scale Free"],
    image: heatTreatment,
  },
  {
    sector: "08",
    slug: "renewable-energy",
    name: "Renewable Energy",
    description:
      "Large-scale cleaning for solar and wind power components, supporting the reliability of clean-energy manufacturing.",
    focus: [
      "Solar wafer & cell cleaning",
      "Wind-turbine gearbox MRO",
      "Large-scale component handling",
    ],
    metrics: ["Solar Wafer Clean", "Gearbox MRO"],
    image: renewable,
  },
];

export function findIndustry(slug: string) {
  return industries.find((i) => i.slug === slug) ?? null;
}
