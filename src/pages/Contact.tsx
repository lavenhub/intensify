import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import heroImg from "@/assets/boardroom.jpg";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with the Intensify Technologies engineering team for a consultation or quote. Based in Pune, India, serving industries worldwide."
        path="/contact"
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        intro="Ready to start your next project? Get in touch with our engineering team for a consultation or a quote."
        image={heroImg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">Headquarters</h2>
              <ul className="mt-8 space-y-7">
                <ContactItem icon={MapPin} label="Office Location">
                  {site.contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </ContactItem>
                <ContactItem icon={Phone} label="Phone">
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="transition-colors hover:text-yellow-dark"
                  >
                    {site.contact.phone}
                  </a>
                  <span className="mt-1 block text-sm text-muted">{site.contact.hours}</span>
                </ContactItem>
                <ContactItem icon={Mail} label="Email">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all transition-colors hover:text-yellow-dark"
                  >
                    {site.contact.email}
                  </a>
                </ContactItem>
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <div className="border-l-4 border-yellow bg-yellow/10 p-6">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <Clock className="h-5 w-5 text-yellow-dark" aria-hidden />
                  Global Support
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Support availability for enterprise partners is being finalised. For
                  urgent enquiries, please email or call us directly and we'll route you
                  to the right team.
                </p>
                <p className="mt-2 text-xs italic text-muted">
                  (Support-hours details pending confirmation.)
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border-2 border-ink p-7 shadow-offset sm:p-9">
                <h2 className="text-2xl sm:text-3xl">Send Us a Message</h2>
                <p className="mt-2 text-muted">
                  Tell us about your parts, contamination challenge, and cleanliness
                  target — we usually respond within one business day.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map — address verified against the reference Contact PDF */}
      <section className="bg-offwhite pb-20 lg:pb-28">
        <div className="container-px">
          <Reveal>
            <div className="overflow-hidden border-2 border-ink">
              <iframe
                title="Intensify Technologies location — New Sangavi, Pune"
                src="https://www.google.com/maps?q=New%20Sangavi%2C%20Pune%2C%20411027%2C%20India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full grayscale"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Map shows the New Sangavi, Pune (411027) area. Precise building pin pending
              confirmation.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-yellow">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          {label}
        </div>
        <div className="mt-1.5 text-lg font-medium text-ink">{children}</div>
      </div>
    </li>
  );
}
