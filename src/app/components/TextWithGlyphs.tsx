"use client";

import ShiftingGlyphs from "./ShiftingGlyphs";

interface TextWithGlyphsProps {
  text: string | number;
  className?: string;
}

export default function TextWithGlyphs({ text, className = "" }: TextWithGlyphsProps) {
  const textStr = String(text);
  
  if (textStr.includes("Ø")) {
    const parts = textStr.split("Ø");
    return (
      <span className={className}>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <ShiftingGlyphs length={1} />}
          </span>
        ))}
      </span>
    );
  }
  
  return <span className={className}>{textStr}</span>;
}
