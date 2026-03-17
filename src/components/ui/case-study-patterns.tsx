/**
 * Decorative SVG patterns exclusive to Case Study pages.
 */

interface PatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

/* ─────────────────────────────────────────────────────────
   SineWaves — horizontal flowing curves, evokes data / AI
   Great on dark backgrounds.
───────────────────────────────────────────────────────── */
export function SineWaves({
  className = "",
  color = "currentColor",
  opacity = 0.12,
  width = 800,
  height = 400,
  count = 18,
  frequency = 1.8,
  baseAmplitude = 28,
}: PatternProps & {
  width?: number;
  height?: number;
  count?: number;
  frequency?: number;
  baseAmplitude?: number;
}) {
  const steps = 120;

  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={width}
      height={height}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => {
        // Fully deterministic — no Math.random()
        const t = i / (count - 1);
        const yBase = t * height;
        // Vary amplitude and phase per wave using golden-angle-like offsets
        const amp = baseAmplitude * (0.5 + 0.6 * Math.abs(Math.sin(i * 1.3)));
        const phase = i * 2.399; // ≈ 2π / φ² (golden angle in radians)
        const wOpacity = opacity * (0.55 + 0.55 * Math.abs(Math.sin(i * 0.9)));

        // Build path
        let d = "";
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * width;
          const y = yBase + amp * Math.sin((s / steps) * Math.PI * 2 * frequency + phase);
          d += s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : ` L${x.toFixed(1)},${y.toFixed(1)}`;
        }

        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={0.7}
            opacity={wOpacity}
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   HexOutline — honeycomb outline grid (flat-top hexagons)
   Great on light / muted backgrounds.
───────────────────────────────────────────────────────── */
export function HexOutline({
  className = "",
  color = "currentColor",
  opacity = 0.07,
  cellSize = 28,
  cols = 10,
  rows = 6,
}: PatternProps & {
  cellSize?: number;
  cols?: number;
  rows?: number;
}) {
  // Flat-top hex geometry
  const w = cellSize * 2;
  const h = Math.sqrt(3) * cellSize;
  const colW = w * 0.75; // horizontal step
  const svgW = cols * colW + w * 0.25;
  const svgH = rows * h + h * 0.5;

  function hexPath(cx: number, cy: number) {
    const pts = Array.from({ length: 6 }, (_, k) => {
      const angle = (Math.PI / 3) * k; // flat-top: 0° at right
      return `${(cx + cellSize * Math.cos(angle)).toFixed(2)},${(cy + cellSize * Math.sin(angle)).toFixed(2)}`;
    });
    return `M${pts.join("L")}Z`;
  }

  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={svgW}
      height={svgH}
      aria-hidden
    >
      {Array.from({ length: cols }, (_, xi) =>
        Array.from({ length: rows }, (_, yi) => {
          const cx = xi * colW + cellSize;
          const cy = yi * h + (xi % 2 === 0 ? h / 2 : 0) + h / 2;
          return (
            <path
              key={`${xi}-${yi}`}
              d={hexPath(cx, cy)}
              fill="none"
              stroke={color}
              strokeWidth={0.8}
              opacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   CornerArcs — concentric quarter-circles from a corner
───────────────────────────────────────────────────────── */
export function CornerArcs({
  className = "",
  color = "currentColor",
  opacity = 0.06,
  count = 7,
  step = 50,
  origin = "bottom-left",
}: PatternProps & {
  count?: number;
  step?: number;
  origin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}) {
  const size = (count + 1) * step;
  const origins: Record<typeof origin, [number, number]> = {
    "bottom-left":  [0, size],
    "bottom-right": [size, size],
    "top-left":     [0, 0],
    "top-right":    [size, 0],
  };
  const [ox, oy] = origins[origin];

  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={ox}
          cy={oy}
          r={(i + 1) * step}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={opacity}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   DiamondScatter — staggered small diamonds
───────────────────────────────────────────────────────── */
export function DiamondScatter({
  className = "",
  color = "currentColor",
  opacity = 0.08,
  cols = 10,
  rows = 6,
  gap = 36,
  size = 3,
}: PatternProps & { cols?: number; rows?: number; gap?: number; size?: number }) {
  const w = cols * gap;
  const h = rows * gap;
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={w}
      height={h}
      aria-hidden
    >
      {Array.from({ length: cols }, (_, xi) =>
        Array.from({ length: rows }, (_, yi) => {
          const cx = xi * gap + gap / 2 + (yi % 2 === 0 ? 0 : gap / 2);
          const cy = yi * gap + gap / 2;
          return (
            <polygon
              key={`${xi}-${yi}`}
              points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
              fill={color}
              opacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}
