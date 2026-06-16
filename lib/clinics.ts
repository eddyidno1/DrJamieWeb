// Single source of truth for the practice's contact details and the two
// Chatswood clinics. Used by the footer, the contact page and the reviews page
// so addresses, phone, email and Google links never drift apart.

export const PHONE = "(02) 9413 1446";
export const PHONE_HREF = "tel:+61294131446";
export const EMAIL = "info@sodental.com.au";

export type Clinic = {
  id: string;
  name: string;
  address: string;
  /** Google Maps link (opens directions in a new tab). */
  mapUrl: string;
  /** Embeddable Google Maps src (keyless `output=embed`). */
  embedUrl: string;
  /** Public Google listing for reviews. */
  reviewUrl: string;
};

export const CLINICS: Clinic[] = [
  {
    id: "chatswood-place",
    name: "So Dental Chatswood Place",
    address: "54 Hercules St, Chatswood NSW 2067",
    mapUrl: "https://maps.google.com/?q=54+Hercules+St,+Chatswood+NSW+2067",
    embedUrl:
      "https://maps.google.com/maps?q=54%20Hercules%20St%2C%20Chatswood%20NSW%202067&output=embed",
    reviewUrl: "https://share.google/zGylgrZ6eECoaFzao",
  },
  {
    id: "lemon-grove",
    name: "So Dental Lemon Grove",
    address:
      "Shop 37, Lemon Grove Shopping Centre, 431 Victoria Ave, Chatswood NSW 2067",
    mapUrl:
      "https://maps.google.com/?q=Lemon+Grove+Shopping+Centre,+431+Victoria+Ave,+Chatswood+NSW+2067",
    embedUrl:
      "https://maps.google.com/maps?q=Lemon%20Grove%20Centre%2C%20431%20Victoria%20Ave%2C%20Chatswood%20NSW%202067&output=embed",
    reviewUrl: "https://share.google/8bA7EhhPwn5xf1e27",
  },
];
