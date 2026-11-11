import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Viewport inset — a negative bottom delays the reveal until well in view. */
  rootMargin?: string;
};

/**
 * Reports once, the first time an element scrolls into view. Elements never
 * un-reveal, so content stays readable when scrolling back up.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  // Without IntersectionObserver there is nothing to wait for — show at once.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
