import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { site } from "@/data/site";

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  phone: "",
  subject: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = "Please enter your full name.";
  if (!f.email.trim()) errors.email = "Please enter your email address.";
  else if (!emailRe.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (!f.message.trim()) errors.message = "Please tell us how we can help.";
  else if (f.message.trim().length < 10)
    errors.message = "Please provide a little more detail (min. 10 characters).";
  return errors;
}

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [company_website, setHoneypot] = useState(""); // honeypot (spam trap)

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // Spam trap: if the hidden field is filled, silently ignore.
    if (company_website) return;

    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("submitting");

    // Path 1: a real backend endpoint is configured.
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus("success");
        setFields(empty);
      } catch {
        setStatus("error");
      }
      return;
    }

    // Path 2: no backend configured — do NOT fake a submission.
    // Open the user's email client with the details pre-filled (a real action)
    // and tell them honestly what happened.
    const subject = encodeURIComponent(
      fields.subject || `Enquiry from ${fields.name}`
    );
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company}\nPhone: ${fields.phone}\n\n${fields.message}`
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  if (status === "success") {
    return <Result tone="success" />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          required
          value={fields.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="John Doe"
          autoComplete="name"
        />
        <Field
          label="Email Address"
          required
          type="email"
          value={fields.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="john@company.com"
          autoComplete="email"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company"
          value={fields.company}
          onChange={update("company")}
          placeholder="Company Name Ltd."
          autoComplete="organization"
        />
        <Field
          label="Phone Number"
          type="tel"
          value={fields.phone}
          onChange={update("phone")}
          placeholder="+91 00000 00000"
          autoComplete="tel"
        />
      </div>
      <Field
        label="Subject"
        value={fields.subject}
        onChange={update("subject")}
        placeholder="Parts cleaning enquiry"
      />
      <Field
        label="How can we help?"
        required
        textarea
        value={fields.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="Tell us about your parts, contamination challenge, and cleanliness target…"
      />

      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company_website}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-center gap-2 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          Something went wrong sending your message. Please email us directly at{" "}
          <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
      )}

      {status === "mailto" && (
        <p
          role="status"
          className="flex items-start gap-2 border-l-4 border-yellow bg-yellow/10 px-4 py-3 text-sm text-ink"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-dark" aria-hidden />
          <span>
            We've opened your email app with the details pre-filled — press send to
            reach us. If nothing opened, email us directly at{" "}
            <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-dark w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

function Result({ tone }: { tone: "success" }) {
  void tone;
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center bg-yellow">
        <CheckCircle2 className="h-8 w-8 text-ink" aria-hidden />
      </span>
      <h3 className="mt-6 text-2xl">Message received.</h3>
      <p className="mt-3 max-w-sm text-muted">
        Thank you for reaching out. Our engineering team will respond to your
        enquiry within one business day.
      </p>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  autoComplete?: string;
};

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  textarea,
  autoComplete,
}: FieldProps) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const base =
    "w-full border-2 bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-ink focus:outline-none";
  const borderColor = error ? "border-red-400" : "border-light-grey";
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-ink"
      >
        {label} {required && <span className="text-yellow-dark">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${base} ${borderColor} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${base} ${borderColor}`}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
