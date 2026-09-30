// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const Wayve78 = () => {
  const carouselItems = [
    {
      src: "/wayve/brand.svg",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/wayve/brand.svg",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/wayve/brand.svg",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/wayve/brand.svg",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/wayve/brand.svg",
      label: "Share meeting takeaways in a fraction of the time",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useMotionValue(100);
  const [direction, setDirection] = useState(1);

  const clipPath = useMotionTemplate`inset(0 ${progress}%  0 0 round 10px )`;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress = progress.get();
      if (currentProgress > 0) {
        progress.set(currentProgress - 1);
      } else {
        clearInterval(interval);
        progress.set(100);
        if (currentIndex < carouselItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setDirection(1);
        } else {
          setCurrentIndex(0);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, currentIndex]);

  return (
    <div className="font-satoshi relative flex h-full w-screen flex-col items-center justify-center gap-12 overflow-hidden">
      <div className="text-center">
        <h1 className="text-6xl tracking-tighter">UI for future</h1>
        <p className="text-foreground/50 mt-4 text-2xl">
          Collection of unsual UI components
        </p>
      </div>

      {/* Navigation Button */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => {
            progress.set(100);
            currentIndex > 0
              ? setCurrentIndex(currentIndex - 1)
              : setCurrentIndex(carouselItems.length - 1);
            setDirection(-1);
          }}
          className="bg-foreground/10 hover:bg-foreground/20 text-foreground/50 flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 active:scale-95"
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center justify-center gap-1">
          {carouselItems.map((item, index) => (
            <motion.button
              initial={false}
              onClick={() => {
                progress.set(100);
                setCurrentIndex(index);
                if (index > currentIndex) {
                  setDirection(1);
                } else {
                  setDirection(-1);
                }
              }}
              animate={{
                width: index === currentIndex ? "30px" : "8px",
              }}
              className="bg-foreground/15 text-foreground/50 relative flex h-2 cursor-pointer items-center justify-center overflow-hidden rounded-full p-0.5"
              key={index}
            >
              {currentIndex === index && (
                <motion.div
                  style={{ clipPath }}
                  className="bg-foreground absolute left-0 top-0 h-full w-full origin-left rounded-full"
                ></motion.div>
              )}
              <div></div>
            </motion.button>
          ))}
        </div>
        <button
          onClick={() => {
            progress.set(100);
            currentIndex < carouselItems.length - 1
              ? setCurrentIndex(currentIndex + 1)
              : setCurrentIndex(0);

            setDirection(1);
          }}
          className="bg-foreground/10 hover:bg-foreground/20 flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 text-neutral-400 active:scale-95"
        >
          <ChevronRight />
        </button>
      </div>

      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {currentIndex !== null && (
          <motion.div
            key={currentIndex}
            variants={variants as Variants}
            initial="initial"
            animate="active"
            exit="exit"
            custom={direction}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="flex w-full max-w-3xl flex-col items-center justify-center"
          >
            <p className="text-foreground/50 mb-6 text-2xl">
              Availble with shadcn CLI 3.0
            </p>
            <div className="bg-foreground/10 rounded-4xl h-[550px] w-full overflow-hidden p-1">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={`${carouselItems[currentIndex].src}`}
                alt=""
                className="rounded-4xl h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Wayve78 };

const variants = {
  initial: (direction: number) => {
    return { opacity: 0, filter: "blur(4)" };
  },
  active: {
    x: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => {
    return {
      x: `${-30 * direction}%`,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeOut" },
    };
  },
};
