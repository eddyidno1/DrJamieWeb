// JSON-LD structured data: tells search engines this is a dental practice with
// two Chatswood clinics. Powers Google's local/business rich results.
// NOTE: update SITE_URL if you add a custom domain.
const SITE_URL = "https://dr-jamie-web.vercel.app";

const PHONE = "+61294131446";
const EMAIL = "info@sodental.com.au";

const clinic = (
  id: string,
  name: string,
  streetAddress: string
) => ({
  "@type": "Dentist",
  "@id": `${SITE_URL}/#${id}`,
  name,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  image: `${SITE_URL}/Reception.avif`,
  priceRange: "$$",
  currenciesAccepted: "AUD",
  address: {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: "Chatswood",
    addressRegion: "NSW",
    postalCode: "2067",
    addressCountry: "AU",
  },
  areaServed: { "@type": "City", name: "Chatswood" },
  employee: {
    "@type": "Person",
    name: "Dr Jamie Lam",
    jobTitle: "Dentist",
  },
});

const data = {
  "@context": "https://schema.org",
  "@graph": [
    clinic("chatswood-place", "So Dental Chatswood Place", "54 Hercules St"),
    clinic(
      "lemon-grove",
      "So Dental Lemon Grove",
      "Shop 37, Lemon Grove Shopping Centre, 431 Victoria Ave"
    ),
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Safe: serialized from a static, trusted object (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
