import { useEffect, useState } from "react";

/**
 * Tracks which section is currently occupying the reading position, so the
 * navigation can mark it. Uses scroll position rather than intersection ratios
 * because sections differ wildly in height.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      // The line the page "reads" from: a third of the way down the viewport.
      const line = window.scrollY + window.innerHeight * 0.34;
      let current: string | null = null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.offsetTop <= line) current = id;
      }

      // Anything within a viewport of the bottom belongs to the last section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(atBottom ? (ids[ids.length - 1] ?? current) : current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
