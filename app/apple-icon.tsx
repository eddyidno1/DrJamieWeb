import { ImageResponse } from "next/og";
import { archivo } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon (iOS) — opaque "JL" monogram with a red accent bar.
export default async function AppleIcon() {
  const font = await archivo(800);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#14110d",
          color: "#e9e6dd",
          fontFamily: "Archivo",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        JL
        <div
          style={{
            display: "flex",
            width: 56,
            height: 8,
            marginTop: 6,
            backgroundColor: "#e3372b",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 800, style: "normal" }] }
  );
}
