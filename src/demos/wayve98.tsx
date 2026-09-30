// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import {
  motion,
  MotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { Command, LogOut, Menu, MessageCircle } from "lucide-react";
import React, { createContext, useCallback, useContext, useRef } from "react";

import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  labelHasKeyword: React.ReactNode[] | false;
  hasBadge: boolean;
};

const Wayve98 = () => {
  const items: MenuItem[] = [
    {
      icon: <MessageCircle className="h-full w-full" />,
      label: "Comment ",
      labelHasKeyword: ["C"],
      hasBadge: false,
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

  const side: "left" | "right" | "top" | "bottom" = "left";

  return (
    <div className="flex h-full w-screen items-center justify-center bg-[#f5f4f3]">
      <VtooltipRoot
        side={side}
        springConfig={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div
          className={cn(
            "z-10 inline-flex items-center justify-center overflow-hidden p-2",
            "rounded-full bg-black backdrop-blur",
            (side === "left" || side === "right") && "flex-col",
          )}
        >
          {items.map((item, index) => (
            <VtooltipItem key={index} index={index}>
              <VtooltipTrigger className="h-10">
                <div className="group relative flex size-8 items-center justify-center rounded-full p-1.5 hover:bg-white/15">
                  {item.icon}
                  {item.hasBadge && (
                    <div className="absolute right-1.5 top-1.5 flex size-2 items-center justify-center rounded-full border-[1.7] border-black bg-sky-500 text-xs text-white group-hover:border-[#363636]">
                      <span className="sr-only">{item.label}</span>
                    </div>
                  )}
                </div>
                <span className="sr-only">{item.label}</span>
              </VtooltipTrigger>
              <VtooltipContent className="bg-red-100">
                <div className="flex items-center justify-center gap-2 whitespace-nowrap px-2 text-sm font-medium leading-tight tracking-tight">
                  {item.label}
                  {item.labelHasKeyword && (
                    <span className="flex items-center justify-center gap-1">
                      {item.labelHasKeyword.map(
                        (keyword: React.ReactNode, idx: number) => (
                          <span
                            className="inline-flex size-5 items-center justify-center rounded-sm border border-white/30 p-0.5 text-xs text-white"
                            key={idx}
                          >
                            {keyword}
                          </span>
                        ),
                      )}
                    </span>
                  )}
                </div>
              </VtooltipContent>
            </VtooltipItem>
          ))}
        </div>
      </VtooltipRoot>
    </div>
  );
};

export { Wayve98 };

type VtooltipContextValue = {
  IconRefs: React.MutableRefObject<HTMLButtonElement[]>;
  ToolTipRef: React.MutableRefObject<HTMLDivElement[]>;
  ToolTipParentRef: React.MutableRefObject<HTMLDivElement | null>;
  tooltipPosition: MotionValue<number>;
  clipPathTop: MotionValue<number>;
  clipPathBottom: MotionValue<number>;
  opacity: MotionValue<number>;
  calculateClipPath: (index: number | null) => void;
  onMouseEnterOnIcon: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  onMouseLeave: () => void;
  setIconRef: (index: number, el: HTMLButtonElement | null) => void;
  setTooltipRef: (index: number, el: HTMLDivElement | null) => void;
  registerContent: (index: number, content: React.ReactNode) => void;
  side: "left" | "right" | "top" | "bottom";
  itemsCountRef: React.MutableRefObject<number>;
};

const VtooltipContext = createContext<VtooltipContextValue | null>(null);

const useVtooltipContext = () => {
  const context = useContext(VtooltipContext);
  if (!context) {
    throw new Error("Vtooltip components must be used within VtooltipRoot");
  }
  return context;
};

type VtooltipRootProps = {
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
  springConfig?: any;
};

type VtooltipItemProps = {
  children: React.ReactNode;
  index: number;
  className?: string;
};

type VtooltipTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

type VtooltipContentProps = {
  children: React.ReactNode;
  className?: string;
};

// const SPRING = {
//   type: "spring",
//   stiffness: 300,
//   damping: 30,
//   mass: 0.8,
// };

const VtooltipRoot = ({
  springConfig,
  children,
  className,
  side = "right",
}: VtooltipRootProps) => {
  const IconRefs = useRef<HTMLButtonElement[]>([]);
  const ToolTipRef = useRef<HTMLDivElement[]>([]);
  const ToolTipParentRef = useRef<HTMLDivElement>(null);
  const itemsCountRef = useRef(0);
  const contentMapRef = useRef<Map<number, React.ReactNode>>(new Map());
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const tooltipPosition = useSpring(0, {
    stiffness: 350,
    damping: 30,
  });
  const clipPathTop = useSpring(0, springConfig);
  const clipPathBottom = useSpring(79, springConfig);
  const opacity = useSpring(0, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  const calculateClipPath = (index: number | null) => {
    if (index === null) {
      clipPathTop.set(0);
      clipPathBottom.set(0);
      opacity.set(0);
      return;
    }

    if (side === "left" || side === "right") {
      // Calculate top side height (sum of all elements before current)
      let topHeight = 0;
      for (let i = 0; i < index; i++) {
        const elementHeight =
          ToolTipRef.current[i]?.getBoundingClientRect().height || 0;
        topHeight += elementHeight;
      }

      // Calculate bottom side height (sum of all elements after current)
      let bottomHeight = 0;
      for (let i = index + 1; i < itemsCountRef.current; i++) {
        const elementHeight =
          ToolTipRef.current[i]?.getBoundingClientRect().height || 0;
        bottomHeight += elementHeight;
      }

      // Convert to percentage based on total height
      const totalHeight = ToolTipRef.current.reduce((sum, el) => {
        return sum + (el?.getBoundingClientRect().height || 0);
      }, 0);

      const topPercentage =
        totalHeight > 0 ? (topHeight / totalHeight) * 100 : 20;
      const bottomPercentage =
        totalHeight > 0 ? (bottomHeight / totalHeight) * 100 : 20;

      // Animate to new values
      clipPathTop.set(topPercentage);
      clipPathBottom.set(bottomPercentage);
    } else {
      // For top/bottom sides, calculate left side width (sum of all elements before current)
      let leftWidth = 0;
      for (let i = 0; i < index; i++) {
        const elementWidth =
          ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
        leftWidth += elementWidth;
      }

      // Calculate right side width (sum of all elements after current)
      let rightWidth = 0;
      for (let i = index + 1; i < itemsCountRef.current; i++) {
        const elementWidth =
          ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
        rightWidth += elementWidth;
      }

      // Convert to percentage based on total width
      const totalWidth = ToolTipRef.current.reduce((sum, el) => {
        return sum + (el?.getBoundingClientRect().width || 0);
      }, 0);

      const leftPercentage =
        totalWidth > 0 ? (leftWidth / totalWidth) * 100 : 20;
      const rightPercentage =
        totalWidth > 0 ? (rightWidth / totalWidth) * 100 : 20;

      // Animate to new values (using clipPathTop/Left and clipPathBottom/Right)
      clipPathTop.set(leftPercentage);
      clipPathBottom.set(rightPercentage);
    }

    opacity.set(1);
  };

  const onMouseEnterOnIcon = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const ActiveIcon = IconRefs.current[index]?.getBoundingClientRect();
    const ActiveTooltip = ToolTipRef.current[index]?.getBoundingClientRect();
    const parentTooltip = ToolTipParentRef.current?.getBoundingClientRect();

    if (ActiveIcon && parentTooltip) {
      if (side === "left" || side === "right") {
        // Calculate height of all elements before the current one
        let heightBeforeCurrent = 0;
        for (let i = 0; i < index; i++) {
          const elementHeight =
            ToolTipRef.current[i]?.getBoundingClientRect().height || 0;
          heightBeforeCurrent += elementHeight;
        }

        const centerYIcon = ActiveIcon.top + ActiveIcon.height / 2;

        // Get height of current element
        const currentElementHeight = ActiveTooltip.height;

        // Calculate active item position: parent top + height of all elements before + height/2 of current element
        const activeItemPosition =
          (parentTooltip?.top || 0) +
          heightBeforeCurrent +
          currentElementHeight / 2;

        tooltipPosition.set(centerYIcon - activeItemPosition);
      } else {
        // For top/bottom sides, calculate width of all elements before the current one
        let widthBeforeCurrent = 0;
        for (let i = 0; i < index; i++) {
          const elementWidth =
            ToolTipRef.current[i]?.getBoundingClientRect().width || 0;
          widthBeforeCurrent += elementWidth;
        }

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
    }

    // Calculate and animate clip path
    calculateClipPath(index);
  };

  const onMouseLeave = () => {
    opacity.set(0);
  };

  const setIconRef = (index: number, el: HTMLButtonElement | null) => {
    if (el) {
      IconRefs.current[index] = el;
    }
  };

  const setTooltipRef = (index: number, el: HTMLDivElement | null) => {
    if (el) {
      ToolTipRef.current[index] = el;
    }
  };

  const registerContent = useCallback(
    (index: number, content: React.ReactNode) => {
      const previousContent = contentMapRef.current.get(index);
      // Only update if content has changed
      if (previousContent !== content) {
        contentMapRef.current.set(index, content);
        itemsCountRef.current = contentMapRef.current.size;
        forceUpdate();
      }
    },
    [],
  );

  const contextValue: VtooltipContextValue = {
    IconRefs,
    ToolTipRef,
    ToolTipParentRef,
    tooltipPosition,
    clipPathTop,
    clipPathBottom,
    opacity,
    calculateClipPath,
    onMouseEnterOnIcon,
    onMouseLeave,
    setIconRef,
    setTooltipRef,
    registerContent,
    side,
    itemsCountRef,
  };

  // Get all content items sorted by index
  const contentItems = Array.from(contentMapRef.current.entries()).sort(
    ([a], [b]) => a - b,
  );

  return (
    <VtooltipContext.Provider value={contextValue}>
      <div className={cn("relative text-white")}>
        {/* Tooltip content container */}
        <div
          ref={ToolTipParentRef}
          className={cn(
            "absolute",
            side === "right" && "left-14 top-0",
            side === "left" && "right-14 top-0",
            side === "bottom" && "left-0 top-14",
            side === "top" && "bottom-14 left-0",
          )}
        >
          <motion.div
            className={cn(
              "bg-black",
              (side === "left" || side === "right") && "flex flex-col",
              (side === "top" || side === "bottom") && "flex h-8 flex-row",
              className,
            )}
            style={
              side === "left" || side === "right"
                ? {
                    opacity,
                    y: tooltipPosition,
                    clipPath: useMotionTemplate`inset(${clipPathTop}% 0 ${clipPathBottom}% 0 round 10px )`,
                  }
                : {
                    opacity,
                    x: tooltipPosition,
                    clipPath: useMotionTemplate`inset(0 ${clipPathBottom}% 0 ${clipPathTop}% round 10px )`,
                  }
            }
          >
            {contentItems.map(([originalIndex, content]) => (
              <div
                ref={(el) => setTooltipRef(originalIndex, el)}
                key={originalIndex}
                className={cn(
                  "z-1 inline-flex items-center justify-center",
                  (side === "left" || side === "right") && "h-8",
                  (side === "top" || side === "bottom") && "w-auto",
                )}
              >
                {content}
              </div>
            ))}
          </motion.div>
        </div>
        {/* Children (triggers) */}
        {children}
      </div>
    </VtooltipContext.Provider>
  );
};

const VtooltipItem = ({ children, index, className }: VtooltipItemProps) => {
  const { registerContent } = useVtooltipContext();
  const previousContentRef = useRef<React.ReactNode>(null);

  // Extract trigger and content from children
  React.useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    let content: React.ReactNode = null;

    React.Children.forEach(childrenArray, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === VtooltipContent) {
          content = (child.props as { children: React.ReactNode }).children;
        }
      }
    });

    // Only register if content has changed
    if (content && previousContentRef.current !== content) {
      previousContentRef.current = content;
      registerContent(index, content);
    }
  }, [children, index, registerContent]);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === VtooltipTrigger) {
          return (
            <VtooltipTriggerWrapper index={index}>
              {(child.props as { children: React.ReactNode }).children}
            </VtooltipTriggerWrapper>
          );
        }
        return null;
      })}
    </div>
  );
};

const VtooltipTriggerWrapper = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const { onMouseEnterOnIcon, onMouseLeave, setIconRef } = useVtooltipContext();

  return (
    <button
      ref={(el) => setIconRef(index, el)}
      onMouseEnter={(e) => onMouseEnterOnIcon(e, index)}
      onMouseLeave={onMouseLeave}
      className="flex items-center justify-center transition-colors hover:bg-[#121212]"
    >
      {children}
    </button>
  );
};

const VtooltipTrigger = ({ children }: VtooltipTriggerProps) => {
  return <>{children}</>;
};

const VtooltipContent = ({ children }: VtooltipContentProps) => {
  return <>{children}</>;
};

export { VtooltipContent, VtooltipItem, VtooltipRoot, VtooltipTrigger };


