"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

// import { DebugPanel } from "./DebugPanel";

const Skiper104 = () => {
  const items = [
    {
      bgSrc: "https://cdn.skiper-ui.com/images/templates/bg0.svg",
      title: "First ever to do that",
      desc: "We are the first one ever to do this shit bla bla bla trust in us we got some decent funding tooo bla bla",
    },
    {
      bgSrc: "https://cdn.skiper-ui.com/images/templates/bg1.svg",
      title: "Revolutionary approach",
      desc: "Our innovative solution transforms the way you think about design and development, bringing cutting-edge technology to your fingertips.",
    },
    {
      bgSrc: "https://cdn.skiper-ui.com/images/templates/bg2.svg",
      title: "Next level experience",
      desc: "Experience the future of user interfaces with our advanced features and seamless integration capabilities that elevate your projects.",
    },
  ];

  return (
    <div className="">
      <div className="-mb-36 mt-36 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[14ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Scroll below to see effect
        </span>
      </div>
      <DesktopVersion items={items} />
      <MobileVersion items={items} />
    </div>
  );
};

const DesktopItem = ({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: { bgSrc: string; title: string; desc: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const imageY = useTransform(scrollYProgress, [start, end], [-50, 0]);
  const textY = useTransform(scrollYProgress, [start, end], [50, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <div className="z-2 relative flex flex-col gap-10">
      <motion.div
        style={{
          y: imageY,
          opacity: opacity,
        }}
        className="relative flex h-60 w-full items-center justify-center rounded-2xl"
      >
        <img
          src={item.bgSrc}
          alt=""
          className="h-full w-full rounded-xl object-cover dark:invert"
        />

        <img
          src="https://cdn.skiper-ui.com/images/templates/Aa0.svg"
          alt=""
          className="pointer-events-none absolute h-[55%] w-fit object-cover transition-all duration-300 ease-out group-hover:scale-110 dark:invert"
        />
      </motion.div>
      <motion.div
        style={{
          scale: scale,
        }}
        className="flex size-8 items-center justify-center bg-orange-500 text-white"
      >
        {index + 1}
      </motion.div>
      <motion.div
        style={{
          y: textY,
          opacity: opacity,
        }}
        className="space-y-3"
      >
        <h2 className="text-2xl font-semibold tracking-tighter">
          {item.title}
        </h2>
        <p className="opacity-65">{item.desc}</p>
      </motion.div>
    </div>
  );
};

const DesktopVersion = ({
  items,
}: {
  items: { bgSrc: string; title: string; desc: string }[];
}) => {
  const scrollContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainer,
  });

  return (
    <div className="hidden items-center justify-center lg:flex">
      <div ref={scrollContainer} className="h-[900vh]">
        <div
          className="sticky top-1/2 grid w-full max-w-7xl -translate-y-1/2 gap-20"
          style={{
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item, index) => (
            <DesktopItem
              key={index}
              item={item}
              index={index}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
          <motion.div
            style={{
              scaleX: scrollYProgress,
              scaleY: useTransform(
                scrollYProgress,
                [0, 1 / items.length],
                [0, 1],
              ),
            }}
            className="absolute left-4 top-[296px] h-1 w-full origin-left bg-orange-500"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

const MobileVersion = ({
  items,
}: {
  items: { bgSrc: string; title: string; desc: string }[];
}) => {
  return (
    <div className="gap-35 relative my-32 flex w-full flex-col pl-12 pr-2 lg:hidden">
      {items.map((item, index) => (
        <div key={index} className="z-2 flex flex-col gap-4">
          <div className="absolute left-1 flex size-8 items-center justify-center bg-orange-500">
            {index + 1}
          </div>
          <div className="bg-background relative flex h-60 w-full items-center justify-center rounded-xl">
            <img
              src={item.bgSrc}
              alt=""
              className="h-full w-full rounded-xl object-cover dark:invert"
            />

            <img
              src="https://cdn.skiper-ui.com/images/templates/Aa0.svg"
              alt=""
              className="pointer-events-none absolute h-[55%] w-fit object-cover transition-all duration-300 ease-out group-hover:scale-110 dark:invert"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tighter">
              {item.title}
            </h2>
            <p className="opacity-65">{item.desc}</p>
          </div>
        </div>
      ))}
      <div className="absolute left-4 top-2 h-[99%] w-1 origin-left bg-orange-500"></div>
    </div>
  );
};

export { Skiper104 };
