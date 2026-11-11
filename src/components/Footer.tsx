import styled from "styled-components";
import { person } from "../data/portfolio";
import { Container } from "../styles/primitives";

type FooterProps = {
  inert?: boolean;
};

const Shell = styled.footer`
  position: relative;
  z-index: 1;
  background: var(--ink);
  color: var(--on-ink-muted);
  padding-bottom: clamp(2rem, 5vw, 3rem);
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--rule-on-ink);

  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Top = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--on-ink);

  &::before {
    content: "";
    width: 1.5rem;
    height: 0.1875rem;
    background: var(--accent);
    transition: width 0.45s var(--ease-out);
  }

  &:hover::before,
  &:focus-visible::before {
    width: 2.5rem;
  }
`;

export default function Footer({ inert = false }: FooterProps) {
  return (
    <Shell inert={inert}>
      <Container>
        <Inner>
          <span>
            &copy; {new Date().getFullYear()} {person.fullName}
          </span>
          <Top href="#top">Back to top</Top>
        </Inner>
      </Container>
    </Shell>
  );
}
