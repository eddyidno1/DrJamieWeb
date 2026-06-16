import { ImageResponse } from "next/og";
import { archivo } from "@/lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Branded "JL" monogram favicon (near-black on cream isn't used — dark tab
// chrome reads better with the dark mark, so cream "JL" on near-black).
export default async function Icon() {
  const font = await archivo(800);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#14110d",
          color: "#e9e6dd",
          fontFamily: "Archivo",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1.5,
        }}
      >
        JL
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 800, style: "normal" }] }
  );
}
