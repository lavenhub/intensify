type LogoProps = {
  className?: string;
  /** Height in px; width scales with the aspect ratio. */
  height?: number;
  title?: string;
};

/**
 * Faithful vector reproduction of the Intensify Technologies brand mark:
 * a skewed yellow banner carrying the "Intensify / Technology" wordmark.
 *
 * NOTE: Derived from the logo shown in the reference material. A high-resolution
 * official vector logo should be supplied by the company to replace this.
 */
export function Logo({ className, height = 40, title = "Intensify Technologies" }: LogoProps) {
  const ratio = 224 / 92;
  return (
    <svg
      className={className}
      width={height * ratio}
      height={height}
      viewBox="0 0 224 92"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* skewed banner */}
      <path d="M4 20 L219 8 L214 84 L9 78 Z" fill="#FFD000" />
      <path
        d="M4 20 L219 8 L214 84 L9 78 Z"
        stroke="#0A0A0A"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
      <text
        x="22"
        y="58"
        fontFamily='"Manrope Variable", Manrope, sans-serif'
        fontSize="40"
        fontWeight="800"
        letterSpacing="-1.5"
        fill="#0A0A0A"
      >
        Intensify
      </text>
      <text
        x="132"
        y="76"
        fontFamily='"Manrope Variable", Manrope, sans-serif'
        fontSize="14.5"
        fontWeight="700"
        letterSpacing="0.5"
        fill="#0A0A0A"
      >
        Technology
      </text>
    </svg>
  );
}
