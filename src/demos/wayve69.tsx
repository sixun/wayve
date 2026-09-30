// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { motion, MotionConfig } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

interface WayveNumberFlowProps {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "number" | "currency" | "percentage" | "decimal";
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
}

const WayveNumberFlow = ({
  value,
  prefix = "",
  suffix = "",
  format = "number",
  locale = "en-US",
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  className = "",
}: WayveNumberFlowProps) => {
  const [ref2, bounds2] = useMeasure();

  // Format the number based on the format type
  const formatNumber = (val: number): string => {
    switch (format) {
      case "currency":
        return val.toLocaleString(locale, {
          minimumFractionDigits,
          maximumFractionDigits,
        });
      case "percentage":
        return val.toLocaleString(locale, {
          minimumFractionDigits,
          maximumFractionDigits,
        });
      case "decimal":
        return val.toLocaleString(locale, {
          minimumFractionDigits,
          maximumFractionDigits,
        });
      default:
        return val.toLocaleString(locale, {
          minimumFractionDigits,
          maximumFractionDigits,
        });
    }
  };

  const formattedValue = formatNumber(value);
  const digits = formattedValue.split("");

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 400, damping: 35 }}>
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2",
          className,
        )}
      >
        <motion.div
          animate={{
            width: bounds2.width,
          }}
          className="flex items-center gap-2 overflow-hidden"
        >
          <div
            ref={ref2}
            className="font-lg flex justify-between font-semibold tracking-tight"
          >
            {/* prefix */}
            {prefix && <span>{prefix}</span>}
            {(() => {
              const charCount: Record<string, number> = {};
              return digits.map((char) => {
                charCount[char] = (charCount[char] || 0) + 1;
                const isDuplicate = charCount[char] > 1;
                const key = isDuplicate
                  ? `${char}-dupChar-${charCount[char]}`
                  : `${char}`;
                return (
                  <motion.span
                    key={key}
                    layoutId={key}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              });
            })()}
            {/* suffix */}
            {suffix && <span className="whitespace-nowrap">{suffix}</span>}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};

// Demo component that uses WayveNumberFlow
const Wayve69 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Different number configurations
  const numberConfigs = [
    { value: 39843, prefix: "+", suffix: "%", format: "number" as const },
    { value: -9843.5, prefix: "", suffix: "", format: "decimal" as const },
    { value: 943.14, prefix: "", suffix: "米", format: "decimal" as const },
    { value: 19348.43, prefix: "$", suffix: "", format: "currency" as const },
  ];

  const currentConfig = numberConfigs[currentIndex];

  const handleNextValue = () => {
    setCurrentIndex((prev) => (prev + 1) % numberConfigs.length);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Shuffle the number
        </span>
      </div>

      <div className="flex min-h-[100px] items-center justify-center">
        <WayveNumberFlow
          value={currentConfig.value}
          prefix={currentConfig.prefix}
          suffix={currentConfig.suffix}
          format={currentConfig.format}
          className="text-6xl font-semibold"
        />
      </div>

      <button
        onClick={handleNextValue}
        className="bg-background flex items-center justify-center gap-2 rounded-full px-5 py-2 transition-all ease-in-out active:scale-95"
      >
        <RefreshCcw className="size-4" />
        Shuffle
      </button>
    </div>
  );
};

export { Wayve69, WayveNumberFlow };


