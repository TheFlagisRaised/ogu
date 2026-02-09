"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Sparkle data for the animated dots - updated with red color scheme
const sparkles = [
  { left: "56.87%", top: "70%", size: 2, color: "rgb(114, 0, 0)", duration: 3.06, delay: 2.34 },
  { left: "28.28%", top: "61.04%", size: 3.2, color: "rgb(139, 26, 26)", duration: 3.8, delay: 4.88 },
  { left: "42.56%", top: "1.15%", size: 1.32, color: "rgb(255, 255, 255)", duration: 2.16, delay: 3.6 },
  { left: "37.31%", top: "70.95%", size: 2.65, color: "rgb(114, 0, 0)", duration: 2.35, delay: 1.44 },
  { left: "49.5%", top: "68.52%", size: 2.27, color: "rgb(179, 51, 51)", duration: 2.99, delay: 1.54 },
  { left: "18.61%", top: "61.22%", size: 2.23, color: "rgb(204, 82, 82)", duration: 3.82, delay: 1.89 },
  { left: "22.91%", top: "14.83%", size: 1.02, color: "rgb(255, 255, 255)", duration: 4.11, delay: 1.81 },
  { left: "16.02%", top: "69.61%", size: 2.49, color: "rgb(139, 26, 26)", duration: 4.53, delay: 0.36 },
  { left: "62.66%", top: "53.87%", size: 3.32, color: "rgb(114, 0, 0)", duration: 2.81, delay: 1.04 },
  { left: "68.58%", top: "56.86%", size: 1.48, color: "rgb(114, 0, 0)", duration: 4.09, delay: 2.52 },
  { left: "41.35%", top: "23.94%", size: 1.4, color: "rgb(179, 51, 51)", duration: 3.18, delay: 3.11 },
  { left: "18.18%", top: "50.57%", size: 2.06, color: "rgb(204, 82, 82)", duration: 4.41, delay: 1.94 },
  { left: "1.88%", top: "1.61%", size: 3.67, color: "rgb(114, 0, 0)", duration: 3.55, delay: 3.08 },
  { left: "10.32%", top: "68.17%", size: 1.4, color: "rgb(139, 26, 26)", duration: 3.64, delay: 1.16 },
  { left: "54.56%", top: "35.51%", size: 3.45, color: "rgb(204, 82, 82)", duration: 3.88, delay: 0.83 },
  { left: "11.84%", top: "38.77%", size: 2.88, color: "rgb(179, 51, 51)", duration: 2.5, delay: 4.66 },
  { left: "78.88%", top: "61.96%", size: 2.95, color: "rgb(204, 82, 82)", duration: 3.4, delay: 4.46 },
  { left: "98.31%", top: "38.3%", size: 2.68, color: "rgb(179, 51, 51)", duration: 2.84, delay: 3.1 },
  { left: "8.34%", top: "16.92%", size: 1.89, color: "rgb(204, 82, 82)", duration: 3.76, delay: 2.95 },
  { left: "97.61%", top: "40.95%", size: 3.88, color: "rgb(139, 26, 26)", duration: 3.19, delay: 4 },
  { left: "87.02%", top: "18.92%", size: 2.51, color: "rgb(139, 26, 26)", duration: 2.78, delay: 4.41 },
  { left: "43.31%", top: "51.83%", size: 2.81, color: "rgb(204, 82, 82)", duration: 4.28, delay: 0.07 },
  { left: "80.38%", top: "27.18%", size: 3.98, color: "rgb(255, 255, 255)", duration: 3.61, delay: 1.27 },
  { left: "39.44%", top: "93.4%", size: 1.63, color: "rgb(204, 82, 82)", duration: 3.87, delay: 3.81 },
  { left: "29.5%", top: "59.94%", size: 1.54, color: "rgb(139, 26, 26)", duration: 4.07, delay: 4.38 },
];

function Typewriter({ text, speed = 100, pauseTime = 2000 }: { text: string; speed?: number; pauseTime?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === text.length) {
      // Finished typing, wait then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);

      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, speed / 2); // Delete faster than typing

      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText.length === 0) {
      // Finished deleting, reset
      setIsDeleting(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, text, speed, isDeleting, displayedText, pauseTime]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0404 0%, #120606 30%, #1a0a0a 50%, #120606 70%, #0a0404 100%)",
      }}
    >
      {/* Central glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(114,0,0,0.15) 0%, rgba(74,0,0,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Sparkle dots */}
      {sparkles.map((sparkle, index) => (
        <div
          key={index}
          className="absolute rounded-full pointer-events-none sparkle-dot"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `${sparkle.color} 0px 0px ${sparkle.size * 2}px`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo - now using the OG logo */}
        <div className="flex items-center justify-center mb-10 animate-fade-in-up-float">
          <img
            src="/ogu.png"
            alt="OG"
            width={360}
            height={180}
            className="object-contain drop-shadow-[0_0_40px_rgba(114,0,0,0.6)]"
          />
        </div>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s", color: "#cc5252" }}
        >
          <Typewriter text="shhhhh" speed={150} />
          <br />
          <span style={{ color: "#720000" }}>no telling.</span>
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-2 text-white/90 hover:text-white px-8 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(114,0,0,0.4)] border border-white/10 hover:border-white/20 backdrop-blur-sm"
            style={{ background: "rgba(114,0,0,0.2)" }}
          >
            Enter
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #720000, transparent)" }}
      />
    </div>
  );
}
