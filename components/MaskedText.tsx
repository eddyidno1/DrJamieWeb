import React from "react";

/**
 * Splits text into per-word masks for a staggered slide-up reveal.
 * Each word sits in an overflow-hidden wrapper; the inner span (tagged
 * [data-reveal]) is what animators translate on the Y axis.
 *
 * Pass an `as` element type (e.g. "h1") and a className for styling the host.
 */
export default function MaskedText({
  text,
  as = "span",
  className,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
}) {
  const words = text.split(" ");
  const children = words.map((word, i) => (
    <span className="mask-word" key={`${word}-${i}`} aria-hidden="true">
      <span className="mask-inner" data-reveal>
        {word}
      </span>
      {i < words.length - 1 ? " " : ""}
    </span>
  ));
  // createElement avoids React 19's "never children" inference on a generic
  // ElementType tag.
  return React.createElement(
    as,
    { className, "aria-label": text },
    ...children
  );
}
