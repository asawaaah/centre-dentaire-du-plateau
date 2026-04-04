"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  sectionTitle: string;
  sectionSubtitle: string;
}

const AUTOPLAY_MS = 5500;

export function TestimonialsCarousel({
  testimonials,
  sectionTitle,
  sectionSubtitle,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = testimonials.length;

  const go = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setAnimating(false), 450);
    },
    [animating, total]
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStartX.current = null;
  };

  const t = testimonials[current];

  return (
    <section
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 bg-surface-container-low overflow-hidden"
      aria-label={sectionTitle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-primary mb-4">
            {sectionTitle}
          </h2>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Card */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-30 -z-10"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(0,106,102,0.18) 0%, transparent 70%)" }}
          />

          <div
            className="bg-surface-container-lowest rounded-[2.5rem] px-10 py-14 sm:px-16 sm:py-16 text-center transition-all duration-500"
            style={{
              boxShadow: "0 10px 40px -10px rgba(0, 106, 102, 0.10)",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px) scale(0.99)" : "translateY(0) scale(1)",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed/20 flex items-center justify-center">
                <Quote className="text-primary" size={28} aria-hidden="true" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8" aria-label="5 étoiles">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ color: "#006a66" }}
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="font-heading text-xl sm:text-2xl lg:text-[1.6rem] text-on-surface italic leading-relaxed mb-8 max-w-3xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-signature flex items-center justify-center flex-shrink-0">
                <span className="text-on-primary font-heading font-bold text-sm">
                  {t.author.charAt(0)}
                </span>
              </div>
              <p className="font-body font-semibold text-on-surface text-base">
                {t.author}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 16px -4px rgba(0,106,102,0.12)" }}
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5" role="tablist" aria-label="Témoignages">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => go(i)}
                  className="transition-all duration-400 rounded-full"
                  style={{
                    width: i === current ? "2rem" : "0.625rem",
                    height: "0.625rem",
                    background: i === current ? "#006a66" : "rgba(0,106,102,0.25)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 16px -4px rgba(0,106,102,0.12)" }}
            >
              <ChevronRight size={20} className="text-primary" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-6 mx-auto max-w-xs h-0.5 bg-primary-fixed/20 rounded-full overflow-hidden">
            <div
              key={`${current}-${paused}`}
              className="h-full bg-primary rounded-full"
              style={{
                animation: paused ? "none" : `progressBar ${AUTOPLAY_MS}ms linear forwards`,
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
