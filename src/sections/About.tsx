import styled from "styled-components";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { about } from "../data/portfolio";
import { Body, Lead } from "../styles/primitives";

const Columns = styled.div`
  display: grid;
  gap: clamp(2.5rem, 6vw, 4.5rem);
  margin-top: clamp(2.5rem, 6vw, 4rem);

  @media (min-width: 48rem) {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const Prose = styled.div`
  display: grid;
  gap: 1.35rem;
  max-width: 62ch;
`;

const Aside = styled.div`
  display: grid;
  gap: 2.25rem;

  @media (min-width: 48rem) {
    padding-top: 0.5rem;
  }
`;

const Facts = styled.dl`
  display: grid;
`;

const Fact = styled.div`
  display: grid;
  gap: 0.2rem;
  padding-block: 0.9rem;
  border-top: 1px solid var(--rule);

  &:last-child {
    border-bottom: 1px solid var(--rule);
  }

  dt {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }

  dd {
    font-size: 0.9375rem;
    color: var(--ink);
  }
`;

export default function About() {
  return (
    <Section id="about">
      <Reveal variant="mask">
        <Lead>{about.lead}</Lead>
      </Reveal>

      <Columns>
        <Prose>
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 70}>
              <Body>{paragraph}</Body>
            </Reveal>
          ))}
        </Prose>

        <Aside>
          <Reveal delay={120}>
            <Facts>
              {about.facts.map((fact) => (
                <Fact key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </Fact>
              ))}
            </Facts>
          </Reveal>
        </Aside>
      </Columns>
    </Section>
  );
}
