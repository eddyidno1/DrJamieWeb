import Link from "next/link";
import { CLINICS, PHONE, PHONE_HREF, EMAIL } from "@/lib/clinics";
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
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            Dr Jamie Lam
          </Link>
          <p className="footer__tagline">
            Gentle, patient-first dental care at So Dental, Chatswood.
          </p>
          <div className="footer__contact">
            <a href={PHONE_HREF} className="footer__contactLink" data-cursor="invert">
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="footer__contactLink"
              data-cursor="invert"
            >
              {EMAIL}
            </a>
          </div>
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

        <nav className="footer__nav" aria-label="Footer">
          <span className="footer__colTitle">Explore</span>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="footer__navLink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__locations">
          <span className="footer__colTitle">Our clinics</span>
          {CLINICS.map((c) => (
            <div className="footer__location" key={c.id}>
              <p className="footer__name">{c.name}</p>
              <p className="footer__address">{c.address}</p>
              <div className="footer__locLinks">
                <a
                  href={c.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__locLink"
                  data-cursor="invert"
                >
                  Directions ↗
                </a>
                <a
                  href={c.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__locLink"
                  data-cursor="invert"
                >
                  Reviews on Google ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          © {new Date().getFullYear()} So Dental. All rights reserved.
        </span>
        <Link href="/privacy" className="footer__legal" data-cursor="invert">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
