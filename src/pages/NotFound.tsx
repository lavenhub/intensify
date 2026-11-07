import { Seo } from "@/components/Seo";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="flex min-h-[80svh] items-center bg-ink text-white">
        <div className="container-px text-center">
          <div className="font-display text-[7rem] font-extrabold leading-none text-yellow sm:text-[10rem]">
            404
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl">This page couldn't be found.</h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            The page you're looking for may have moved or no longer exists. Let's get you
            back on track.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink to="/" variant="primary" arrow>
              Back to Home
            </ButtonLink>
            <ButtonLink to="/contact" variant="ghost-light">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
