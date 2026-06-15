"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/booking";

const NAV = [
  { label: "Home", href: "/" },
  { label: "New Patients", href: "/new-patients" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link href="/" className="site-header__logo">
        Dr Jamie Lam
      </Link>

      <nav className="site-header__nav" aria-label="Primary">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="site-header__link">
            {item.label}
          </Link>
        ))}
      </nav>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="site-header__cta"
      >
        Schedule a Consult
      </a>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        className={`site-header__burger${open ? " is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile slide-in menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-menu__index">
                0{i + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu__cta"
          onClick={() => setOpen(false)}
        >
          Schedule a Consult →
        </a>
      </div>
    </header>
  );
}
