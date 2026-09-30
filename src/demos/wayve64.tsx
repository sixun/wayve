// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { motion } from "framer-motion";
import React from "react";

const Wayve64 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <WayveGooeyFilterProvider />
      <div className="absolute top-[20%] grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Drag the elements to see the effect
        </span>
      </div>
      <ul
        className="flex flex-col justify-end rounded-2xl"
        style={{
          filter: "url(#WayveGooeyFilter)",
        }}
      >
        <motion.li
          drag
          initial={INITIAL_STATE}
          animate={ANIMATED_STATE}
          className="bg-foreground absolute"
        ></motion.li>
        <motion.li
          drag
          className="bg-foreground size-12 rounded-full"
        ></motion.li>
      </ul>
    </div>
  );
};

export { Wayve64, WayveGooeyFilterProvider };

const WayveGooeyFilterProvider = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="WayveGooeyFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="WayveGooeyFilter"
          />
          <feBlend in="SourceGraphic" in2="WayveGooeyFilter" />
        </filter>
      </defs>
    </svg>
  );
};

const LOGO_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const INITIAL_STATE = {
  y: 0,
  width: 50,
  height: 50,
  borderRadius: 40,
};

const ANIMATED_STATE = {
  y: -60,
  width: 200,
  height: 100,
  borderRadius: 10,
  transition: {
    ...LOGO_SPRING,
    delay: 0.15,
    y: {
      ...LOGO_SPRING,
      delay: 0,
    },
  },
};
