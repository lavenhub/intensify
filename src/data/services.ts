import type { LucideIcon } from "lucide-react";
import {
  Microscope,
  FlaskConical,
  FileCheck2,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

// Service descriptions sourced from the Our Services reference PDF.
export const services: Service[] = [
  {
    slug: "technical-cleanliness-centre",
    name: "Technical Cleanliness Centre",
    short: "ISO 16232 & VDA 19 compliant analysis lab.",
    description:
      "ISO 16232 and VDA 19 compliant lab providing gravimetric analysis, particle counting, and surface tension measurement.",
    icon: Microscope,
  },
  {
    slug: "parts-cleaning-trials",
    name: "Parts Cleaning Trials",
    short: "Validate your process before you invest.",
    description:
      "Validate your cleaning process with comprehensive trials using our aqueous and solvent-based machines before purchase.",
    icon: FlaskConical,
  },
  {
    slug: "cleanliness-evaluation",
    name: "Cleanliness Evaluation",
    short: "Detailed reporting against industry standards.",
    description:
      "Detailed cleanliness reports and analysis for your manufactured parts to ensure they meet stringent industry standards.",
    icon: FileCheck2,
  },
  {
    slug: "customized-solutions",
    name: "Customized Solutions",
    short: "End-to-end custom machine design & build.",
    description:
      "End-to-end custom machine design and build services tailored to your specific geometry and contamination challenges.",
    icon: Settings2,
  },
  {
    slug: "quality-assurance",
    name: "Quality Assurance",
    short: "Testing & validation for consistent performance.",
    description:
      "Rigorous testing and validation protocols to guarantee consistent cleaning performance and reliability.",
    icon: ShieldCheck,
  },
  {
    slug: "commissioning-support",
    name: "Commissioning & Support",
    short: "Installation, training & after-sales support.",
    description:
      "Complete installation, training, and after-sales support to ensure your cleaning systems operate at peak efficiency.",
    icon: Wrench,
  },
];
