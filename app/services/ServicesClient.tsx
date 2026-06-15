"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export type Service = {
  id: string;
  title: string;
  blurb: string;
  detail: string;
  // aim = [angle around the tooth in degrees (0 = front), height fraction -1..1].
  // The node is raycast onto the actual tooth surface along this direction.
  aim: [number, number];
};

// All services from the landing page, mapped onto points on the tooth.
export const SERVICES: Service[] = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    blurb: "Veneers, whitening & smile design",
    detail:
      "Veneers, whitening and complete smile design. We reshape, brighten and align your smile with natural-looking, durable results tailored to your face.",
    aim: [-14, 0.56],
  },
  {
    id: "implants",
    title: "Implants",
    blurb: "Permanent tooth replacement",
    detail:
      "Permanent, natural-feeling tooth replacement. Titanium implants restore function and confidence where teeth are missing — built to last.",
    aim: [42, 0.27],
  },
  {
    id: "rootcanal",
    title: "Root Canal Treatment",
    blurb: "Saving infected & damaged teeth",
    detail:
      "Saving infected or damaged teeth. Gentle, modern endodontics performed under high-magnification microscopes to relieve pain and keep your natural tooth.",
    aim: [-53, -0.04],
  },
  {
    id: "extraction",
    title: "Extraction",
    blurb: "Simple & surgical removal",
    detail:
      "Simple and surgical removal, including wisdom teeth. Performed calmly and comfortably, with clear aftercare so you recover quickly.",
    aim: [17, -0.43],
  },
  {
    id: "invisalign",
    title: "Invisalign",
    blurb: "Clear aligner orthodontics",
    detail:
      "Clear aligner orthodontics. Straighten your teeth discreetly with custom, removable aligners and digitally planned, predictable movement.",
    aim: [-29, 0.33],
  },
  {
    id: "other",
    title: "Other Services",
    blurb: "Check-ups, cleans & hygiene",
    detail:
      "Check-ups, cleans, hygiene and preventive care. Regular visits that keep your teeth and gums healthy for the long term.",
    aim: [58, -0.2],
  },
];

export default function ServicesClient() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const activeService = SERVICES.find((s) => s.id === active) ?? null;

  return (
    <div className="services">
      <h1 className={`services__title${active ? " is-hidden" : ""}`}>
        Our Services
      </h1>

      <div className="services__canvas">
        <Scene
          services={SERVICES}
          hovered={hovered}
          active={active}
          onHover={setHovered}
          onSelect={setActive}
        />
      </div>

      <p className={`services__hint${active ? " is-hidden" : ""}`}>
        <span className="services__hint--fine">
          Hover a service · click to explore
        </span>
        <span className="services__hint--touch">Tap a service to explore</span>
      </p>

      <aside
        className={`services__panel${active ? " is-open" : ""}`}
        aria-hidden={!active}
      >
        {activeService && (
          <>
            <button
              className="services__close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span className="services__panelTag">{activeService.blurb}</span>
            <h2 className="services__panelTitle">{activeService.title}</h2>
            <p className="services__panelText">{activeService.detail}</p>
            <div className="services__beforeAfter" aria-hidden="true">
              <span>Before</span>
              <span>After</span>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
