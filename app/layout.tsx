import type { Metadata } from "next";
import { Archivo, Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr Jamie Lam — Family Dentist | So Dental, Chatswood",
    template: "%s | Dr Jamie Lam — So Dental",
  },
  description:
    "Meet your new family dentist. Dr Jamie Lam provides gentle, patient-first dental care at So Dental in Chatswood — comprehensive exams, cosmetic dentistry, implants, Invisalign and more.",
  openGraph: {
    title: "Dr Jamie Lam — Family Dentist | So Dental, Chatswood",
    description:
      "Meet your new family dentist. Gentle, patient-first dental care at So Dental in Chatswood.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${ibmPlexSans.variable}`}
    >
      <body>
        <CustomCursor />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
