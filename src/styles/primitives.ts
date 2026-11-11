import styled from "styled-components";

/** Page shell — every section aligns to this measure and these gutters. */
export const Container = styled.div`
  width: 100%;
  max-width: var(--page-max);
  margin-inline: auto;
  padding-inline: var(--gutter);
`;

/** Editorial lead — the display serif, used to open a section. */
export const Lead = styled.p`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.1vw, 2.5rem);
  line-height: 1.22;
  letter-spacing: -0.01em;
  color: var(--ink);
`;

export const Body = styled.p`
  font-size: clamp(0.9375rem, 1.05vw, 1.0625rem);
  line-height: 1.75;
  color: var(--ink-soft);
`;

/**
 * Two-column section frame: a sticky numbered label on the left, content on
 * the right. Collapses to a stacked header below the large breakpoint.
 */
export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-lg);

  @media (min-width: 62rem) {
    grid-template-columns: 11rem minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 5rem);
  }
`;

export const StickyRail = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);

  @media (min-width: 62rem) {
    position: sticky;
    top: 8rem;
    flex-direction: column;
    align-self: start;
    gap: var(--space-xs);
  }
`;

export const RailIndex = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--accent);
`;

export const RailTitle = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
`;
