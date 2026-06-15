"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PROJECTS = [
  {
    name: "Cosmetic Dentistry",
    meta: "Veneers, whitening & smile design",
    img: "https://picsum.photos/seed/dental-cosmetic/800/600",
  },
  {
    name: "Implants",
    meta: "Permanent tooth replacement",
    img: "https://picsum.photos/seed/dental-implants/800/600",
  },
  {
    name: "Root Canal Treatment",
    meta: "Saving infected & damaged teeth",
    img: "https://picsum.photos/seed/dental-rootcanal/800/600",
  },
  {
    name: "Extraction",
    meta: "Simple & surgical removal",
    img: "https://picsum.photos/seed/dental-extraction/800/600",
  },
  {
    name: "Invisalign",
    meta: "Clear aligner orthodontics",
    img: "https://picsum.photos/seed/dental-invisalign/800/600",
  },
  {
    name: "Other Services",
    meta: "Check-ups, cleans & hygiene",
    img: "https://picsum.photos/seed/dental-other/800/600",
  },
];

export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
        {PROJECTS.map((p) => (
          <a
            className="work__row"
            href="#work"
            key={p.name}
            data-cursor="invert"
            onMouseEnter={() => show(p.img)}
            onMouseLeave={hide}
          >
            <span className="work__name">{p.name}</span>
            <span className="work__meta">{p.meta}</span>
          </a>
        ))}
      </div>

      <div className="work__floating" ref={floating} aria-hidden="true">
        <img ref={imgRef} src={PROJECTS[0].img} alt="" />
      </div>
    </section>
  );
}
