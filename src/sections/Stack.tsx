import styled, { keyframes } from "styled-components";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { stack } from "../data/portfolio";

const Intro = styled.p`
  max-width: 46ch;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
`;

const Layers = styled.ol`
  margin-top: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid var(--rule-strong);
`;

/**
 * Each layer carries a segment of a single continuous rule down the left.
 * Stacked, they read as one application from the screen down to the database —
 * which is the whole claim this page is making.
 */
const Layer = styled(Reveal)`
  display: grid;
  align-content: start;
  gap: 0.85rem;
  padding: clamp(1.5rem, 3.5vw, 2.25rem) 0 clamp(1.5rem, 3.5vw, 2.25rem)
    clamp(1.25rem, 3vw, 2rem);
  border-bottom: 1px solid var(--rule);
  border-left: 2px solid var(--rule-strong);
  transition: border-left-color 0.4s var(--ease);

  @media (min-width: 48rem) {
    grid-template-columns: 2.75rem 11rem minmax(0, 1fr);
    align-items: baseline;
    gap: clamp(1.25rem, 3vw, 2.5rem);
  }

  &:hover {
    border-left-color: var(--accent);
  }

  .index {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--accent);
  }

  .head {
    display: grid;
    gap: 0.15rem;
  }

  h3 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    line-height: 1.05;
    letter-spacing: -0.015em;
  }

  .summary {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
`;

const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.9rem;

  li {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    letter-spacing: -0.005em;
    color: var(--ink-soft);
  }

  /* Hairline separators instead of chips — quieter, and it reads as a list.
     They trail the item rather than lead the next one, so a wrapped line
     never begins with a dangling separator. */
  li:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 0.3125rem;
    height: 1px;
    margin-left: 0.9rem;
    background: var(--rule-strong);
    vertical-align: middle;
  }
`;

const Block = styled.div`
  margin-top: clamp(2.75rem, 7vw, 4.5rem);

  > h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid var(--rule-strong);

    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }

  > h3::before {
    content: "";
    width: 1.5rem;
    height: 0.3125rem;
    background: var(--accent);
  }
`;

/* The languages get the largest type in the section — they are the part of a
   stack that outlives any one framework in it. */
const Languages = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1.25rem;
  padding-top: 1.5rem;

  li {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 5vw, 3.25rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--ink);
    transition: color 0.3s var(--ease);
  }

  /* The accent block again, shrunk to a separator, so six names at display
     size read as a list rather than one long phrase. */
  li:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 0.3125rem;
    height: 0.3125rem;
    margin-left: 1.25rem;
    background: var(--accent);
    vertical-align: 0.3em;
  }

  li:hover {
    color: var(--accent);
  }
`;

const toolRipple = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.15);
    opacity: 0.7;
  }

  to {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
`;

const Tools = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding-top: 1.25rem;

  li {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 0.4rem 0.75rem;
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--rule-strong);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    transition: box-shadow 0.3s var(--ease);

    &::before,
    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 1.5rem;
      aspect-ratio: 1;
      border: 1px solid var(--accent);
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    &::after {
      animation-delay: 0.14s;
    }

    &:hover {
      box-shadow: inset 0 0 0 1px var(--accent);
    }

    &:hover::before,
    &:hover::after {
      animation: ${toolRipple} 0.75s var(--ease-out) both;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    li:hover::before,
    li:hover::after {
      animation: none;
    }
  }
`;

export default function Stack() {
  return (
    <Section id="stack" tone="sunk">
      <Reveal>
        <Intro>Top of the application to the bottom.</Intro>
      </Reveal>

      <Layers>
        {stack.layers.map((layer, index) => (
          <Layer key={layer.name} forwardedAs="li" delay={index * 70}>
            <span className="index" aria-hidden="true">
              {layer.index}
            </span>

            <span className="head">
              <h3>{layer.name}</h3>
              <span className="summary">{layer.summary}</span>
            </span>

            <Items>
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Items>
          </Layer>
        ))}
      </Layers>

      <Reveal delay={60}>
        <Block>
          <h3>Programming Languages</h3>
          <Languages>
            {stack.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </Languages>
        </Block>
      </Reveal>

      <Reveal delay={120}>
        <Block>
          <h3>Tools</h3>
          <Tools>
            {stack.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </Tools>
        </Block>
      </Reveal>
    </Section>
  );
}
