"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import TrackedLink from "./TrackedLink";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  return (
    <header className="header">
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Pimhra Projects home"><Logo /></Link>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path.startsWith(l.href) ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <TrackedLink href="/contact" className="btn btn-primary" event="quote_cta_tap" place="header">Get a free quote</TrackedLink>
          <ThemeToggle />
          <button type="button" className="icon-btn menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="menu" aria-label="Mobile">
          <div className="wrap">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
