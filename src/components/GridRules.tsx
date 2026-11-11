import styled from "styled-components";

const Frame = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100%;
  max-width: var(--page-max);
  margin-inline: auto;
  padding-inline: var(--gutter);
`;

/* The rules sit exactly on the content measure, so every layout in the page
   can be read against them. Column count steps with the layout breakpoints. */
const Columns = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-right: 1px solid var(--rule-strong);

  @media (min-width: 48rem) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 62rem) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Line = styled.span`
  border-left: 1px solid var(--rule);

  &:first-child {
    border-left-color: var(--rule-strong);
  }

  &:nth-child(n + 4) {
    display: none;
  }

  @media (min-width: 48rem) {
    &:nth-child(4) {
      display: block;
    }
  }

  @media (min-width: 62rem) {
    &:nth-child(n + 4) {
      display: block;
    }
  }
`;

const COLUMN_COUNT = 6;

/**
 * The fixed column rules the whole layout is measured against. Purely
 * decorative — hidden from assistive tech, immune to pointer events.
 */
export default function GridRules() {
  return (
    <Frame aria-hidden="true">
      <Columns>
        {Array.from({ length: COLUMN_COUNT }, (_, index) => (
          <Line key={index} />
        ))}
      </Columns>
    </Frame>
  );
}
