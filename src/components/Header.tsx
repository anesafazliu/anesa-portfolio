import { useEffect } from "react";
import styled from "styled-components";
import { navLinks, person, sections } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollState } from "../hooks/useScrollState";
import { Container } from "../styles/primitives";
import MobileMenu from "./MobileMenu";

const SECTION_IDS = sections.map((section) => section.id);

const Bar = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ $scrolled }) =>
    $scrolled
      ? "color-mix(in srgb, var(--paper) 86%, transparent)"
      : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(10px)" : "none")};
  transition: background 0.4s var(--ease);
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  height: 4.5rem;

  @media (min-width: 48rem) {
    height: 5.25rem;
  }
`;

const Wordmark = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.01em;

  &::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    background: var(--accent);
    transition: transform 0.45s var(--ease-out);
  }

  &:hover::before,
  &:focus-visible::before {
    transform: rotate(45deg);
  }

  span {
    color: var(--muted);
  }
`;

const Links = styled.nav`
  display: none;

  @media (min-width: 48rem) {
    display: flex;
    gap: clamp(1.75rem, 3vw, 3rem);
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  position: relative;
  padding-top: 0.875rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? "var(--ink)" : "var(--muted)")};
  transition: color 0.3s var(--ease);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 0.25rem;
    width: ${({ $active }) => ($active ? "100%" : "0.6rem")};
    background: ${({ $active }) =>
      $active ? "var(--accent)" : "var(--rule-strong)"};
    transition: width 0.45s var(--ease-out), background 0.3s var(--ease);
  }

  &:hover,
  &:focus-visible {
    color: var(--ink);
  }

  &:hover::before,
  &:focus-visible::before {
    width: 100%;
    background: var(--accent);
  }
`;

const Toggle = styled.button<{ $open: boolean }>`
  display: grid;
  gap: 0.3125rem;
  padding: 0.5rem;
  margin-right: -0.5rem;

  @media (min-width: 48rem) {
    display: none;
  }

  .bar {
    display: block;
    width: 1.375rem;
    height: 1.5px;
    background: var(--ink);
    transition: transform 0.35s var(--ease-out);
  }

  .bar:first-child {
    transform: ${({ $open }) =>
      $open ? "translateY(3.25px) rotate(45deg)" : "none"};
  }

  .bar:nth-child(2) {
    transform: ${({ $open }) =>
      $open ? "translateY(-3.25px) rotate(-45deg)" : "none"};
  }
`;

const Progress = styled.div<{ $progress: number }>`
  height: 1px;
  background: var(--rule);
  transform-origin: left;

  &::after {
    content: "";
    display: block;
    height: 100%;
    background: var(--accent);
    transform: scaleX(${({ $progress }) => $progress});
    transform-origin: left;
  }
`;

type HeaderProps = {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
};

export default function Header({ menuOpen, onMenuOpenChange }: HeaderProps) {
  const { progress, scrolled } = useScrollState();
  const active = useActiveSection(SECTION_IDS);

  // A resize past the mobile breakpoint should never strand an open overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const query = window.matchMedia("(min-width: 48rem)");
    const close = () => query.matches && onMenuOpenChange(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, [menuOpen, onMenuOpenChange]);

  return (
    <>
      <Bar $scrolled={scrolled || menuOpen}>
        <Inner>
          <Wordmark href="#top" onClick={() => onMenuOpenChange(false)}>
            {person.firstName} <span>{person.lastName}</span>
          </Wordmark>

          <Links aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                href={`#${link.id}`}
                $active={active === link.id}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </Links>

          <Toggle
            type="button"
            $open={menuOpen}
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="visually-hidden">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
          </Toggle>
        </Inner>
        <Progress $progress={progress} aria-hidden="true" />
      </Bar>

      <MobileMenu open={menuOpen} onClose={() => onMenuOpenChange(false)} />
    </>
  );
}
