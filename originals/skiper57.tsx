"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const Skiper57 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const navX = useTransform(scrollY, [0, 50], [0, 42]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.8]);
  const logoY = useTransform(scrollY, [0, 50], [0, -10]);

  const [activeItem, setActiveItem] = useState(0);
  const [hoverItem, setHoverItem] = useState<number | null>(null);

  const navigationItems = [
    { label: "Overview" },
    { label: "Deployments" },
    { label: "Analytics" },
    { label: "Speed Insights" },
    { label: "Logs" },
    { label: "Observability" },
    { label: "Firewall" },
    { label: "Storage" },
    { label: "Flags" },
    { label: "Settings" },
  ];

  return (
    <div ref={containerRef} className="font-geist relative w-full">
      {/* update the top px  */}
      <div className="sticky top-[23px] z-10">
        <motion.svg
          style={{
            scale: logoScale,
            y: logoY,
          }}
          className="absolute left-4 z-10 size-5 lg:left-6"
          aria-label="Vercel Logo"
          viewBox="0 0 75 65"
          fill="currentColor"
          height="22"
        >
          <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
        </motion.svg>
      </div>
      <header className="bg-muted flex gap-4 px-6 pb-2 pl-16 text-sm">
        <ol className="flex items-center gap-4 pt-4">
          <li aria-hidden className="text-lg opacity-35">
            /
          </li>
          <li className="flex items-center gap-2">
            <span className="size-4.5 inline-flex items-center justify-center overflow-hidden rounded-full">
              <img
                src="https://avatar.vercel.sh/skiper"
                alt="logo"
                className="size-full object-cover"
              />
            </span>
            <p>gxuri's projects</p>
            <p className="bg-muted2 rounded-full px-2 py-px text-[11px]">
              Hobby
            </p>
            <button className="cursor-pointer -space-y-1 rounded-md px-2 py-2 text-[#919191] hover:bg-[#232323]">
              <ChevronUp className="stroke-4 block size-3" />
              <ChevronDown className="stroke-4 block size-3" />
            </button>
          </li>
          <li aria-hidden className="hidden text-lg opacity-35 lg:block">
            /
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <span className="size-4.5 inline-flex items-center justify-center rounded-full">
              <img src="/logos/logo.svg" alt="logo" />
            </span>
            skiper-ui-demo
            <button className="cursor-pointer -space-y-1 rounded-md px-2 py-2 text-[#919191] hover:bg-[#232323]">
              <ChevronUp className="stroke-4 block size-3" />
              <ChevronDown className="stroke-4 block size-3" />
            </button>
          </li>
        </ol>
      </header>
      <nav className="border-foreground/10 bg-muted sticky top-0 flex border-b text-sm">
        <motion.div
          style={{
            x: navX,
          }}
          onMouseLeave={() => {
            setHoverItem(null);
          }}
          className="scrollbar-hide relative flex gap-2 overflow-y-visible overflow-x-scroll whitespace-nowrap px-6 py-1 text-sm"
        >
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                setActiveItem(index);
              }}
              onMouseEnter={() => {
                setHoverItem(index);
              }}
              className={cn(
                "foregborder-foregroundspace-nowrap relative flex items-center justify-center px-2 py-2",
                activeItem !== index && "opacity-55",
              )}
            >
              {item.label}
              {activeItem === index && (
                <motion.div
                  layoutId="underline"
                  className="bg-foreground absolute -bottom-1 left-0 h-[2px] w-full rounded-3xl"
                />
              )}

              {hoverItem === index && (
                <motion.div
                  style={{
                    borderRadius: "10px",
                  }}
                  layoutId="hoverBg"
                  transition={{
                    duration: 0.2,
                  }}
                  className="bg-foreground/5 absolute inset-0 left-0"
                />
              )}
            </a>
          ))}
        </motion.div>
      </nav>
      <main className="mx-auto my-12 max-w-7xl rounded-md px-5">
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <div className="h-112 border-foreground/15 flex flex-col justify-end rounded-2xl border lg:col-span-3">
            <div className="h-15 border-foreground/15 w-full rounded-b-xl border-y" />
            <div className="h-15 w-full" />
          </div>
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
          <div className="h-112 border-foreground/15 flex flex-col justify-end rounded-2xl border p-4 lg:col-span-3">
            <div className="bg-foregborder-foreground/4 border-foreground/15 h-full w-full rounded-xl border border-dashed" />
          </div>
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
          <div className="h-92 border-foreground/15 flex flex-col justify-end rounded-2xl border" />
        </div>
      </main>
    </div>
  );
};

export { Skiper57 };
