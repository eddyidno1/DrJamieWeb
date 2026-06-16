import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="notfound">
      <span className="eyebrow">Error 404</span>
      <div className="notfound__num" aria-hidden="true">
        404
      </div>
      <h1 className="notfound__title">This page took a wrong turn</h1>
      <p className="notfound__text">
        The page you’re looking for doesn’t exist or may have moved. Let’s get
        you back to your smile.
      </p>
      <div className="notfound__links">
        <Link href="/" className="notfound__btn" data-cursor="invert">
          <span>Back home</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/contact-us" className="notfound__link" data-cursor="invert">
          Contact us
        </Link>
      </div>
    </main>
  );
}
