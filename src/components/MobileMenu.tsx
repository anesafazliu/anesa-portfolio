import { useEffect, useRef } from "react";
import styled from "styled-components";
import { navLinks, socials } from "../data/portfolio";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { ArrowUpRight } from "./Icons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6.5rem var(--gutter) calc(var(--gutter) + 1rem);
  background: var(--paper);

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transform: translateY(${({ $open }) => ($open ? "0" : "-1.5rem")});
  transition:
    opacity 0.45s var(--ease-out),
    transform 0.45s var(--ease-out),
    visibility 0.45s;

  @media (min-width: 48rem) {
    display: none;
  }
`;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li<{ $open: boolean; $index: number }>`
  border-top: 1px solid var(--rule);

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "0.75rem")});
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.5s var(--ease-out);
  transition-delay: ${({ $open, $index }) => ($open ? 120 + $index * 55 : 0)}ms;

  &:last-child {
    border-bottom: 1px solid var(--rule);
  }
`;

const ItemLink = styled.a`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-block: 1.05rem;

  font-family: var(--font-display);
  font-size: clamp(2.25rem, 12vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.02em;

  small {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.16em;
    color: var(--accent);
  }
`;

const Foot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--muted);
`;

const FootLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink);
`;

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <Overlay
      ref={overlayRef}
      id="mobile-menu"
      $open={open}
      /* Keep the closed menu out of the tab order and the a11y tree. */
      inert={!open}
    >
      <nav aria-label="Mobile">
        <Items>
          {navLinks.map((link, index) => (
            <Item key={link.id} $open={open} $index={index}>
              <ItemLink href={`#${link.id}`} onClick={onClose}>
                <small aria-hidden="true">{index + 1}</small>
                {link.label}
              </ItemLink>
            </Item>
          ))}
        </Items>
      </nav>

      <Foot>
        {socials.map((social) => (
          <FootLink
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {social.handle}
            <ArrowUpRight />
          </FootLink>
        ))}
      </Foot>
    </Overlay>
  );
}
