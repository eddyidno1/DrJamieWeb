// Fetches a static Archivo .ttf at build time for next/og (satori can't use
// woff2, so a simple User-Agent makes Google Fonts return truetype).
// Shared by the OG image and the generated favicon/apple-icon.
export async function archivo(weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)" } }
  ).then((r) => r.text());
  const url = css.match(/src:\s*url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error("Archivo ttf not found");
  return fetch(url).then((r) => r.arrayBuffer());
}
