type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 7h11.5M7.5 2 12.5 7l-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 10.5 10.5 2.5M4 2.5h6.5V9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
