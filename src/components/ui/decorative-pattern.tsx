/** Decorative concentric circles SVG pattern — positioned absolute, hidden overflow */
export function ConcentricCircles({
  className = "",
  color = "currentColor",
  opacity = 0.04,
  size = 500,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const rings = 10;
  const gap = size / (rings * 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: rings }).map((_, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={gap * (i + 1)}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={opacity}
        />
      ))}
    </svg>
  );
}

/** Decorative dot grid pattern */
export function DotGrid({
  className = "",
  color = "currentColor",
  opacity = 0.06,
  cols = 12,
  rows = 8,
  gap = 24,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  cols?: number;
  rows?: number;
  gap?: number;
}) {
  const w = cols * gap;
  const h = rows * gap;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * gap + gap / 2}
            cy={r * gap + gap / 2}
            r={2}
            fill={color}
            opacity={opacity}
          />
        )),
      )}
    </svg>
  );
}
