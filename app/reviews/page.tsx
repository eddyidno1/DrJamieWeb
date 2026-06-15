import { BOOKING_URL } from "@/lib/booking";

export const metadata = { title: "Reviews" };

export default function Reviews() {
  return (
    <main className="page-stub">
      <span className="eyebrow">Reviews</span>
      <h1>Reviews</h1>
      <p>
        Hear what our patients have to say about their experience. Featured
        reviews and testimonials are coming soon.
      </p>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        Schedule a consult →
      </a>
    </main>
  );
}
