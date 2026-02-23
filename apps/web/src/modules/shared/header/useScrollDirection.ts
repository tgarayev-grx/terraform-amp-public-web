"use client";

import { useState, useEffect, useRef } from "react";

type ScrollDirection = "up" | "down" | null;

/**
 * Returns "up" or "down" only after scroll delta exceeds threshold pixels.
 * Uses requestAnimationFrame for performance. Returns null until first meaningful scroll.
 */
export function useScrollDirection(threshold = 10): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (Math.abs(currentScrollY - lastScrollY.current) >= threshold) {
            setScrollDirection(
              currentScrollY > lastScrollY.current ? "down" : "up"
            );
            lastScrollY.current = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrollDirection;
}
