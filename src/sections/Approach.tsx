import styled from "styled-components";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { principles } from "../data/portfolio";

const Grid = styled.ol`
  display: grid;
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  border-top: 1px solid var(--rule-strong);

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(1.5rem, 4vw, 3.5rem);
  }
`;

const Item = styled(Reveal)`
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.5rem;
  padding-block: clamp(1.5rem, 3vw, 2rem);
  border-bottom: 1px solid var(--rule);

  /* A rule that fills in as the eye lands on it. */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.55s var(--ease-out);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  .no {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: var(--accent);
  }

  h3 {
    font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--ink-soft);
    max-width: 48ch;
  }
`;

export default function Approach() {
  return (
    <Section id="approach">
      <Grid>
        {principles.map((principle, index) => (
          <Item key={principle.title} forwardedAs="li" delay={index * 70}>
            <span className="no" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{principle.title}</h3>
            <p>{principle.detail}</p>
          </Item>
        ))}
      </Grid>
    </Section>
  );
}
