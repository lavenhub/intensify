// Centralized site-wide content & configuration.
// All company facts are sourced from the reference PDFs. Items marked
// `unverified` must be confirmed by the company before publication.

export const site = {
  name: "Intensify Technologies",
  shortName: "Intensify",
  tagline: "Engineering Precision. Enabling Progress.",
  description:
    "Intensify Technologies delivers advanced industrial cleaning, precision engineering, and intelligent manufacturing solutions designed to help industries achieve greater efficiency, reliability, and performance.",
  footerBlurb:
    "Pioneering the future of industrial manufacturing with precision engineering and intelligent automation solutions.",
  url: "https://www.intensify.co.in",
  contact: {
    addressLines: [
      "B-35, Kirti Nagar, Lane No. 2",
      "Krishna Chowk, New Sangavi",
      "Pune - 411027, India",
    ],
    phone: "+91 75064 04377",
    phoneHref: "+917506404377",
    email: "contact@intensify.co.in",
    hours: "Mon–Fri, 9:00 AM – 6:00 PM IST",
  },
  // Social links are placeholders — replace with verified profile URLs or remove.
  social: [
    { label: "LinkedIn", href: "#", key: "linkedin" },
    { label: "Twitter / X", href: "#", key: "twitter" },
    { label: "Facebook", href: "#", key: "facebook" },
  ],
};

// Company statistics — UNVERIFIED. The reference material is internally
// inconsistent (Home page shows "20+ years", Who We Are shows "25+ years").
// Figures below follow the dedicated Who We Are statistics band and must be
// confirmed by the company before being treated as factual.
export const stats = [
  { value: 25, suffix: "+", label: "Years Experience", unverified: true },
  { value: 1.5, suffix: "k+", label: "Projects Completed", unverified: true },
  { value: 40, suffix: "+", label: "Global Partners", unverified: true },
  { value: 12, suffix: "", label: "Patents Held", unverified: true },
];

export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string; blurb?: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
