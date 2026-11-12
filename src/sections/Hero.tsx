import { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowRight, ArrowUpRight } from "../components/Icons";
import { PrimaryCta, SecondaryCta } from "../styles/cta";
import { person, socials } from "../data/portfolio";
import { Container } from "../styles/primitives";

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 0.75rem, 0);
  }
`;

const riseUp = keyframes`
  from {
    transform: translateY(100%);
  }
`;

const Shell = styled.section`
  position: relative;
  z-index: 1;
  padding-top: clamp(6rem, 12vh, 8rem);
  padding-bottom: clamp(2rem, 5vw, 4rem);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--rule);

  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);

  animation: ${riseIn} 0.7s var(--ease-out) both;

  strong {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 500;
    color: var(--ink);
  }

  strong::before {
    content: "";
    width: 1.5rem;
    height: 0.3125rem;
    background: var(--accent);
  }
`;

const Name = styled.h1`
  margin-top: clamp(1rem, 3vw, 2rem);
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3.5rem, 14vw, 12rem);
  line-height: 0.85;
  letter-spacing: -0.035em;

  @media (min-width: 48rem) {
    padding-left: 35px;
  }
`;

const Line = styled.span<{ $delay: number }>`
  display: block;
  overflow: hidden;

  em {
    display: block;
    font-style: normal;
    animation: ${riseUp} 1s var(--ease-out) both;
    animation-delay: ${({ $delay }) => $delay}ms;
  }
`;

const Indent = styled(Line)`
  @media (min-width: 48rem) {
    padding-left: 16.6667%;
  }
`;

const Lower = styled.div`
  display: grid;
  row-gap: clamp(1.5rem, 4vw, 3rem);
  column-gap: 0;
  margin-top: clamp(1.5rem, 4vw, 3rem);
  animation: ${riseIn} 0.8s var(--ease-out) 0.45s both;

  /* Grid items default to a min-content minimum; opt every column out. */
  > * {
    min-width: 0;
  }

  @media (min-width: 62rem) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    align-items: end;

    .intro {
      grid-column: 1 / 4;
      grid-row: 1;
    }

    .actions {
      grid-column: 1 / 4;
      grid-row: 2;
    }

    .socials {
      grid-column: 4 / 7;
      grid-row: 1 / 3;
    }
  }
`;

const Intro = styled.p`
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 2vw, 1.65rem);
  line-height: 1.32;
  color: var(--ink);

  @media (min-width: 48rem) {
    padding-left: 35px;
  }

  b {
    font-weight: 400;
    box-shadow: inset 0 -0.08em 0 var(--accent);
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0.75rem;
  width: 100%;

  > a {
    width: 100%;
    min-width: 0;
    justify-content: space-between;
    padding-inline: 0.5rem;
  }

  @media (min-width: 48rem) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 62rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 30rem) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.75rem;
  }
`;

const Socials = styled.ul`
  display: flex;
  flex-direction: column;

  @media (min-width: 62rem) {
    padding-left: clamp(0rem, 4vw, 3rem);
  }
`;

const SocialRow = styled.li`
  border-top: 1px solid var(--rule);

  &:last-child {
    border-bottom: 1px solid var(--rule);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.65rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: var(--muted);
    transition: color 0.3s var(--ease);
  }

  a:hover,
  a:focus-visible {
    color: var(--ink);
  }

  .label {
    color: var(--ink);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.6875rem;
  }

  .handle {
    flex: 1;
    /* Without this the nowrap handle sets the row's minimum width and the
       whole hero column overflows on the narrowest phones. */
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }

  svg {
    flex-shrink: 0;
    color: var(--muted);
    transition: color 0.3s var(--ease), transform 0.4s var(--ease-out);
  }

  a:hover svg,
  a:focus-visible svg {
    color: var(--accent);
    transform: translate(0.2rem, -0.2rem);
  }
`;

/** Splits the intro so the named technologies can carry the accent rule. */
function splitIntro(text: string, terms: readonly string[]) {
  const escaped = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  return text
    .split(pattern)
    .filter(Boolean)
    .map((piece) => ({ text: piece, accent: terms.includes(piece) }));
}

export default function Hero() {
  const introParts = useMemo(
    () => splitIntro(person.intro, person.introHighlights),
    []
  );

  return (
    <Shell id="top">
      <Container>
        <Meta>
          <strong>{person.title}</strong>
        </Meta>

        <Name>
          {/* The visual name is split across two lines; the readable name is
              given once, whole, so it is never announced as one word. */}
          <span className="visually-hidden">{person.fullName}</span>
          <span aria-hidden="true">
            <Line $delay={80}>
              <em>{person.firstName}</em>
            </Line>
            <Indent $delay={200}>
              <em>{person.lastName}</em>
            </Indent>
          </span>
        </Name>

        <Lower>
          <Intro className="intro">
            {introParts.map((part, index) =>
              part.accent ? <b key={index}>{part.text}</b> : part.text
            )}
          </Intro>

          <Actions className="actions">
            <PrimaryCta href="#capabilities">
              <span>What I build</span>
              <ArrowRight />
            </PrimaryCta>
            <SecondaryCta href="#stack">
              <span>The stack</span>
              <ArrowRight />
            </SecondaryCta>
          </Actions>

          <Socials className="socials">
            {socials.map((social) => (
              <SocialRow key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                >
                  <span className="label">{social.label}</span>{" "}
                  <span className="handle">{social.handle}</span>{" "}
                  <ArrowUpRight />
                </a>
              </SocialRow>
            ))}
          </Socials>
        </Lower>
      </Container>
    </Shell>
  );
}
