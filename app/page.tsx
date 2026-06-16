import Hero from "@/sections/Hero";
import ScrollVideo from "@/components/ScrollVideo";
import Philosophy from "@/sections/Philosophy";
import ClientMarquee from "@/sections/ClientMarquee";
import SelectedWork from "@/sections/SelectedWork";
import Press from "@/sections/Press";
import Testimonials from "@/sections/Testimonials";
import MethodOutro from "@/sections/MethodOutro";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollVideo />
      {/* Scroll room for the video to expand/hold/contract before it lands
          inline in the philosophy text. */}
      <div className="scrollvideo-spacer" aria-hidden="true" />
      <Philosophy />
      <ClientMarquee />
      <SelectedWork />
      <Press />
      <Testimonials />
      <MethodOutro />
    </main>
  );
}
