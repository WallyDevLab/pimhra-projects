"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type EventName } from "@/lib/analytics";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  event?: EventName;
  place?: string;
};

/** Anchor that records an analytics event. Uses next/link for internal paths. */
export default function TrackedLink({ href, event, place, onClick, children, ...rest }: Props) {
  const handle: ComponentProps<"a">["onClick"] = (e) => {
    if (event) trackEvent(event, place ? { place } : undefined);
    onClick?.(e);
  };
  const internal = href.startsWith("/") && !href.startsWith("//");
  if (internal) {
    return (
      <Link href={href} onClick={handle} {...rest}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={handle}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
