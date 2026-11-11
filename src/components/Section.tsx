import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { sections } from "../data/portfolio";
import type { SectionId } from "../data/portfolio";
import {
  Container,
  RailIndex,
  RailTitle,
  SectionGrid,
  StickyRail,
} from "../styles/primitives";

/** Surface the section sits on. `sunk` sets a section apart; `ink` closes the page. */
export type Tone = "paper" | "sunk" | "ink";

type SectionProps = {
  id: SectionId;
  children: ReactNode;
  tone?: Tone;
};

const Shell = styled.section<{ $tone: Tone }>`
  position: relative;
  z-index: 1;
  padding-block: var(--section-y);
  border-top: 1px solid
    ${({ $tone }) => ($tone === "ink" ? "transparent" : "var(--rule)")};

  ${({ $tone }) =>
    $tone === "sunk" &&
    `
    background: var(--paper-sunk);
  `}

  ${({ $tone }) =>
    $tone === "ink" &&
    css`
      background: var(--ink);
      color: var(--on-ink);

      ${RailIndex} {
        color: var(--accent-on-ink);
      }

      ${RailTitle} {
        color: var(--on-ink-muted);
      }
    `}
`;

/**
 * Every section shares one frame: a numbered mono label pinned in the left
 * rail, content on the right. The numbering is the spine of the page.
 */
export default function Section({ id, children, tone = "paper" }: SectionProps) {
  const { index, label } = sections.find((section) => section.id === id)!;

  return (
    <Shell id={id} $tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionGrid>
          <StickyRail>
            <RailIndex aria-hidden="true">{index}</RailIndex>
            <RailTitle id={`${id}-title`}>{label}</RailTitle>
          </StickyRail>
          <div>{children}</div>
        </SectionGrid>
      </Container>
    </Shell>
  );
}
