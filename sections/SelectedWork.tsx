"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

// `id` matches the service id on the /services page so clicking opens that
// service's panel directly.
const PROJECTS = [
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    meta: "Veneers, whitening & smile design",
    img: "/cosmetic.avif",
  },
  {
    id: "implants",
    name: "Implants",
    meta: "Permanent tooth replacement",
    img: "/implants.avif",
  },
  {
    id: "rootcanal",
    name: "Root Canal Treatment",
    meta: "Saving infected & damaged teeth",
    img: "/rootcanal.avif",
  },
  {
    id: "extraction",
    name: "Extraction",
    meta: "Simple & surgical removal",
    img: "/extraction.avif",
  },
  {
    id: "invisalign",
    name: "Invisalign",
    meta: "Clear aligner orthodontics",
    img: "/invisalign.avif",
  },
  {
    id: "other",
    name: "Other Services",
    meta: "Check-ups, cleans & hygiene",
    img: "/services.avif",
  },
];

export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Touch devices have no hover, so they use a two-step row: tap reveals the
  // photo + an explore arrow; tapping the arrow opens the service in a new tab.
  const [isTouch, setIsTouch] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const el = floating.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      gsap.set(el, { xPercent: -50, yPercent: -50 });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );

  const show = (img: string) => {
    if (imgRef.current) imgRef.current.src = img;
    gsap.to(floating.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  };
  const hide = () => {
    gsap.to(floating.current, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: "power2.out" });
  };

  return (
    <section className="section work" id="work" ref={root}>
      <span className="eyebrow">Our services</span>

      <div className="work__list">
        {PROJECTS.map((p) =>
          isTouch ? (
            // First tap opens the row (photo slides in); second tap navigates.
            <Link
              key={p.name}
              href={`/services?service=${p.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`work-m${openId === p.id ? " is-open" : ""}`}
              aria-expanded={openId === p.id}
              onClick={(e) => {
                if (openId !== p.id) {
                  e.preventDefault();
                  setOpenId(p.id);
                }
              }}
            >
              <img className="work-m__img" src={p.img} alt={p.name} />
              <span className="work-m__label">{p.name}</span>
              <span className="work-m__info" aria-hidden={openId !== p.id}>
                <span className="work-m__infoName">{p.name}</span>
                <span className="work-m__meta">{p.meta}</span>
                <span className="work-m__explore">
                  Explore in services
                  <span aria-hidden="true">↗</span>
                </span>
              </span>
            </Link>
          ) : (
            <Link
              className="work__row"
              href={`/services?service=${p.id}`}
              key={p.name}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="invert"
              onMouseEnter={() => show(p.img)}
              onMouseLeave={hide}
            >
              <span className="work__name">{p.name}</span>
              <span className="work__meta">{p.meta}</span>
            </Link>
          )
        )}
      </div>

      <div className="work__floating" ref={floating} aria-hidden="true">
        <img ref={imgRef} src={PROJECTS[0].img} alt="" />
      </div>
    </section>
  );
}
