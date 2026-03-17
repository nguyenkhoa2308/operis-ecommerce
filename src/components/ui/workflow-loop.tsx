"use client";

import { useEffect, useRef, useState } from "react";

interface WorkflowStep {
  title: string;
  desc: string;
}

interface WorkflowLoopProps {
  steps: WorkflowStep[];
  accentBg: string; // e.g. "bg-violet"
  /** Milliseconds each step stays active */
  interval?: number;
}

export function WorkflowLoop({
  steps,
  accentBg,
  interval = 2500,
}: WorkflowLoopProps) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Only animate when visible */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, interval);
    return () => clearInterval(id);
  }, [inView, steps.length, interval]);

  return (
    <div ref={sectionRef}>
      {/* ── Desktop: horizontal loop ── */}
      <div className="hidden md:block">
        <div className="flex items-start">
          {steps.map((step, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <div key={i} className="flex items-start flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  {/* Step circle */}
                  <div className="relative mb-4">
                    {/* Ping ring when active */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 rounded-2xl ${accentBg} animate-ping opacity-20`}
                      />
                    )}
                    <div
                      className={`
                        relative w-14 h-14 rounded-2xl flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${isActive
                          ? `${accentBg} shadow-lg scale-110`
                          : isPast
                            ? `${accentBg} opacity-60 shadow-md`
                            : "bg-muted/80 shadow-sm"
                        }
                      `}
                    >
                      <span
                        className={`font-black text-lg transition-colors duration-500 ${
                          isActive || isPast ? "text-white" : "text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <h3
                    className={`font-bold text-sm leading-snug mb-2 transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed max-w-[180px] transition-all duration-500 ${
                      isActive
                        ? "text-muted-foreground opacity-100"
                        : "text-muted-foreground/60 opacity-70"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex items-center pt-6 shrink-0 px-2 h-14">
                    <div className="relative w-full min-w-[32px]">
                      {/* Background track */}
                      <div className="h-[2px] w-full bg-border rounded-full" />
                      {/* Animated fill */}
                      <div
                        className={`absolute top-0 left-0 h-[2px] rounded-full transition-all duration-700 ease-out ${accentBg} ${
                          isPast || (isActive && i < active)
                            ? "w-full opacity-60"
                            : isActive
                              ? "w-full opacity-80"
                              : "w-0 opacity-0"
                        }`}
                      />
                      {/* Traveling dot */}
                      {isActive && (
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${accentBg} shadow-md`}
                          style={{
                            animation: `travelRight ${interval}ms linear infinite`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step indicator dots */}
        <div className="flex justify-center gap-2 mt-10">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${i === active ? `${accentBg} w-6` : "bg-border hover:bg-muted-foreground/30"}
              `}
              aria-label={`Bước ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical loop ── */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical track */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-border"
            aria-hidden
          />

          <div className="space-y-5">
            {steps.map((step, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <div
                  key={i}
                  className="flex gap-4 items-start relative"
                  onClick={() => setActive(i)}
                >
                  {/* Node */}
                  <div className="relative shrink-0 z-10">
                    {isActive && (
                      <div
                        className={`absolute inset-0 rounded-xl ${accentBg} animate-ping opacity-20`}
                      />
                    )}
                    <div
                      className={`
                        relative w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${isActive
                          ? `${accentBg} shadow-lg scale-110`
                          : isPast
                            ? `${accentBg} opacity-50`
                            : "bg-muted/80"
                        }
                      `}
                    >
                      <span
                        className={`font-black text-sm transition-colors duration-500 ${
                          isActive || isPast ? "text-white" : "text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 min-w-0 pt-1 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <h3
                      className={`font-bold text-base leading-snug mb-1 transition-colors duration-500 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed overflow-hidden transition-all duration-500 ${
                        isActive
                          ? "max-h-40 opacity-100 text-muted-foreground"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile step dots */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${i === active ? `${accentBg} w-6` : "bg-border"}
              `}
              aria-label={`Bước ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Keyframes for traveling dot */}
      <style jsx>{`
        @keyframes travelRight {
          0% { left: 0; }
          100% { left: calc(100% - 8px); }
        }
      `}</style>
    </div>
  );
}
