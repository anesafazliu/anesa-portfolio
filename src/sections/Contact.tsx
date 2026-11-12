import styled from "styled-components";
import { ArrowUpRight } from "../components/Icons";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { contact, person, socials } from "../data/portfolio";

const Lead = styled.p`
  max-width: 24ch;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-ink-muted);
`;

const Statement = styled.p`
  margin-top: clamp(1.5rem, 4vw, 2.25rem);
  max-width: 18ch;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 9vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--on-ink);
`;

const Mail = styled.a`
  position: relative;
  display: inline-block;
  margin-top: clamp(1.75rem, 4vw, 2.75rem);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 5.4vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--on-ink);
  /* Long address, narrow phone: never let it push the page sideways. */
  overflow-wrap: anywhere;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.1em;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform-origin: left;
    transition: transform 0.5s var(--ease-out);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(0);
    transform-origin: right;
  }
`;

const Note = styled.p`
  margin-top: 1.5rem;
  max-width: 40ch;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--on-ink-muted);
`;

const Directory = styled.ul`
  margin-top: clamp(3rem, 7vw, 4.5rem);
  border-top: 1px solid var(--rule-on-ink);

  @media (min-width: 62rem) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(2rem, 5vw, 4rem);
  }
`;

const Row = styled.li`
  border-bottom: 1px solid var(--rule-on-ink);

  a {
    display: grid;
    /* marker · label · value · arrow — all four on one row at any width. */
    grid-template-columns: 0.625rem max-content minmax(0, 1fr) 0.8125rem;
    align-items: center;
    gap: 0.75rem;
    padding-block: 1.1rem;
    color: var(--on-ink-muted);
    transition: color 0.3s var(--ease);
  }

  a::before {
    content: "";
    width: 100%;
    height: 0.1875rem;
    background: var(--accent);
    transition: transform 0.45s var(--ease-out);
  }

  a:hover,
  a:focus-visible {
    color: var(--on-ink);
  }

  a:hover::before,
  a:focus-visible::before {
    transform: scaleX(1.6);
    transform-origin: left;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-ink);
  }

  .value {
    justify-self: end;
    min-width: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.4s var(--ease-out);
  }

  a:hover svg,
  a:focus-visible svg {
    transform: translate(0.2rem, -0.2rem);
  }
`;

export default function Contact() {
  return (
    <Section id="contact" tone="ink">
      <Reveal>
        <Lead>{contact.lead}</Lead>
      </Reveal>

      <Reveal variant="mask" delay={60}>
        <Statement>Let&rsquo;s build it.</Statement>
      </Reveal>

      <Reveal delay={120}>
        <Mail href={`mailto:${person.email}`}>{person.email}</Mail>
        <Note>{contact.note}</Note>
      </Reveal>

      <Reveal delay={180}>
        <Directory>
          {socials
            .map((social) => (
              <Row key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  <span className="label">{social.label}</span>{" "}
                  <span className="value">{social.handle}</span>{" "}
                  <ArrowUpRight />
                </a>
              </Row>
            ))}
        </Directory>
      </Reveal>
    </Section>
  );
}
