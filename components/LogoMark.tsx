type LogoMarkProps = {
  className?: string;
  lotus?: boolean;
  leaves?: boolean;
};

// Arched gateway with a lotus bud. Colour comes from `currentColor`, stroke width from className.
export default function LogoMark({ className, lotus = true, leaves = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 150"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M 10 140 L 10 70 A 40 40 0 0 1 90 70 L 90 140" />
      <path d="M 20 140 L 20 70 A 30 30 0 0 1 80 70 L 80 140" />
      <path d="M 50 140 L 50 50" />
      {lotus && (
        <path
          d="M 50 65 C 40 55, 30 75, 50 95 C 70 75, 60 55, 50 65 Z"
          fill="currentColor"
          fillOpacity={0.15}
        />
      )}
      {leaves && (
        <>
          <path d="M 50 75 C 35 60, 25 80, 45 105" />
          <path d="M 50 75 C 65 60, 75 80, 55 105" />
        </>
      )}
    </svg>
  );
}
