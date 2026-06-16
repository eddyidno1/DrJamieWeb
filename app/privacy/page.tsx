import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How So Dental and Dr Jamie Lam collect, use, store and protect your personal and health information, in line with the Australian Privacy Act 1988.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <main className="legal">
      <header className="legal__hero">
        <span className="eyebrow legal__eyebrow">Legal</span>
        <h1 className="legal__title">Privacy Policy</h1>
        <p className="legal__updated">Last updated: June 2026</p>
        <p className="legal__intro">
          So Dental and Dr Jamie Lam are committed to protecting your privacy.
          This policy explains how we collect, use, store and disclose your
          personal and health information, and your rights in relation to it. We
          handle your information in accordance with the{" "}
          <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles
          (APPs).
        </p>
      </header>

      <div className="legal__body">
        <section className="legal__section">
          <h2>The information we collect</h2>
          <p>
            To provide safe, appropriate dental care we may collect:
          </p>
          <ul>
            <li>
              <strong>Personal details</strong> — your name, date of birth,
              address, phone number and email address.
            </li>
            <li>
              <strong>Health information</strong> — your medical and dental
              history, medications, allergies, treatment records, clinical
              notes, X-rays and photographs.
            </li>
            <li>
              <strong>Payment and insurance details</strong> — such as your
              Medicare, private health fund or HICAPS information for claims and
              billing.
            </li>
            <li>
              <strong>Enquiry details</strong> — any information you provide
              when you contact us by phone, email or through this website.
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>How we collect it</h2>
          <p>
            We collect information directly from you — in person, over the
            phone, by email, or when you submit an enquiry through this site.
            With your consent, we may also receive information from other
            healthcare providers, your private health fund, or Medicare where it
            is relevant to your care.
          </p>
        </section>

        <section className="legal__section">
          <h2>Why we collect and use it</h2>
          <p>We use your information to:</p>
          <ul>
            <li>provide dental assessment, treatment and ongoing care;</li>
            <li>
              communicate with you about appointments, recalls and treatment;
            </li>
            <li>process payments and health-fund or Medicare claims;</li>
            <li>
              respond to your enquiries and manage our relationship with you;
            </li>
            <li>meet our legal, regulatory and insurance obligations.</li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>Disclosure of your information</h2>
          <p>
            We do not sell your information. We only disclose it where necessary
            for your care or where required or permitted by law — for example to
            specialists or other treating practitioners you are referred to, to
            your health fund or Medicare for claims, to our secure IT and
            practice-management providers, or to regulatory bodies where legally
            required. We do not disclose your information overseas.
          </p>
        </section>

        <section className="legal__section">
          <h2>Storing and protecting your information</h2>
          <p>
            Your records are held in secure electronic and, where applicable,
            physical systems with access limited to authorised staff. We take
            reasonable steps to protect your information from misuse, loss and
            unauthorised access, and we retain health records for the period
            required by law before secure destruction.
          </p>
        </section>

        <section className="legal__section">
          <h2>This website</h2>
          <p>
            Our website may use cookies and basic analytics to understand how
            visitors use the site and to improve it. This information is general
            in nature and is not used to identify you personally. You can
            disable cookies in your browser settings. The booking and contact
            links on this site may take you to third-party services that have
            their own privacy policies.
          </p>
        </section>

        <section className="legal__section">
          <h2>Accessing and correcting your information</h2>
          <p>
            You may request access to the personal information we hold about
            you, and ask us to correct anything that is inaccurate or out of
            date. To make a request, please contact us using the details below.
          </p>
        </section>

        <section className="legal__section">
          <h2>Questions or complaints</h2>
          <p>
            If you have a question about your privacy, or wish to make a
            complaint about how we have handled your information, please contact
            us and we will respond promptly. If you are not satisfied with our
            response, you may contact the Office of the Australian Information
            Commissioner at{" "}
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              oaic.gov.au
            </a>
            .
          </p>
          <address className="legal__contact">
            <strong>So Dental</strong>
            <br />
            Phone:{" "}
            <a href="tel:+61294131446" data-cursor="invert">
              (02) 9413 1446
            </a>
            <br />
            Email:{" "}
            <a href="mailto:info@sodental.com.au" data-cursor="invert">
              info@sodental.com.au
            </a>
          </address>
        </section>

        <Link href="/" className="legal__back" data-cursor="invert">
          <span aria-hidden="true">←</span> Back to home
        </Link>
      </div>
    </main>
  );
}
