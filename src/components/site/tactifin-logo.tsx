export function TactifinLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tactifin logo"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="#111318" stroke="white" strokeWidth="2.5" />

      {/* Bar 1 — dark blue, tallest on left */}
      <rect x="12" y="38" width="22" height="46" rx="5" fill="#3B5BDB" />

      {/* Bar 2 — mid blue */}
      <rect x="39" y="28" width="22" height="56" rx="5" fill="#74A0E8" />

      {/* Bar 3 — lightest blue, tallest on right */}
      <rect x="66" y="20" width="22" height="64" rx="5" fill="#B8D0F5" />

      {/* Lightning bolt — green */}
      <path
        d="M57 14 L42 50 L52 50 L43 86 L70 44 L57 44 Z"
        fill="#22C55E"
      />
    </svg>
  );
}
