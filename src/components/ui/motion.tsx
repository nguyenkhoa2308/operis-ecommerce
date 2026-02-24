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
/*  TypeWriter (pure React — no framer-motion)                         */
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

export function TypeWriter({
  lines,
  className = "",
  charDelay = 0.04,
  startDelay = 0,
}: TypeWriterProps) {
  const [started, setStarted] = useState(startDelay <= 0);
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = lines.reduce((sum, l) => sum + l.text.length, 0);

  useEffect(() => {
    if (startDelay <= 0) return;
    const timer = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || visibleChars >= totalChars) return;
    const timer = setTimeout(
      () => setVisibleChars((v) => v + 1),
      charDelay * 1000,
    );
    return () => clearTimeout(timer);
  }, [started, visibleChars, totalChars, charDelay]);

  let charOffset = 0;

  return (
    <span className={`${className} relative inline-grid`}>
      {/* Invisible placeholder — prevents CLS */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className={line.className}>
            {line.text}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        ))}
      </span>

      {/* Animated text */}
      <span className="col-start-1 row-start-1">
        {!started ? (
          <span className="inline-block w-[3px] h-[0.8em] bg-current align-middle animate-pulse" />
        ) : (
          <>
            {lines.map((line, lineIdx) => {
              const lineStart = charOffset;
              charOffset += line.text.length;

              return (
                <span key={lineIdx} className={line.className}>
                  {line.text.split("").map((char, ci) => {
                    const globalIdx = lineStart + ci;
                    return (
                      <span
                        key={ci}
                        style={{
                          opacity: globalIdx < visibleChars ? 1 : 0,
                          display: char === " " ? "inline" : "inline-block",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {lineIdx < lines.length - 1 && <br />}
                </span>
              );
            })}
            {visibleChars < totalChars && (
              <span className="inline-block w-[3px] h-[0.75em] bg-primary align-middle ml-0.5 animate-pulse" />
            )}
          </>
        )}
      </span>
    </span>
  );
}
