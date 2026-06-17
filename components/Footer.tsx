import Link from "next/link";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/clinics";
import { BOOKING_URL } from "@/lib/booking";

const NAV = [
  { label: "New Patients", href: "/new-patients" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Link href="/" className="footer__logo">
          Dr Jamie Lam
        </Link>

        <nav className="footer__nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="footer__navLink">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__cta"
          data-cursor="invert"
        >
          Schedule a Consult →
        </a>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          © {new Date().getFullYear()} So Dental. All rights reserved.
        </span>
        <div className="footer__meta">
          <a href={PHONE_HREF} className="footer__metaLink" data-cursor="invert">
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="footer__metaLink"
            data-cursor="invert"
          >
            {EMAIL}
          </a>
          <Link href="/privacy" className="footer__metaLink" data-cursor="invert">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
