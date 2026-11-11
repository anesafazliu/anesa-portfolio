import styled, { css } from "styled-components";

/**
 * Shared call-to-action geometry. Square corners, a colour wipe that rises
 * from the bottom edge, and a nudge on the trailing arrow.
 */
const ctaBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
  padding: 0.95rem 1.6rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.4s var(--ease);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateY(100%);
    transition: transform 0.45s var(--ease-out);
  }

  &:hover::before,
  &:focus-visible::before {
    transform: translateY(0);
  }

  > * {
    position: relative;
  }

  svg {
    transition: transform 0.4s var(--ease-out);
  }

  &:hover svg,
  &:focus-visible svg {
    transform: translateX(0.25rem);
  }
`;

export const PrimaryCta = styled.a`
  ${ctaBase};
  background: var(--ink);
  color: var(--paper);

  &::before {
    background: var(--accent);
  }
`;

export const SecondaryCta = styled.a`
  ${ctaBase};
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--rule-strong);

  &:hover,
  &:focus-visible {
    color: var(--paper);
  }

  &::before {
    background: var(--ink);
  }
`;
