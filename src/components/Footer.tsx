import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { site, primaryNav } from "@/data/site";
import { productCategories } from "@/data/products";
import { industries } from "@/data/industries";

const socialIcon = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
} as const;

const featuredProducts = productCategories
  .flatMap((c) => c.products)
  .slice(0, 5);

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <div className="container-px py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <span className="inline-flex bg-white px-2.5 py-1.5">
              <Logo height={34} />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {site.footerBlurb}
            </p>
            <div className="mt-6 flex gap-3">
              {site.social.map((s) => {
                const Icon = socialIcon[s.key as keyof typeof socialIcon];
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-yellow hover:bg-yellow hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title="Company">
              {primaryNav.map((n) => (
                <FooterLink key={n.to} to={n.to}>
                  {n.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Products">
              {featuredProducts.map((p) => (
                <FooterLink key={p.slug} to={`/products/${p.slug}`}>
                  {p.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Industries">
              {industries.slice(0, 6).map((i) => (
                <FooterLink key={i.slug} to={`/industries/${i.slug}`}>
                  {i.name.replace(" Industry", "")}
                </FooterLink>
              ))}
            </FooterCol>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden />
                <span>
                  {site.contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-yellow" aria-hidden />
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="transition-colors hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-yellow" aria-hidden />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-white/60 transition-colors hover:text-yellow"
      >
        {children}
      </Link>
    </li>
  );
}
