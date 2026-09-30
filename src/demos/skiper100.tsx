// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Bell,
  BookOpen,
  Calendar,
  CircleArrowOutUpRight,
  Clock,
  Command,
  Menu,
  Plus,
  Settings,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tooltip, TooltipContent, TooltipTrigger } from "./skiper101";
type Point = { x: number; y: number };

// Increase this to update the right side
const SIDE_PADDING = 20;
const DRAGGABLE_SIZE = 40; // size-10 = 40px

const Skiper100 = () => {
  return (
    <div className="bg-background relative flex size-full items-center justify-center rounded-3xl border">
      <div className="absolute mb-[30vh] grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Try drag/drop the Button
        </span>
      </div>

      <p className="text-muted-foreground absolute bottom-4 text-xs">
        Inspired by{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          className="hover:text-foreground underline"
        >
          Vercel
        </a>
      </p>

      <VercelSnapButton />
    </div>
  );
};

export { Skiper100 };

const VercelSnapButton = () => {
  // Motion values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const x = useSpring(dragX, { stiffness: 350, damping: 20, mass: 0.1 });
  const y = useSpring(dragY, { stiffness: 350, damping: 20, mass: 0.1 });
  const isAnimating = useMotionValue(0);

  // States
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDroppedInArea, setIsDroppedInArea] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showDragBorder, setShowDragBorder] = useState(false);

  // Refs
  const snapAreaRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLButtonElement>(null);
  const snapAreaCenterRef = useRef<HTMLDivElement>(null);
  const prevIntersectingRef = useRef(false);
  const animationControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const draggableContainerRef = useRef<HTMLDivElement>(null);

  // PopoverItems
  const items = [
    {
      icon: Clock,
      label: "Recent Activity",
    },
    {
      icon: Calendar,
      label: "Calendar",
    },
    {
      icon: Settings,
      label: "Settings",
    },
    {
      icon: Bell,
      label: "Notifications",
    },
    {
      icon: CircleArrowOutUpRight,
      label: "Visit Github",
    },
    {
      icon: BookOpen,
      label: "Read Bookmarks",
    },
  ];

  // Helper function to get container rect
  const getContainerRect = () => {
    return draggableContainerRef.current?.getBoundingClientRect() || null;
  };

  // Initialize position
  useEffect(() => {
    const initPosition = () => {
      if (draggableContainerRef.current) {
        // Initialize drag position relative to container
        // Position it at the container's origin (0,0 relative to container)
        dragX.set(0);
        dragY.set(0);
      }
    };

    initPosition();
    window.addEventListener("resize", initPosition);

    return () => {
      window.removeEventListener("resize", initPosition);
    };
  }, [dragX, dragY]);

  // Deceleration rate is from iOS UIScrollView
  const project = (initialVelocity: number, decelerationRate = 0.998) => {
    return (
      ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
    );
  };

  const getNearestBoundary = (position: Point): number => {
    const containerRect = getContainerRect();
    if (!containerRect) return position.x;

    // Convert window-relative position to container-relative position
    const containerRelativeX = position.x - containerRect.left;

    // Constraints relative to the container increse from 14
    // Account for container being at right edge - we want to snap within viewport bounds
    const viewportLeft = -containerRect.left + SIDE_PADDING;
    const viewportRight =
      window.innerWidth - containerRect.left - SIDE_PADDING + DRAGGABLE_SIZE;

    const constraints = {
      minX: Math.max(viewportLeft, -containerRect.left + SIDE_PADDING),
      maxX: Math.min(
        viewportRight,
        window.innerWidth - containerRect.left - SIDE_PADDING - DRAGGABLE_SIZE,
      ),
    };

    // Calculate distances to left and right boundaries
    const distances = {
      left: Math.abs(containerRelativeX - constraints.minX),
      right: Math.abs(containerRelativeX - constraints.maxX),
    };

    // Find which boundary is nearest
    const minDistance = Math.min(distances.left, distances.right);

    // Return the container-relative x coordinate of the nearest boundary
    if (distances.left === minDistance) {
      return constraints.minX;
    } else {
      return constraints.maxX;
    }
  };

  const handleDrag = (e: any, info: any) => {
    setIsPopoverOpen(false);
    if (draggableRef.current && snapAreaRef.current) {
      const intersecting = areIntersecting(
        draggableRef.current,
        snapAreaRef.current,
      );

      // Trigger animation when isIntersecting changes
      if (intersecting !== prevIntersectingRef.current) {
        // Stop previous animation if running
        if (animationControlsRef.current) {
          animationControlsRef.current.stop();
        }
        // Start new animation
        isAnimating.set(1);
        animationControlsRef.current = animate(isAnimating, 0, {
          duration: 0.5,
          ease: "linear",
        });
        prevIntersectingRef.current = intersecting;
      }

      setIsIntersecting(intersecting);
    }

    if (isIntersecting && snapAreaCenterRef.current) {
      const containerRect = getContainerRect();
      if (containerRect) {
        // Convert snap area center position to container-relative coordinates
        const snapRect = snapAreaCenterRef.current.getBoundingClientRect();
        const snapX = snapRect.left - containerRect.left;
        const snapY = snapRect.top - containerRect.top;
        x.set(snapX);
        y.set(snapY);
      }
    } else {
      if (isAnimating.get() > 0) {
        x.set(dragX.get());
        y.set(dragY.get());
      } else {
        x.jump(dragX.get());
        y.jump(dragY.get());
      }
    }
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);

    const containerRect = getContainerRect();
    if (!containerRect) return;

    if (isIntersecting) {
      setIsDroppedInArea(true);
      return;
    }

    const translation = { x: dragX.get(), y: dragY.get() };
    const velocity = { x: info.velocity.x, y: info.velocity.y };

    // Project position - these are container-relative coordinates
    const projectedPosition = {
      x: translation.x + project(velocity.x),
      y: translation.y + project(velocity.y),
    };

    // Convert to window coordinates for boundary calculation
    const windowPosition = {
      x: projectedPosition.x + containerRect.left,
      y: projectedPosition.y + containerRect.top,
    };

    const nearestBoundaryX = getNearestBoundary(windowPosition);

    dragX.set(nearestBoundaryX);
    x.set(nearestBoundaryX);
    y.set(dragY.get());
  };

  // Calculate drag constraints based on container position
  // These constraints ensure the draggable stays within viewport bounds
  const getDragConstraints = () => {
    const containerRect = getContainerRect();
    if (!containerRect) {
      return {
        left: -Infinity,
        right: Infinity,
        top: -Infinity,
        bottom: Infinity,
      };
    }

    // Calculate constraints relative to the container
    // draggable's absolute position in viewport = containerRect.left + dragX
    // We want: SIDE_PADDING <= (containerRect.left + dragX) <= (window.innerWidth - DRAGGABLE_SIZE - SIDE_PADDING)
    const minX = SIDE_PADDING - containerRect.left;
    const maxX =
      window.innerWidth - containerRect.left - SIDE_PADDING + DRAGGABLE_SIZE;

    // Similar for Y axis
    // draggable's absolute position in viewport = containerRect.top + dragY
    // We want: SIDE_PADDING <= (containerRect.top + dragY) <= (window.innerHeight - DRAGGABLE_SIZE - SIDE_PADDING)
    const minY = SIDE_PADDING - containerRect.top;
    const maxY =
      window.innerHeight - containerRect.top - SIDE_PADDING + DRAGGABLE_SIZE;

    return {
      left: minX,
      right: maxX,
      top: minY,
      bottom: maxY,
    };
  };

  const dragConstraints = getDragConstraints();

  return (
    <div className="h-full w-full">
      {/* draggableSnapButton */}
      {/* --------------------------------------------------------------- */}
      <AnimatePresence>
        {!isDroppedInArea && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: 20 }}
            ref={draggableContainerRef}
            // update this for initial position
            className="z-90 group fixed right-4 top-1/2"
          >
            {/* draggable ghost */}
            <Tooltip>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger
                  onClick={(e) => {
                    e.preventDefault();
                    if (isDragging) {
                      setIsPopoverOpen(false);
                      draggableRef.current?.blur();
                      return;
                    } else {
                      setIsPopoverOpen(true);
                    }
                  }}
                  asChild
                >
                  <TooltipTrigger asChild>
                    <motion.button
                      ref={draggableRef}
                      drag
                      dragConstraints={dragConstraints}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={handleDragEnd}
                      dragMomentum={false}
                      onDrag={handleDrag}
                      style={{ x: dragX, y: dragY }}
                      className="z-99 cursor-grab! active:cursor-grabbing! absolute size-10 rounded-full focus-visible:outline-none"
                    ></motion.button>
                  </TooltipTrigger>
                </PopoverTrigger>
                {!isDragging && (
                  <TooltipContent
                    side="left"
                    sideOffset={4}
                    className="z-80 flex items-center justify-center gap-2 py-1.5 pl-3 pr-2"
                  >
                    Skiper Toolbar{" "}
                    <span
                      className={cn(
                        "inline-flex size-6 items-center justify-center rounded !border",
                        isIntersecting && "border",
                      )}
                    >
                      <Command className="size-3" />
                    </span>
                  </TooltipContent>
                )}
                <PopoverContent
                  side="left"
                  sideOffset={8}
                  className="z-90 w-50 bg-background flex flex-col gap-1 rounded-2xl p-1"
                >
                  {items.map((item) => (
                    <button
                      key={item.label}
                      className="hover:bg-muted group relative flex w-full cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 after:absolute after:bottom-0 after:left-0 after:h-1.5 after:w-full after:translate-y-full after:content-['']"
                    >
                      <item.icon className="text-muted-foreground group-hover:text-foreground size-3.5" />
                      <span className="text-muted-foreground group-hover:text-foreground text-sm">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </Tooltip>

            {/* Visible draggable */}
            <motion.div
              style={{ x, y }}
              className={cn(
                "z-90 bg-background/80 flex size-10 items-center justify-center rounded-full p-0.5 backdrop-blur-2xl",
                !isIntersecting ? "border" : "border-0",
              )}
            >
              <div className="group-hover:bg-muted/50 flex size-full items-center justify-center rounded-full">
                <Menu className="size-4.5" />
                <div className="border-background absolute right-2.5 top-2.5 size-2 rounded-full border-[1.3px] bg-blue-500"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------------------- */}
      {/* Snap area */}
      {/* --------------------------------------------------------------- */}
      <AnimatePresence>
        {isDragging && (
          <>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 20,
                mass: 0.2,
              }}
              ref={snapAreaRef}
              className={cn(
                "h-30 fixed bottom-0 left-1/2 flex w-80 -translate-x-1/2 flex-col items-center justify-start",
                showDragBorder && "bg-red/10",
              )}
            >
              <div
                ref={snapAreaCenterRef}
                className={cn(
                  "bg-background outline-muted flex size-10 items-center justify-center rounded-full outline",
                  isIntersecting && "outline-blue-500 delay-150",
                )}
              >
                <Plus className="size-7 rotate-45 stroke-1" />
              </div>

              <span
                className={cn(
                  "mt-4 text-xs",
                  isIntersecting
                    ? "text-blue-500 opacity-100 delay-150"
                    : "opacity-40",
                )}
              >
                {!isIntersecting ? "Drop here to close" : "Leave here to close"}
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------------------- */}
      {/* <DebugPanel
        dragX={dragX}
        dragY={dragY}
        x={x}
        y={y}
        inDropZone={isIntersecting}
        isDragging={isDragging}
        isPopoverOpen={isPopoverOpen}
      /> */}
      {/* --------------------------------------------------------------- */}
    </div>
  );
};

export function areIntersecting(
  el1: HTMLElement,
  el2: HTMLElement,
  padding = 0,
) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  );
}

export default VercelSnapButton;
