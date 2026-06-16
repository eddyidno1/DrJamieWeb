// Single source of truth for patient reviews — used by both the landing-page
// testimonials carousel and the dedicated /reviews page.
import { CLINICS } from "@/lib/clinics";

export type Review = {
  quote: string;
  name: string;
  year: string;
};

// Public Google listings for each clinic — the "Read all reviews on Google"
// links on the /reviews page point here. Derived from the clinic data so the
// URLs stay in sync.
export const GOOGLE_REVIEW_LINKS = CLINICS.map((c) => ({
  label: c.name,
  url: c.reviewUrl,
}));

export const REVIEWS: Review[] = [
  {
    quote:
      "Jamie is a great dentist, always happy to take the extra time to explain things, cleaning is ace!",
    name: "Matt Harder",
    year: "2026",
  },
  {
    quote:
      "Dr Jamie Lam and his team are truly professional. They take the time to explain everything clearly and are very thorough during the consultation. Highly recommended. The other clinic staff are also friendly and always willing to help with any questions or issues.",
    name: "Victor Lam",
    year: "2026",
  },
  {
    quote: `We been with Dr. Jamie for many years.
He is very patience, takes time to explain every procedure and great with kids.

Recently i just removed my last 2 wisdom teeth, he was so gentle and professional, i dont feels much during the process. The best part was the entire process takes shorter and easier than i thought and i had speedy recovery!

Dental location very convenient with free 3 hours parking. There is cafe/grocery shopping available after dental visit.
So Dental team are very polite and supportive, the front desk is always welcome us with great smile and friendly too!`,
    name: "Man T",
    year: "2026",
  },
  {
    quote:
      "Have had great service for the last two years at So Dental under the care of Dr Jamie Lam and his team. Would recommend.",
    name: "Milan Popalzay",
    year: "2026",
  },
  {
    quote:
      "I’ve been to a few other dentists but So Dental are the best. Modern and clean facilities. Dr Jamie Lam has helped clear up ongoing gum issues through his care. He is very experienced and methodical, also patient and explains things well.",
    name: "AngeliQue 99",
    year: "2026",
  },
  {
    quote: "Dr Jamie has been looking after me for years and has been great",
    name: "Angela Vumbaca",
    year: "2025",
  },
  {
    quote: `So Dental is a great company. Very clean and modern office building and facilities. The reception is very tranquil and calm. The receptionists are all very helpful and easily contactable if i need to change my appointment.

Dr Jaime is a very efficient and professional dentist. My check ups go so smoothly and they usually finish earlier than I expect. My teeth are left looking so white and clean which I find to be amazing due to the amount of black coffee and tea I drink.

Highly recommend this Dentist and facility!`,
    name: "Marika Chung",
    year: "2025",
  },
  {
    quote:
      "I’ve been seeing Dr. Jamie Lam for my dental care, and I couldn’t be happier. Dr. Lam is always on time, gentle, caring, and very practical in their approach. Thanks to the excellent care of Dr. Lam and the team, I haven’t had any major dental issues. The clinic is always clean and well-maintained, which makes every visit comfortable and reassuring. Highly recommend!",
    name: "Yagmur C",
    year: "2025",
  },
  {
    quote:
      "Excellent care and service. I have been going here for years, Dr. Jamie Lam is a true professional who goes above and beyond to answer any questions I have. He is truly passionate about his craft as I always leave more knowledgable. I have been particularly impressed with Dr. Jamie Lam’s ability to listen and make clients feel heard. He is very honest and knowledgeable with his advice. Can’t recommend So Dental and Dr Jamie Lam enough!",
    name: "Marcus Lee",
    year: "2025",
  },
  {
    quote: `Our family has been seeing Dr Jamie for general dental. He is so professional, calm and friendly. He has very gentle hands that don’t hurt children.
I wish I could give 6 stars!`,
    name: "Toon Sukanya",
    year: "2025",
  },
];
