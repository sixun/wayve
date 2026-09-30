"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

interface SkiperTextRevealHProps {
  children: string;
  className?: string;
}

const SkiperTextRevealH: React.FC<SkiperTextRevealHProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Split text into words
  const words = children.split(" ");

  return (
    <div ref={containerRef} className="h-[500vh] w-full overflow-x-clip">
      <div className="sticky top-0 flex h-screen items-center px-6">
        <p
          className={cn(
            "w-[60%] text-[3.9vw] font-medium leading-[0.9] tracking-[-0.03em]",
            className,
          )}
        >
          {words.map((word, index) => (
            <AnimatedWord
              key={index}
              word={word}
              index={index}
              totalWords={words.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </div>
  );
};

interface AnimatedWordProps {
  word: string;
  index: number;
  totalWords: number;
  scrollProgress: any;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({
  word,
  index,
  totalWords,
  scrollProgress,
}) => {
  // Calculate animation timing to ensure all words complete by the end
  const staggerDelay = 0.015; // Reduced for tighter timing
  const animationDuration = 0.3; // Duration for each word animation

  // Calculate start and end points for this word
  const wordStart = index * staggerDelay;
  const wordEnd = wordStart + animationDuration;

  // Ensure the last word completes before scroll ends
  const lastWordEnd = (totalWords - 1) * staggerDelay + animationDuration;
  const adjustedScrollProgress = useTransform(
    scrollProgress,
    [0, lastWordEnd, 1],
    [0, lastWordEnd, 1],
  );

  // Transform from right side of viewport to center
  const x = useTransform(
    adjustedScrollProgress,
    [wordStart, wordEnd],
    [1200, 0],
  );

  // Add opacity animation for smoother reveal
  const opacity = useTransform(
    adjustedScrollProgress,
    [wordStart, wordEnd],
    [0, 1],
  );

  return (
    <>
      <motion.span
        className="mr-2 inline-block"
        style={{
          x,
          opacity,
        }}
      >
        {word}
      </motion.span>
    </>
  );
};

const Skiper72 = () => {
  return (
    <section className="font-geist text-[22px] font-medium leading-[1.3] text-white">
      {/* Main content */}
      <SkiperTextRevealH>
        Here our journey begins. From (2020 → 2024) we built something
        incredible. Starting with late-night coding sessions and ending with AI
        that actually understands you. Pretty cool right?
      </SkiperTextRevealH>
    </section>
  );
};

export { Skiper72 };
