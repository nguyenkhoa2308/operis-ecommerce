"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Lightweight IntersectionObserver hook (replaces framer-motion)      */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  FadeIn — scroll-reveal wrapper (CSS-only animation)                */
/* ------------------------------------------------------------------ */

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}: FadeInProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(once);

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={`${visible ? "revealed" : ""} ${className}`}
      style={
        visible
          ? { animationDuration: `${duration}s`, animationDelay: `${delay}s` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered children container                                       */
/* ------------------------------------------------------------------ */

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      data-stagger-visible={visible ? "true" : "false"}
      style={{ "--stagger-delay": `${staggerDelay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parent = el.closest("[data-stagger-visible]");
    if (!parent) return;

    /* Calculate child index for stagger delay */
    const siblings = parent.querySelectorAll(":scope > [data-stagger-item]");
    siblings.forEach((s, i) => {
      if (s === el) setIndex(i);
    });

    const check = () => {
      if (parent.getAttribute("data-stagger-visible") === "true") {
        setVisible(true);
      }
    };

    check();
    const mo = new MutationObserver(check);
    mo.observe(parent, { attributes: true, attributeFilter: ["data-stagger-visible"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-stagger-item
      data-reveal="up"
      className={`${visible ? "revealed" : ""} ${className}`}
      style={
        visible
          ? { animationDuration: "0.45s", animationDelay: `${index * 0.1}s` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScaleIn                                                            */
/* ------------------------------------------------------------------ */

export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal="scale"
      className={`${visible ? "revealed" : ""} ${className}`}
      style={
        visible
          ? { animationDuration: "0.4s", animationDelay: `${delay}s` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp — animates a number from 0 to target on scroll reveal      */
/*  Ref-based DOM updates — zero React re-renders                      */
/* ------------------------------------------------------------------ */

interface CountUpProps {
  /** Target value string, e.g. "96%", "↓ 35%", "70%". Extracts the number automatically. */
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1.5, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: wrapRef, visible } = useReveal<HTMLSpanElement>();

  useEffect(() => {
    if (!visible || !ref.current) return;

    // Extract numeric part and preserve prefix/suffix
    const match = value.match(/^([^\d]*?)([\d,.]+)(.*)$/);
    if (!match) {
      ref.current.textContent = value;
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? (numStr.split(".")[1]?.length ?? 0) : 0;
    const hasComma = numStr.includes(",");
    const durationMs = duration * 1000;
    let startTime = 0;
    let rafId: number;

    const formatNum = (n: number) => {
      let s = hasDecimal ? n.toFixed(decimalPlaces) : Math.round(n).toString();
      if (hasComma) {
        const parts = s.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        s = parts.join(".");
      }
      return s;
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      ref.current!.textContent = `${prefix}${formatNum(current)}${suffix}`;

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [visible, value, duration]);

  return (
    <span ref={wrapRef} className={className}>
      <span ref={ref}>{visible ? "" : value.replace(/[\d,.]+/, "0")}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  TypeWriter (ref-based DOM updates — zero React re-renders)         */
/* ------------------------------------------------------------------ */

interface TypeWriterLine {
  text: string;
  className?: string;
}

interface TypeWriterProps {
  lines: TypeWriterLine[];
  className?: string;
  charDelay?: number;
  startDelay?: number;
}

/* Split text into grapheme clusters (handles Vietnamese diacritics correctly) */
const segmenter = new Intl.Segmenter("vi", { granularity: "grapheme" });
function splitGraphemes(text: string): string[] {
  return [...segmenter.segment(text)].map((s) => s.segment);
}

export function TypeWriter({
  lines,
  className = "",
  charDelay = 0.04,
  startDelay = 0,
}: TypeWriterProps) {
  const lineGraphemes = lines.map((l) => splitGraphemes(l.text));
  const totalChars = lineGraphemes.reduce((sum, g) => sum + g.length, 0);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const delayMs = startDelay * 1000;
    const charMs = charDelay * 1000;
    let startTime = 0;
    let prevChars = -1;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delayMs;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const chars = Math.min(Math.floor(elapsed / charMs) + 1, totalChars);
      if (chars !== prevChars) {
        prevChars = chars;
        let remaining = chars;

        for (let i = 0; i < lineGraphemes.length; i++) {
          const g = lineGraphemes[i];
          const show = Math.min(remaining, g.length);
          remaining -= show;

          /* Update text directly — no React re-render */
          if (textRefs.current[i]) {
            textRefs.current[i]!.textContent = g.slice(0, show).join("");
          }

          /* Show cursor only on the line currently being typed */
          const isActive = show > 0 && (show < g.length || remaining === 0);
          if (cursorRefs.current[i]) {
            cursorRefs.current[i]!.style.display =
              isActive && chars < totalChars ? "" : "none";
          }
        }
      }

      if (chars < totalChars) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [startDelay, charDelay, totalChars, lineGraphemes]);

  return (
    <span className={`${className} relative inline-grid`}>
      {/* Invisible placeholder — prevents CLS */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {lines.map((line, i) => (
          <span key={i} className={line.className}>
            {line.text}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </span>

      {/* Animated text — DOM updated directly via refs, zero re-renders */}
      <span className="col-start-1 row-start-1">
        {lines.map((line, i) => (
          <span key={i} className={line.className}>
            <span ref={(el) => { textRefs.current[i] = el; }} />
            <span
              ref={(el) => { cursorRefs.current[i] = el; }}
              className="inline-block w-[3px] h-[0.75em] bg-primary align-middle ml-0.5 animate-pulse"
              style={{ display: "none" }}
            />
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </span>
    </span>
  );
}
