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
      <footer className="footer">
        <span className="footer__logo">Dr Jamie Lam</span>
        <div className="footer__locations">
          <div className="footer__location">
            <p className="footer__name">So Dental Lemon Grove</p>
            <p className="footer__address">
              Shop 37, Lemon Grove Centre, 431 Victoria Ave, Chatswood NSW 2067
            </p>
          </div>
          <div className="footer__location">
            <p className="footer__name">So Dental Chatswood Place</p>
            <p className="footer__address">
              Centre for Advanced Dentistry, 54 Hercules St, Chatswood NSW 2067
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
