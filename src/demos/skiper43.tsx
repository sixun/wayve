// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import {
  Command,
  Eye,
  Inbox,
  LogOut,
  Menu,
  MessageCircle,
  ToggleLeft,
} from "lucide-react";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  labelHasKeyword: React.ReactNode[] | false;
  hasBadge: boolean;
};

type VercelIconsMenuWithTooltipPras = {
  items: MenuItem[];
  className?: string;
  [key: string]: any;
};

const Skiper43 = () => {
  const items: MenuItem[] = [
    {
      icon: <MessageCircle className="h-full w-full" />,
      label: "Comment ",
      labelHasKeyword: ["C"],
      hasBadge: false,
    },
    {
      icon: <Inbox className="h-full w-full" />,
      label: "Inbox ",
      labelHasKeyword: false,
      hasBadge: true,
    },
    {
      icon: <ToggleLeft className="h-full w-full" />,
      label: "Feature Flags",
      labelHasKeyword: false,
      hasBadge: false,
    },
    {
      icon: <Eye className="h-full w-full" strokeDasharray="3.5" />,
      label: "Draft Mode",
      hasBadge: false,
      labelHasKeyword: false,
    },
    {
      icon: <LogOut className="h-full w-full -rotate-90" />,
      label: "Share ",
      hasBadge: false,
      labelHasKeyword: false,
    },
    {
      icon: <Menu className="h-full w-full" />,
      label: "Menu",
      hasBadge: true,
      labelHasKeyword: [<Command className="size-2.5" key="cmd" />, "K"],
    },
  ];

  return (
    <div className="flex h-full w-screen items-center justify-center bg-[#f5f4f3]">
      <VercelIconsMenuWithTooltip items={items} />
    </div>
  );
};

export { Skiper43 };

const SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
  // stiffness -like rubber Band the more you strech the more speed it goes back to the original position
  // damping - its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  // mass - Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
};

export function VercelIconsMenuWithTooltip({
  items,
  className,
  ...props
}: VercelIconsMenuWithTooltipPras) {
  const IconRefs = useRef<HTMLButtonElement[]>([]);
  const ToolTipRef = useRef<HTMLDivElement[]>([]);
  const ToolTipParentRef = useRef<HTMLDivElement>(null);

  const tooltipPosition = useSpring(0, {
    stiffness: 350,
    damping: 30,
  });
  const clipPathLeft = useSpring(0, SPRING);
  const clipPathRight = useSpring(79, SPRING);
  const opacity = useSpring(0, SPRING);

  const calculateClipPath = (index: number | null) => {
    if (index === null) {
      clipPathLeft.set(0);
      clipPathRight.set(0);
      opacity.set(0);
      return;
    }

    // Calculate left side width (sum of all elements before current)
    let leftWidth = 0;
    for (let i = 0; i < index; i++) {
      const elementWidth =
        ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
      leftWidth += elementWidth;
    }

    // Calculate right side width (sum of all elements after current)
    let rightWidth = 0;
    for (let i = index + 1; i < items.length; i++) {
      const elementWidth =
        ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
      rightWidth += elementWidth;
    }

    // Convert to percentage based on total width
    const totalWidth = ToolTipRef.current.reduce((sum, el) => {
      return sum + (el?.getBoundingClientRect().width || 0);
    }, 0);

    const leftPercentage = totalWidth > 0 ? (leftWidth / totalWidth) * 100 : 20;
    const rightPercentage =
      totalWidth > 0 ? (rightWidth / totalWidth) * 100 : 20;

    // Animate to new values
    clipPathLeft.set(leftPercentage);
    clipPathRight.set(rightPercentage);
    opacity.set(1);
  };

  const onMouseEnterOnIcon = (e: any, index: number) => {
    const ActiveIcon = IconRefs.current[index]?.getBoundingClientRect();
    const ActiveTooltip = ToolTipRef.current[index]?.getBoundingClientRect();
    const parentTooltip = ToolTipParentRef.current?.getBoundingClientRect();

    // Calculate width of all elements before the current one
    let widthBeforeCurrent = 0;
    for (let i = 0; i < index; i++) {
      const elementWidth =
        ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
      widthBeforeCurrent += elementWidth;
    }

    if (ActiveIcon && parentTooltip) {
      const centerXIcon = ActiveIcon.left + ActiveIcon.width / 2;

      // Get width of current element
      const currentElementWidth = ActiveTooltip.width;

      // Calculate active item position: parent left + width of all elements before + width/2 of current element
      const activeItemPosition =
        (parentTooltip?.left || 0) +
        widthBeforeCurrent +
        currentElementWidth / 2;

      tooltipPosition.set(centerXIcon - activeItemPosition);
    }

    // Calculate and animate clip path
    calculateClipPath(index);
  };

  const onMouseLeave = () => {
    opacity.set(0);
  };

  return (
    <div className={cn("relative text-white", className)} {...props}>
      {/* debug */}
      {/* <div className="fixed left-5 top-4 text-xs text-red-500">
        Icon 1 :{" "}
        {IconRefs.current[0]?.getBoundingClientRect().left +
          IconRefs.current[0]?.getBoundingClientRect().width / 2}{" "}
        <br />
        Icon 2 :{" "}
        {IconRefs.current[1]?.getBoundingClientRect().left +
          IconRefs.current[1]?.getBoundingClientRect().width / 2}{" "}
        <br />
        Icon 3 :{" "}
        {IconRefs.current[2]?.getBoundingClientRect().left +
          IconRefs.current[2]?.getBoundingClientRect().width / 2}{" "}
        <br />
        Icon 4 :{" "}
        {IconRefs.current[3]?.getBoundingClientRect().left +
          IconRefs.current[3]?.getBoundingClientRect().width / 2}{" "}
        <br />
        Icon 5 :{" "}
        {IconRefs.current[4]?.getBoundingClientRect().left +
          IconRefs.current[4]?.getBoundingClientRect().width / 2}{" "}
        <br />
        Icon 6 :{" "}
        {IconRefs.current[5]?.getBoundingClientRect().left +
          IconRefs.current[5]?.getBoundingClientRect().width / 2}{" "}
        <br />
        <br />
        Tooltip Parent :{" "}
        {ToolTipParentRef.current?.getBoundingClientRect().left} <br />
        <br />
        Tooltip Position : <motion.span>{tooltipPosition}</motion.span> <br />
        Clip Path Left: <motion.span>{clipPathLeft}</motion.span>% <br />
        Clip Path Right: <motion.span>{clipPathRight}</motion.span>% <br />
      </div> */}

      {/* tooltip */}
      <div ref={ToolTipParentRef} className="absolute bottom-14 left-0">
        <motion.div
          className="flex bg-black"
          style={{
            opacity,
            x: tooltipPosition,
            clipPath: useMotionTemplate`inset(0 ${clipPathRight}% 0 ${clipPathLeft}% round 10px )`,
          }}
        >
          {items.map((item, index) => (
            <div
              ref={(el) => {
                if (el) {
                  ToolTipRef.current[index] = el;
                }
              }}
              key={index}
              className={cn("z-1 inline-flex h-8 items-center justify-center")}
            >
              <div className="flex items-center justify-center gap-2 whitespace-nowrap px-2 text-sm font-medium leading-tight tracking-tight">
                {item.label}
                {item.labelHasKeyword && (
                  <span className="flex items-center justify-center gap-1">
                    {item.labelHasKeyword.map((keyword: any) => (
                      <span
                        className="inline-flex size-5 items-center justify-center rounded-sm border border-white/30 p-0.5 text-xs text-white"
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* icons */}
      <div
        className={cn(
          "z-10 inline-flex items-center justify-center overflow-hidden p-2",
          "rounded-full bg-black/95 backdrop-blur",
        )}
      >
        {items.map((item, index) => (
          <button
            ref={(el) => {
              if (el) {
                IconRefs.current[index] = el;
              }
            }}
            key={index}
            onMouseEnter={(e) => onMouseEnterOnIcon(e, index)}
            onMouseLeave={onMouseLeave}
            className="flex items-center justify-center transition-colors hover:bg-[#121212]"
          >
            <div className="group relative flex size-8 items-center justify-center rounded-full p-1.5 hover:bg-white/15">
              {item.icon}
              {item.hasBadge && (
                <div className="absolute right-1.5 top-1.5 flex size-2 items-center justify-center rounded-full border-[1.7] border-black bg-sky-500 text-xs text-white group-hover:border-[#363636]">
                  <span className="sr-only">{item.label}</span>
                </div>
              )}
            </div>
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Skiper 43 Vercel Icons Menu With Tooltip — React + framer motion
 * Inspired by and adapted from https://vercel.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the vercel.com . They’re independent recreations meant to study interaction design
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
