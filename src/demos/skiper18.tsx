// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { createRef, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

const Skiper18 = () => {
  const images = [
    "https://skiper-ui.com/skiperv1/skiper18/mouse1.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse2.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse3.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse4.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse5.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse6.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse7.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse8.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse9.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse10.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse11.svg",
    "https://skiper-ui.com/skiperv1/skiper18/mouse12.svg",
  ];
  return (
    <section className="relative mx-auto flex h-full w-full items-center justify-center bg-white">
      <p className="absolute z-99 top-4 text-xs text-black/40">
        Inspired from the best{" "}
        <a
          href="https://www.befreaky.co/"
          target="_blank"
          className="underline hover:text-black"
        >
          BeFreaky
        </a>{" "}
        by David Denni. Go check them out.
      </p>
      <div className="absolute top-[10%] grid content-start justify-items-center gap-6 py-20 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
          Move your mouse to see the trail
        </span>
      </div>
      <ImageCursorTrail
        items={images}
        maxNumberOfImages={5}
        distance={15}
        imgClass="w-50 "
        className="h-full w-full"
      ></ImageCursorTrail>
    </section>
  );
};

export { Skiper18 };

interface ImageMouseTrailProps {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}

export function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (e: { clientX: number; clientY: number }) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
          ?.current;
      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <section
      onMouseMove={(e) => handleOnMove(e.nativeEvent)}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      onMouseLeave={() => {
        refs.current.forEach((ref) => {
          if (ref.current) {
            ref.current.dataset.status = "inactive";
          }
        });
      }}
      ref={containerRef}
      className={cn(
        "relative grid h-[600px] w-full place-content-center overflow-hidden rounded-lg",
        className,
      )}
    >
      {items.map((item, index) => (
        <img
          key={index}
          className={cn(
            "opacity:0 data-[status='active']:ease-out-expo pointer-events-none absolute -translate-x-[50%] -translate-y-[50%] scale-0 rounded-3xl object-cover transition-transform duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
            imgClass,
          )}
          data-index={index}
          data-status="inactive"
          src={item}
          alt={`image-${index}`}
          ref={refs.current[index]}
        />
      ))}
      {children}
    </section>
  );
}

/**
 * Skiper 18 ImageCursorTrail — React
 * Inspired from the best BeFreaky by David Denni - https://www.befreaky.co/ Go check them out.
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the befreaky.co . They’re independent recreations meant to study interaction design
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
