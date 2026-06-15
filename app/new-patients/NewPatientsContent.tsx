"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import MaskedText from "@/components/MaskedText";
import { BOOKING_URL } from "@/lib/booking";

// What every comprehensive exam includes — rendered as animated chips.
const INCLUDED = [
  "All necessary x-rays",
  "Full set of records & photos",
  "Full mouth clean",
  "Fluoride treatment",
  "Upfront cost of treatment",
  "Comprehensive treatment plan",
];

const APPOINTMENTS = [
  {
    id: "exam",
    num: "01",
    kicker: "Your first appointment",
    title: "New Patient Comprehensive Exam",
    paras: [
      "At your first appointment, Dr Jamie will take time communicating with you to find out the goals you have. It could be as simple as “I am happy with my teeth and want to keep them healthy”, or something much more complex.",
      "Dr Jamie will work with you to carefully develop a plan that is most suited for you. We will take a full set of records — including any necessary x-rays and photos — to help us diagnose any problems and construct a comprehensive treatment plan.",
      "You will also have your teeth cleaned to ensure you leave the clinic with a sparkling smile.",
      "Value for money is important to everyone, and to ensure there are no surprises Dr Jamie will carefully explain the cost of treatment. The initial exam includes all necessary x-rays, a full mouth clean and fluoride treatment — so you leave feeling fresh, with a clear plan that fits your dental health, lifestyle and needs.",
    ],
    included: true,
  },
  {
    id: "pain",
    num: "02",
    kicker: "Toothache & urgent care",
    title: "Pain Relief Appointment",
    paras: [
      "If you have a toothache or are needing pain relief, Dr Jamie will do his best to see you as soon as possible.",
      "In this appointment, he will focus on relieving your pain and diagnosing the cause of the problem.",
      "He will discuss all suitable treatment options with you and, where possible, give you a written quote for any treatment required.",
    ],
    included: false,
  },
  {
    id: "consult",
    num: "03",
    kicker: "Just want a chat?",
    title: "Consultation",
    paras: [
      "If you’d like to have a consultation and a chat with Dr Jamie, you can book in for a consultation.",
      "Please come armed with any questions or problems you may have, and Dr Jamie will do his absolute best to answer them and provide suitable solutions.",
      "Don’t forget — you can also contact him via email if you have any general dental questions.",
    ],
    included: false,
  },
];

function ScheduleButton({
  children = "Schedule an appointment",
}: {
  children?: React.ReactNode;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="np-btn"
      data-cursor="invert"
    >
      <span>{children}</span>
      <span className="np-btn__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export default function NewPatientsContent() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero: masked headline slides up, supporting copy fades in.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", hero.current);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(reveals, { yPercent: 110, duration: 1, stagger: 0.08 })
        .from(".np-hero__eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, 0)
        .from(".np-hero__intro", { autoAlpha: 0, y: 26, duration: 0.9 }, 0.3)
        .from(".np-hero__cta", { autoAlpha: 0, y: 22, duration: 0.8 }, 0.5);

      // Section headings: masked slide-up as each enters.
      gsap.utils.toArray<HTMLElement>(".np-appt__heading").forEach((h) => {
        const words = gsap.utils.toArray<HTMLElement>("[data-reveal]", h);
        gsap.from(words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: h, start: "top 85%" },
        });
      });

      // Big watermark index numbers drift in.
      gsap.utils.toArray<HTMLElement>(".np-appt__num").forEach((n) => {
        gsap.from(n, {
          autoAlpha: 0,
          x: -40,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 90%" },
        });
      });

      // Paragraphs & chips fade + rise, staggered, as they enter.
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 34,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".np-appt__chips").forEach((wrap) => {
        gsap.from(wrap.querySelectorAll("li"), {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap, start: "top 88%" },
        });
      });

      // Closing CTA band reveal.
      gsap.from(".np-cta__inner > *", {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".np-cta", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <div className="np" ref={root}>
      {/* ---------- Hero ---------- */}
      <section className="np-hero" ref={hero}>
        <span className="np-hero__eyebrow eyebrow">New Patients</span>
        <MaskedText
          text="Your first visit"
          as="h1"
          className="np-hero__title"
        />
        <p className="np-hero__intro">
          Whether you’re due for a check-up, dealing with a toothache, or simply
          want a chat — here’s exactly what to expect when you become Dr Jamie’s
          patient. Gentle, unhurried care with a clear plan and no surprises.
        </p>
        <div className="np-hero__cta">
          <ScheduleButton />
        </div>
        <div className="np-hero__scroll" aria-hidden="true">
          <span>Scroll</span> ↓
        </div>
      </section>

      {/* ---------- Appointment types ---------- */}
      {APPOINTMENTS.map((a) => (
        <section className="np-appt" key={a.id} id={a.id}>
          <div className="np-appt__side">
            <span className="np-appt__num" aria-hidden="true">
              {a.num}
            </span>
            <span className="np-appt__kicker">{a.kicker}</span>
            <MaskedText
              text={a.title}
              as="h2"
              className="np-appt__heading"
            />
            <div className="np-appt__sideCta">
              <ScheduleButton>Book this appointment</ScheduleButton>
            </div>
          </div>

          <div className="np-appt__body">
            {a.paras.map((p, i) => (
              <p data-fade key={i}>
                {p}
              </p>
            ))}

            {a.included && (
              <div className="np-appt__chips" data-fade>
                <span className="np-appt__chipsLabel">
                  Every exam includes
                </span>
                <ul aria-label="Included in the comprehensive exam">
                  {INCLUDED.map((item) => (
                    <li key={item}>
                      <span className="np-appt__tick" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ---------- Closing CTA ---------- */}
      <section className="np-cta">
        <div className="np-cta__inner">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="np-cta__title">
            Let’s get you in <br />
            the chair.
          </h2>
          <p className="np-cta__text">
            Book online and we’ll take care of the rest. Have a general dental
            question first? Dr Jamie is always happy to help.
          </p>
          <div className="np-cta__actions">
            <ScheduleButton />
            <Link href="/contact-us" className="np-link" data-cursor="invert">
              Email a question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
