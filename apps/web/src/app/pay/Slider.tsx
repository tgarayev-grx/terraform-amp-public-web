"use client";

/**
 * Slider – compound component for a slide carousel.
 * No context value passing: Slider only holds currentIndex and state. You map slides yourself.
 *
 * Anatomy:
 *   Slider.Root totalSlides={n}  – state provider (only needs count for dots/bounds)
 *   Slider.Container              – draggable wrapper (ref + pointer/touch)
 *   Slider.Dots                   – pill + dot buttons
 *   Slider.Content                – fade wrapper; you put inside e.g. slides[currentIndex] via useSliderContext()
 *   Slider.SlideStack             – stacks children (one per slide); you pass slides.map(...), we show active by index
 *   useSliderContext()            – currentIndex, isFadingOut, goTo, goToPrev, goToNext, totalSlides
 */

import {
  Children,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";

const FADE_DURATION_MS = 100;
const DRAG_THRESHOLD_PX = 50;
const DOT_GAP_PX = 8;
const PILL_WIDTH_PX = 32;
const PILL_HEIGHT_PX = 8;
const DOT_STEP_PX = 8;
const PILL_EXPAND_MS = 120;
const PILL_SHRINK_MS = 120;

type PillPhase = "idle" | "expanding" | "shrinking";

/** Slider context: current index, navigation, and container ref + pointer/touch handlers. You map slides yourself. */
export type SliderContextValue = {
  totalSlides: number;
  currentIndex: number;
  isFadingOut: boolean;
  goTo: (index: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  slideForSlot: (slotIndex: number) => number;
  getPillStyle: () => { left: number; width: number };
  pillPhase: PillPhase;
  slotCount: number;
  dotsRowWidthPx: number;
  stepPx: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerMove: (e: React.PointerEvent) => void;
  handlePointerUp: (e: React.PointerEvent) => void;
  handlePointerLeave: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleTouchCancel: () => void;
};

const SliderContext = createContext<SliderContextValue | null>(null);

export function useSliderContext(): SliderContextValue {
  const ctx = useContext(SliderContext);
  if (!ctx)
    throw new Error(
      "Slider compound components must be used within Slider.Root"
    );
  return ctx;
}

type SliderRootProps = {
  /** Number of slides (for dots and prev/next bounds). You map and render slides yourself. */
  totalSlides: number;
  children: ReactNode;
};

export const SliderRoot = memo(({ totalSlides, children }: SliderRootProps) => {
  const slotCount = totalSlides + 1;
  const dotsRowWidthPx = slotCount * DOT_STEP_PX - DOT_GAP_PX;
  const stepPx = DOT_STEP_PX + DOT_GAP_PX;
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setFadingOut] = useState(false);
  const [pillPhase, setPillPhase] = useState<PillPhase>("idle");
  const [pillStep, setPillStep] = useState(0);
  const pillFromIndex = useRef(0);
  const pillTargetIndex = useRef(0);
  const pillDirection = useRef<1 | -1>(1);
  const pendingIndex = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isFadingOut) return;
    const t = setTimeout(() => {
      setCurrentIndex(pendingIndex.current);
      setFadingOut(false);
    }, FADE_DURATION_MS);
    return () => clearTimeout(t);
  }, [isFadingOut]);

  useEffect(() => {
    if (pillPhase !== "expanding") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPillStep(1));
    });
    const t = setTimeout(() => {
      setPillPhase("shrinking");
      setPillStep(0);
    }, PILL_EXPAND_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pillPhase]);

  useEffect(() => {
    if (pillPhase !== "shrinking") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPillStep(1));
    });
    const t = setTimeout(() => setPillPhase("idle"), PILL_SHRINK_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pillPhase]);

  const startPillAnimation = useCallback(
    (targetIndex: number) => {
      pillFromIndex.current = currentIndex;
      pillTargetIndex.current = targetIndex;
      pillDirection.current = targetIndex > currentIndex ? 1 : -1;
      setPillPhase("expanding");
      setPillStep(0);
    },
    [currentIndex]
  );

  const goToPrev = useCallback(() => {
    if (currentIndex <= 0) return;
    pendingIndex.current = currentIndex - 1;
    setFadingOut(true);
    startPillAnimation(currentIndex - 1);
  }, [currentIndex, startPillAnimation]);

  const goToNext = useCallback(() => {
    if (currentIndex >= totalSlides - 1) return;
    pendingIndex.current = currentIndex + 1;
    setFadingOut(true);
    startPillAnimation(currentIndex + 1);
  }, [currentIndex, totalSlides, startPillAnimation]);

  const goTo = useCallback(
    (index: number) => {
      if (!didDrag.current && index !== currentIndex) {
        pendingIndex.current = index;
        setFadingOut(true);
        startPillAnimation(index);
      }
    },
    [currentIndex, startPillAnimation]
  );

  const getPillStyle = useCallback((): { left: number; width: number } => {
    if (pillPhase === "idle") {
      return { left: currentIndex * stepPx, width: PILL_WIDTH_PX };
    }
    const from = pillFromIndex.current;
    const target = pillTargetIndex.current;
    const dir = pillDirection.current;
    const span = Math.abs(target - from);
    const expandWidth = PILL_WIDTH_PX + span * stepPx;
    if (pillPhase === "expanding") {
      if (dir === 1) {
        return {
          left: from * stepPx,
          width: pillStep === 0 ? PILL_WIDTH_PX : expandWidth,
        };
      }
      return {
        left: pillStep === 0 ? from * stepPx : target * stepPx,
        width: pillStep === 0 ? PILL_WIDTH_PX : expandWidth,
      };
    }
    if (pillPhase === "shrinking") {
      if (dir === 1) {
        return {
          left: pillStep === 0 ? from * stepPx : target * stepPx,
          width: pillStep === 0 ? expandWidth : PILL_WIDTH_PX,
        };
      }
      return {
        left: target * stepPx,
        width: pillStep === 0 ? expandWidth : PILL_WIDTH_PX,
      };
    }
    return { left: currentIndex * stepPx, width: PILL_WIDTH_PX };
  }, [pillPhase, pillStep, currentIndex, stepPx]);

  const slideForSlot = useCallback(
    (slotIndex: number): number => {
      if (slotIndex < currentIndex) return slotIndex;
      if (slotIndex > currentIndex + 1) return slotIndex - 1;
      return currentIndex;
    },
    [currentIndex]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    dragStartX.current = e.clientX;
    didDrag.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (dragStartX.current == null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 10) didDrag.current = true;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (dragStartX.current == null) return;
      const delta = e.clientX - dragStartX.current;
      if (delta > DRAG_THRESHOLD_PX && currentIndex > 0) goToPrev();
      else if (delta < -DRAG_THRESHOLD_PX && currentIndex < totalSlides - 1)
        goToNext();
      dragStartX.current = null;
    },
    [currentIndex, totalSlides, goToPrev, goToNext]
  );

  const handlePointerLeave = useCallback(() => {
    dragStartX.current = null;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didDrag.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 10) didDrag.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta > DRAG_THRESHOLD_PX && currentIndex > 0) goToPrev();
      else if (delta < -DRAG_THRESHOLD_PX && currentIndex < totalSlides - 1)
        goToNext();
      touchStartX.current = null;
    },
    [currentIndex, totalSlides, goToPrev, goToNext]
  );

  const handleTouchCancel = useCallback(() => {
    touchStartX.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current == null) return;
      const delta = e.touches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 5) e.preventDefault();
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  const value: SliderContextValue = {
    totalSlides,
    currentIndex,
    isFadingOut,
    goTo,
    goToPrev,
    goToNext,
    slideForSlot,
    getPillStyle,
    pillPhase,
    slotCount,
    dotsRowWidthPx,
    stepPx,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
  };

  return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
  );
});
SliderRoot.displayName = "SliderRoot";

export type SliderContainerProps = {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export const SliderContainer = memo(
  ({ className, style, children }: SliderContainerProps) => {
    const ctx = useSliderContext();
    return (
      <div
        ref={ctx.containerRef as React.RefObject<HTMLDivElement>}
        className={className}
        style={style}
        onPointerDown={ctx.handlePointerDown}
        onPointerMove={ctx.handlePointerMove}
        onPointerUp={ctx.handlePointerUp}
        onPointerLeave={ctx.handlePointerLeave}
        onPointerCancel={ctx.handlePointerLeave}
        onTouchStart={ctx.handleTouchStart}
        onTouchMove={ctx.handleTouchMove}
        onTouchEnd={ctx.handleTouchEnd}
        onTouchCancel={ctx.handleTouchCancel}
      >
        {children}
      </div>
    );
  }
);
SliderContainer.displayName = "SliderContainer";

type SliderDotsProps = {
  className?: string;

  classes?: {
    root?: string;
    dot?: string;
    pill?: string;
  };

  styles?: {
    root?: React.CSSProperties;
    dot?: React.CSSProperties;
    pill?: React.CSSProperties;
  };
};

export const SliderDots = memo(
  ({ className, classes, styles }: SliderDotsProps) => {
    const {
      currentIndex,
      goTo,
      slideForSlot,
      getPillStyle,
      pillPhase,
      slotCount,
      dotsRowWidthPx,
    } = useSliderContext();

    return (
      <div
        className={clsx(
          "relative flex items-center gap-2",
          classes?.root,
          className
        )}
        style={{
          width: dotsRowWidthPx,
          ...styles?.root,
        }}
      >
        <div
          className={clsx(
            "z-[2] absolute bg-neutral-1000 rounded-full pointer-events-none",
            classes?.pill
          )}
          style={{
            ...getPillStyle(),
            height: PILL_HEIGHT_PX,
            transition: `left ${pillPhase === "expanding" ? PILL_EXPAND_MS : PILL_SHRINK_MS}ms steps(3, end), width ${pillPhase === "expanding" ? PILL_EXPAND_MS : PILL_SHRINK_MS}ms steps(3, end)`,
            ...styles?.pill,
          }}
        />

        {Array.from({ length: slotCount }, (_, i) =>
          i === currentIndex ? (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: PILL_WIDTH_PX }}
            />
          ) : i === currentIndex + 1 ? null : (
            <button
              key={i}
              type="button"
              onClick={() => goTo(slideForSlot(i))}
              className={clsx(
                "flex-shrink-0 bg-neutral-300 hover:bg-neutral-400 rounded-full w-2 h-2 transition-colors",
                classes?.dot
              )}
              style={{
                width: DOT_STEP_PX,
                minWidth: DOT_STEP_PX,
                ...styles?.dot,
              }}
            />
          )
        )}
      </div>
    );
  }
);
SliderDots.displayName = "SliderDots";

export type SliderContentProps = {
  className?: string;
  /** You map slides yourself; use useSliderContext().currentIndex and render e.g. slides[currentIndex]. */
  children: ReactNode;
};

export const SliderContent = memo(
  ({ className, children }: SliderContentProps) => {
    const ctx = useSliderContext();
    const { isFadingOut } = ctx;
    return (
      <div
        className={clsx(
          "flex flex-col lg:flex-1 lg:justify-center gap-4 transition-opacity duration-100 ease-out",
          isFadingOut ? "opacity-0" : "opacity-100",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
SliderContent.displayName = "SliderContent";

export type SliderSlideStackProps = {
  className?: string;
  /** One child per slide (e.g. slides.map((s, i) => <Image key={i} ... />)). We stack and show only the active by index. */
  children: ReactNode;
};

export const SliderSlideStack = memo(
  ({ className, children }: SliderSlideStackProps) => {
    const ctx = useSliderContext();
    const { currentIndex, isFadingOut } = ctx;
    const items = Children.toArray(children);
    return (
      <div className={className}>
        {items.map((child, idx) => (
          <div
            key={idx}
            className={clsx(
              "absolute inset-0 transition-opacity duration-100 ease-out",
              idx !== currentIndex
                ? "opacity-0 pointer-events-none"
                : isFadingOut
                  ? "opacity-0"
                  : "opacity-100"
            )}
            aria-hidden={idx !== currentIndex}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);
SliderSlideStack.displayName = "SliderSlideStack";
