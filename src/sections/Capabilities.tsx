import styled from "styled-components";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { capabilities } from "../data/portfolio";
import { Lead } from "../styles/primitives";

const List = styled.ol`
  margin-top: clamp(2.5rem, 6vw, 4rem);
  border-top: 1px solid var(--rule-strong);
`;

const Item = styled(Reveal)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 0.75rem;
  padding-block: clamp(1.75rem, 4vw, 2.75rem);
  border-bottom: 1px solid var(--rule);

  @media (min-width: 48rem) {
    grid-template-columns: 3rem minmax(0, 1fr) minmax(0, 1.15fr);
    align-items: start;
    gap: clamp(1.5rem, 4vw, 3rem);
  }

  .index {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--accent);

    @media (min-width: 48rem) {
      padding-top: 0.55rem;
    }
  }

  h3 {
    font-family: var(--font-display);
    font-size: clamp(1.625rem, 3.2vw, 2.375rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    transition: color 0.35s var(--ease);
  }

  p {
    font-size: clamp(0.9375rem, 1.1vw, 1.0625rem);
    line-height: 1.75;
    color: var(--ink-soft);
    max-width: 52ch;

    @media (min-width: 48rem) {
      padding-top: 0.35rem;
    }
  }

  &:hover h3 {
    color: var(--accent);
  }
`;

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <Reveal variant="mask">
        <Lead>
          Four areas, one person so nothing is handed over a wall halfway
          through.
        </Lead>
      </Reveal>

      <List>
        {capabilities.map((capability, index) => (
          <Item key={capability.id} forwardedAs="li" delay={index * 70}>
            <span className="index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{capability.title}</h3>
            <p>{capability.detail}</p>
          </Item>
        ))}
      </List>
    </Section>
  );
}
