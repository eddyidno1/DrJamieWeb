// JSON-LD structured data: tells search engines this is a dental practice with
// two Chatswood clinics. Powers Google's local/business rich results.
import { SITE_URL } from "@/lib/site";

const PHONE = "+61294131446";
const EMAIL = "info@sodental.com.au";

const hours = (
  days: string | string[],
  opens: string,
  closes: string
) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: days,
  opens,
  closes,
});

// Mon–Sat are identical across both clinics; only Sunday differs.
const WEEKDAY_HOURS = [
  hours(["Monday", "Tuesday", "Wednesday"], "08:30", "18:00"),
  hours("Thursday", "08:30", "19:00"),
  hours("Friday", "08:30", "18:00"),
  hours("Saturday", "08:30", "17:00"),
];

const clinic = (
  id: string,
  name: string,
  streetAddress: string,
  sunday?: ReturnType<typeof hours>
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
  openingHoursSpecification: sunday
    ? [...WEEKDAY_HOURS, sunday]
    : WEEKDAY_HOURS,
  employee: {
    "@type": "Person",
    name: "Dr Jamie Lam",
    jobTitle: "Dentist",
  },
});

const data = {
  "@context": "https://schema.org",
  "@graph": [
    clinic(
      "chatswood-place",
      "So Dental Chatswood Place",
      "54 Hercules St",
      hours("Sunday", "09:00", "16:00")
    ),
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
