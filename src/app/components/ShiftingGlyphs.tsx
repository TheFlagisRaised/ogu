"use client";

import { useState, useEffect } from "react";

const GLYPHS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function ShiftingGlyphs({ length = 8 }: { length?: number }) {
  const [glyphs, setGlyphs] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with random glyphs
    const initial = Array.from({ length }, () => 
      GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    );
    setGlyphs(initial);

    // Shift glyphs periodically
    const interval = setInterval(() => {
      setGlyphs((prev) =>
        prev.map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      );
    }, 150);

    return () => clearInterval(interval);
  }, [length]);

  return (
    <span className="font-mono tracking-wider" style={{ color: "#cc5252" }}>
      {glyphs.join("")}
    </span>
  );
}
