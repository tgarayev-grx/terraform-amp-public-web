"use client";

import { useLayoutEffect } from "react";

export function ForcedDarkTheme() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return null;
}
