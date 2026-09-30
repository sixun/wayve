"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

const ParallaxImage = ({
  src,
  className,
  containerClassName,
  speed = 30,
}: {
  src: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
}) => {
  const gallery = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0.2, 1], ["0%", `${speed}%`]);

  return (
    <div
      ref={gallery}
      className={cn(
        "relative flex w-full items-end overflow-hidden",
        containerClassName,
      )}
      style={{ height: "70vh" }}
    >
      <motion.img
        src={src}
        alt=""
        className={cn("h-screen w-full object-cover", className)}
        style={{ y }}
      />
    </div>
  );
};

const Skiper55 = () => {
  return (
    <ReactLenis root>
      <div className="flex h-[200vh] w-full items-center justify-center">
        <div className="text-foreground absolute left-1/2 top-12 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see parallax effect
          </span>
        </div>
        <ParallaxImage
          src="/images/x.com/20.jpeg"
          containerClassName="w-full max-w-3xl"
          className="w-full"
          speed={40}
        />
      </div>
    </ReactLenis>
  );
};

export { ParallaxImage, Skiper55 };

/**
 * Skiper 55 ParallaxImage — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
