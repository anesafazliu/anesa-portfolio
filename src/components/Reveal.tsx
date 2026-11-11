import type { ElementType, ReactNode } from "react";
import styled from "styled-components";
import { useInView } from "../hooks/useInView";

type Variant = "up" | "fade" | "mask";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds, relative to its siblings. */
  delay?: number;
  variant?: Variant;
  as?: ElementType;
  className?: string;
};

const Shell = styled.div<{ $inView: boolean; $delay: number; $variant: Variant }>`
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.7s var(--ease-out),
    clip-path 0.8s var(--ease-out);
  transition-delay: ${({ $delay }) => $delay}ms;

  opacity: ${({ $inView, $variant }) =>
    $inView || $variant === "mask" ? 1 : 0};

  transform: ${({ $inView, $variant }) =>
    $inView || $variant === "fade"
      ? "none"
      : $variant === "mask"
        ? "translate3d(0, 0.4rem, 0)"
        : "translate3d(0, 1.25rem, 0)"};

  ${({ $variant, $inView }) =>
    $variant === "mask" &&
    `clip-path: inset(${$inView ? "0 0 0 0" : "0 0 105% 0"});`}

  /* Motion is decoration here — the content is present either way. */
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    clip-path: none;
  }
`;

/** Scroll-reveal wrapper. Renders a plain element; adds no DOM semantics. */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  as,
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Shell
      ref={ref}
      as={as}
      className={className}
      $inView={inView}
      $delay={delay}
      $variant={variant}
    >
      {children}
    </Shell>
  );
}
