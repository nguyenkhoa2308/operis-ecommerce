"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ComponentProps, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Reusable scroll-reveal wrapper                                     */
/* ------------------------------------------------------------------ */

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

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
  const { x, y } = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered children container                                       */
/* ------------------------------------------------------------------ */

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  ...props
}: ComponentProps<typeof motion.div> & { staggerDelay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scale-in (for badges, icons, etc.)                                 */
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typewriter text effect                                              */
/* ------------------------------------------------------------------ */

interface TypeWriterLine {
  text: string;
  className?: string;
}

interface TypeWriterProps {
  lines: TypeWriterLine[];
  className?: string;
  charDelay?: number;
  lineDelay?: number;
  startDelay?: number;
}

export function TypeWriter({
  lines,
  className = "",
  charDelay = 0.04,
  lineDelay = 0.4,
  startDelay = 0.5,
}: TypeWriterProps) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  if (!started) {
    return (
      <span className={className}>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[0.8em] bg-current align-middle"
        />
      </span>
    );
  }

  let charOffset = 0;

  return (
    <span className={className}>
      {lines.map((line, lineIdx) => {
        const lineStart = charOffset * charDelay + lineIdx * lineDelay;
        const chars = line.text.split("");

        const rendered = chars.map((char, ci) => {
          const d = lineStart + ci * charDelay;
          return (
            <motion.span
              key={`${lineIdx}-${ci}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: d }}
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char}
            </motion.span>
          );
        });

        charOffset += chars.length;

        return (
          <span key={lineIdx} className={line.className}>
            {rendered}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
      <CursorBlink
        showAfter={charOffset * charDelay + (lines.length - 1) * lineDelay}
      />
    </span>
  );
}

function CursorBlink({ showAfter }: { showAfter: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), (showAfter + 2.5) * 1000);
    return () => clearTimeout(timer);
  }, [showAfter]);

  if (!visible) return null;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, delay: showAfter }}
      className="inline-block w-[3px] h-[0.75em] bg-primary align-middle ml-0.5"
    />
  );
}
