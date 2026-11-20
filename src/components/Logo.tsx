import { site } from "@/content/site";

/** Text wordmark placeholder. Swap for the supplied light and dark logo files (public/logo-light.svg, public/logo-dark.svg). */
export default function Logo() {
  return (
    <>
      <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#222222" />
        <path d="M8 24V8h9a5 5 0 0 1 0 10h-4v6z" fill="#D4A017" />
      </svg>
      <span>{site.name}</span>
    </>
  );
}
