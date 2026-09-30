// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { motion, useMotionValue } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface InfiniteGridProps {
  imagePathRoot?: string;
  itemCount?: number;
  itemGap?: number;
  columns?: number;
  itemWidth?: number;
  itemHeight?: number;
  className?: string;
}

const InfiniteGrid = ({
  // in this below folder there should be image in order like img1.png like these 20 images
  imagePathRoot = "/wayve/media/site/wayvev1/wayve5/img",
  itemCount = 20,
  itemGap = 50,
  columns = 4,
  itemWidth = 160,
  itemHeight = 150,
  className,
}: InfiniteGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState(false);

  const isDraggingRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    dragVelocityX: 0,
    dragVelocityY: 0,
    lastDragTime: 0,
    mouseHasMoved: false,
    canDrag: true,
  });

  // Framer Motion motion values (no spring)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Sync motion value to targetX/targetY
  useEffect(() => {
    const updateMotion = () => {
      x.set(dragStateRef.current.targetX);
      y.set(dragStateRef.current.targetY);
    };
    updateMotion();
  }, [x, y]);

  // Update motion value on every target change
  const updateMotion = useCallback(() => {
    x.set(dragStateRef.current.targetX);
    y.set(dragStateRef.current.targetY);
  }, [x, y]);

  // Memoize constants to prevent recalculation
  const constants = useMemo(
    () => ({
      itemCount,
      itemGap,
      columns,
      itemWidth,
      itemHeight,
      ease: 0.075,
      momentumFactor: 200,
      scrollSpeed: 1,
      minCols: 10,
      minRows: 10,
      buffer: 4,
      directionBuffer: 500,
      velocityThreshold: 0.1,
      moveThreshold: 5,
      minDt: 10,
    }),
    [itemCount, itemGap, columns, itemWidth, itemHeight],
  );

  // Mouse/touch/wheel handlers: update targetX/targetY, then updateSpring()
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!dragStateRef.current.canDrag) return;

    isDraggingRef.current = true;
    dragStateRef.current.mouseHasMoved = false;
    dragStateRef.current.startX = e.clientX;
    dragStateRef.current.startY = e.clientY;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !dragStateRef.current.canDrag) return;
      e.preventDefault();
      const { moveThreshold, minDt } = constants;
      const dx = e.clientX - dragStateRef.current.startX;
      const dy = e.clientY - dragStateRef.current.startY;
      if (Math.abs(dx) > moveThreshold || Math.abs(dy) > moveThreshold) {
        dragStateRef.current.mouseHasMoved = true;
      }
      const now = Date.now();
      const dt = Math.max(minDt, now - dragStateRef.current.lastDragTime);
      dragStateRef.current.lastDragTime = now;
      dragStateRef.current.dragVelocityX = dx / dt;
      dragStateRef.current.dragVelocityY = dy / dt;
      dragStateRef.current.targetX += dx;
      dragStateRef.current.targetY += dy;
      dragStateRef.current.startX = e.clientX;
      dragStateRef.current.startY = e.clientY;
      updateMotion();
    },
    [constants, updateMotion],
  );

  const handleMouseUp = useCallback(
    (e?: MouseEvent) => {
      if (e) e.preventDefault();
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      if (dragStateRef.current.canDrag) {
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
        const { velocityThreshold, momentumFactor } = constants;
        if (
          Math.abs(dragStateRef.current.dragVelocityX) > velocityThreshold ||
          Math.abs(dragStateRef.current.dragVelocityY) > velocityThreshold
        ) {
          dragStateRef.current.targetX +=
            dragStateRef.current.dragVelocityX * momentumFactor;
          dragStateRef.current.targetY +=
            dragStateRef.current.dragVelocityY * momentumFactor;
        }
        updateMotion();
      }
    },
    [constants, updateMotion],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (!dragStateRef.current.canDrag) return;
      const { scrollSpeed } = constants;
      const deltaX = -e.deltaX * scrollSpeed;
      const deltaY = -e.deltaY * scrollSpeed;
      dragStateRef.current.targetX += deltaX;
      dragStateRef.current.targetY += deltaY;
      updateMotion();
    },
    [constants, updateMotion],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!dragStateRef.current.canDrag) return;

    isDraggingRef.current = true;
    dragStateRef.current.mouseHasMoved = false;
    dragStateRef.current.startX = touch.clientX;
    dragStateRef.current.startY = touch.clientY;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!isDraggingRef.current || !dragStateRef.current.canDrag) return;
      const { moveThreshold, minDt } = constants;
      const dx = touch.clientX - dragStateRef.current.startX;
      const dy = touch.clientY - dragStateRef.current.startY;
      if (Math.abs(dx) > moveThreshold || Math.abs(dy) > moveThreshold) {
        dragStateRef.current.mouseHasMoved = true;
      }
      const now = Date.now();
      const dt = Math.max(minDt, now - dragStateRef.current.lastDragTime);
      dragStateRef.current.lastDragTime = now;
      dragStateRef.current.dragVelocityX = dx / dt;
      dragStateRef.current.dragVelocityY = dy / dt;
      dragStateRef.current.targetX += dx;
      dragStateRef.current.targetY += dy;
      dragStateRef.current.startX = touch.clientX;
      dragStateRef.current.startY = touch.clientY;
      updateMotion();
    },
    [constants, updateMotion],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      if (dragStateRef.current.canDrag) {
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
        const { velocityThreshold, momentumFactor } = constants;
        if (
          Math.abs(dragStateRef.current.dragVelocityX) > velocityThreshold ||
          Math.abs(dragStateRef.current.dragVelocityY) > velocityThreshold
        ) {
          dragStateRef.current.targetX +=
            dragStateRef.current.dragVelocityX * momentumFactor;
          dragStateRef.current.targetY +=
            dragStateRef.current.dragVelocityY * momentumFactor;
        }
        updateMotion();
      }
    },
    [constants, updateMotion],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClient, handleMouseMove, handleMouseUp]);

  // Memoized render items function
  const renderItems = useCallback(() => {
    if (!isClient || typeof window === "undefined") return [];

    const items: React.JSX.Element[] = [];
    const { targetX, targetY } = dragStateRef.current;
    const {
      buffer,
      directionBuffer,
      itemWidth,
      itemHeight,
      itemGap,
      itemCount,
      columns,
      minCols,
      minRows,
    } = constants;

    const viewWidth = window.innerWidth * (1 + buffer);
    const viewHeight = window.innerHeight * (1 + buffer);
    const movingRight = false;
    const movingDown = false;
    const directionBufferX = movingRight ? -directionBuffer : directionBuffer;
    const directionBufferY = movingDown ? -directionBuffer : directionBuffer;

    const startCol = Math.floor(
      (-targetX - viewWidth / 2 + (movingRight ? directionBufferX : 0)) /
        (itemWidth + itemGap),
    );
    const endCol = Math.ceil(
      (-targetX + viewWidth * 1.5 + (!movingRight ? directionBufferX : 0)) /
        (itemWidth + itemGap),
    );
    const startRow = Math.floor(
      (-targetY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
        (itemHeight + itemGap),
    );
    const endRow = Math.ceil(
      (-targetY + viewHeight * 1.5 + (!movingDown ? directionBufferY : 0)) /
        (itemHeight + itemGap),
    );

    // Ensure we always render at least some items
    const actualStartCol = Math.min(startCol, -minCols);
    const actualEndCol = Math.max(endCol, minCols);
    const actualStartRow = Math.min(startRow, -minRows);
    const actualEndRow = Math.max(endRow, minRows);

    for (let row = actualStartRow; row <= actualEndRow; row++) {
      for (let col = actualStartCol; col <= actualEndCol; col++) {
        const itemId = `${col},${row}`;
        const itemNum = (Math.abs(row * columns + col) % itemCount) + 1;
        const imgSrc = `${imagePathRoot}${itemNum}.webp`;

        items.push(
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              delay: Math.random() * 0.3,
            }}
            key={itemId}
            className="absolute h-[160px] w-[160px] rounded-2xl"
            style={{
              left: `${col * (itemWidth + itemGap)}px`,
              top: `${row * (itemHeight + itemGap)}px`,
            }}
          >
            <img
              src={imgSrc}
              alt={`Image ${itemNum}`}
              className="pointer-events-none h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>,
        );
      }
    }

    return items;
  }, [isClient, constants, imagePathRoot]);

  // Memoized loading state
  const loadingState = useMemo(
    () => (
      <div className="flex h-screen w-screen items-center justify-center bg-white text-black/60">
        Loading...
      </div>
    ),
    [],
  );

  if (!isClient) {
    return loadingState;
  }

  return (
    <div
      className={cn(
        "font-inter flex h-full w-screen items-center justify-center overflow-hidden bg-[#f5f4f3]",
        className,
      )}
    >
      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-grab select-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div className="absolute will-change-transform" style={{ x, y }}>
          {renderItems()}
        </motion.div>
      </div>
    </div>
  );
};

// Keep the original Wayve5 component for backward compatibility
const Wayve5 = () => {
  return <InfiniteGrid />;
};

export { InfiniteGrid, Wayve5 };


