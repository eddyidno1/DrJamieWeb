"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MaskedText from "@/components/MaskedText";

const PRACTICE = [
  "So Dental Surgery was established in Chatswood over twenty years ago by our principal dentist Dr. Yuen-To (Samson) So, previously located at the interchange. Today we have two modern practices in Chatswood: at the Lemon Grove Centre next to Chatswood railway station, and on Hercules St at Chatswood Place.",
  "We aim to be the friendliest and the best dental practice in Chatswood. Both clinics are fully accredited and equipped with the latest technology to provide you with the best care possible.",
  "What sets So Dental Chatswood apart is the dedication of our team to providing personalised service, prioritising your comfort and well-being at all times. Our team is multilingual and speaks English, Mandarin and Cantonese fluently.",
];

const JAMIE = [
  "Dr Jamie Lam has served the community as a health professional for over 13 years, with degrees in both Pharmacy and Dental Medicine from the University of Sydney.",
  "He was drawn to healthcare and inspired by his grandfather, who consistently demonstrated empathy and whole-hearted commitment towards his patients as a skilful general surgeon.",
  "Because his partner has a genuine phobia of dentists and dental treatment, Jamie has a true understanding of the fear and confrontation dentistry can bring to a lot of people. This is why he focuses on a calming, reassuring and gentle demeanour with his patients, and treats them with the same level of respect as he would his own family.",
  "Jamie believes in good communication to ensure he has a sound understanding of what each patient would like to achieve, both aesthetically and functionally. He constantly strives for excellence and works closely with patients to help them re-discover their confident smiles.",
  "Jamie’s passion is smile reconstruction and aesthetic design. He continually challenges himself and keeps up to date with the latest trends and technologies in dentistry.",
  "When you become Jamie’s patient you’ll find that he is dedicated to your health and comfort, and strives to provide the highest standard of care.",
];

export default function AboutContent() {
  const root = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Intro: masked name slides up, intro + photo reveal.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", hero.current);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(reveals, { yPercent: 110, duration: 1, stagger: 0.09 })
        .from(".about__eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, 0)
        .from(".about__intro", { autoAlpha: 0, y: 28, duration: 0.9 }, 0.35)
        .fromTo(
          photo.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.2 },
          0.15
        )
        .from(
          ".about__photo img",
          { scale: 1.25, duration: 1.5 },
          0.15
        );

      // Photo parallax — drifts against the text as you scroll the hero.
      gsap.to(photo.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Section headings: masked slide-up on scroll.
      gsap.utils.toArray<HTMLElement>(".about__heading").forEach((h) => {
        const words = gsap.utils.toArray<HTMLElement>("[data-reveal]", h);
        gsap.from(words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: h, start: "top 85%" },
        });
      });

      // Jamie's portrait reveals (clip + zoom) when scrolled into view.
      if (portrait.current) {
        gsap.fromTo(
          portrait.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: portrait.current, start: "top 85%" },
          }
        );
        gsap.from(".about__portrait img", {
          scale: 1.2,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: portrait.current, start: "top 85%" },
        });
      }

      // Paragraph blocks fade + slide up, staggered, as they enter.
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <div className="about" ref={root}>
      {/* ---------- Hero ---------- */}
      <section className="about__hero" ref={hero}>
        <div className="about__heroText">
          <span className="about__eyebrow eyebrow">About / Dr Jamie Lam</span>
          <MaskedText text="Dr Jamie Lam" as="h1" className="about__name" />
          <p className="about__intro">
            A health professional of more than 13 years, with degrees in
            Pharmacy and Dental Medicine from the University of Sydney —
            dedicated to gentle, patient-first care at So Dental in Chatswood.
          </p>
        </div>

        <div className="about__photo" ref={photo}>
          <img src="/Reception.avif" alt="So Dental reception" />
        </div>
      </section>

      {/* ---------- About So Dental ---------- */}
      <section className="about__section">
        <div className="about__side">
          <span className="about__num">01 — The practice</span>
          <MaskedText
            text="About So Dental"
            as="h2"
            className="about__heading"
          />
        </div>
        <div className="about__body">
          {PRACTICE.map((p, i) => (
            <p data-fade key={i}>
              {p}
            </p>
          ))}
          <ul className="about__langs" data-fade aria-label="Languages spoken">
            <li>English</li>
            <li>Mandarin</li>
            <li>Cantonese</li>
          </ul>
        </div>
      </section>

      {/* ---------- Who is Dr Jamie ---------- */}
      <section className="about__section">
        <div className="about__side">
          <span className="about__num">02 — The dentist</span>
          <MaskedText
            text="Who is Dr Jamie?"
            as="h2"
            className="about__heading about__heading--flow"
          />
          <div className="about__portrait" ref={portrait}>
            <img src="/JAMIELAM.avif" alt="Dr Jamie Lam" />
          </div>
        </div>
        <div className="about__body">
          {JAMIE.map((p, i) => (
            <p data-fade key={i}>
              {p}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
