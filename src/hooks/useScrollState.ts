import { useEffect, useState } from "react";

export type ScrollState = {
  progress: number;
  scrolled: boolean;
};

export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrolled: false,
  });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setState({
        progress: scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
        scrolled: window.scrollY > 24,
      });
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
  }, []);

  return state;
}
