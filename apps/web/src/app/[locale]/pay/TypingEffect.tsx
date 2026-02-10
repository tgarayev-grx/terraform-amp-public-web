"use client";

import clsx from "clsx";
import { memo, useEffect, useState } from "react";

const TYPING_MS = 80;
const DELETING_MS = 50;
/** Delay when screen is empty, before starting to type the next word */
const PAUSE_BEFORE_TYPING_MS = 400;
/** Delay when full word is shown, before starting to delete */
const PAUSE_BEFORE_DELETING_MS = 2000;

export type TypingEffectProps = {
  className?: string;
  words: readonly string[];
};

export const TypingEffect = memo(({ className, words }: TypingEffectProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const word = words[wordIndex] ?? "";
  const displayed = word.slice(0, charIndex);

  useEffect(() => {
    if (words.length === 0) return;

    const delay = isDeleting ? DELETING_MS : TYPING_MS;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < word.length) {
            setCharIndex((c) => c + 1);
          } else {
            setIsDeleting(true);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting && charIndex === 0
        ? PAUSE_BEFORE_TYPING_MS
        : !isDeleting && charIndex === word.length
          ? PAUSE_BEFORE_DELETING_MS
          : delay
    );

    return () => clearTimeout(timeout);
  }, [words.length, word, wordIndex, charIndex, isDeleting]);

  if (words.length === 0) return null;

  return (
    <span
      className={clsx("inline-block min-w-[140px] align-bottom", className)}
    >
      {displayed}
      <span
        className="inline-block bg-current ml-0.5 w-0.5 h-[1em] align-sub animate-cursor-blink"
        aria-hidden
      />
    </span>
  );
});
TypingEffect.displayName = "TypingEffect";
