import { ImageResponse } from "next/og";

export const alt =
  "Dr Jamie Lam — your new family dentist at So Dental, Chatswood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a static Archivo .ttf at build time (satori can't use woff2, so an old
// User-Agent is used to make Google Fonts return truetype).
async function archivo(weight: number): Promise<ArrayBuffer> {
  // A simple UA (no woff2 advertised) makes Google Fonts return truetype.
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)" } }
  ).then((r) => r.text());
  const url = css.match(/src:\s*url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error("Archivo ttf not found");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [bold, medium] = await Promise.all([archivo(800), archivo(500)]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#e9e6dd",
          color: "#14110d",
          padding: "72px 80px",
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b655b",
          }}
        >
          So Dental · Chatswood
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            Dr Jamie Lam
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 44,
              fontWeight: 500,
            }}
          >
            Meet your new family dentist
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              width: 200,
              height: 12,
              backgroundColor: "#e3372b",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            fontWeight: 500,
            color: "#6b655b",
          }}
        >
          Gentle, patient-first care · Cosmetic · Implants · Invisalign
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
