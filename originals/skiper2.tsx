"use client";

import { motion } from "framer-motion";
import { GripHorizontal, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { Airdrop, AirdropMini } from "./_components/airdrop";
import { FindMy } from "./_components/findmy";
import { LowBattery } from "./_components/lowBattery";
import { Music } from "./_components/music";
import { Phone } from "./_components/phone";
import { Record } from "./_components/record";
import { Ring } from "./_components/ring";
import { ScreenRecord } from "./_components/screen-record";
import { Timer } from "./_components/timer";

const DynamicIsland = ({
  view,
  variantKey,
}: {
  view: string;
  variantKey: string;
}) => {
  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;
      case "record":
        return <Record />;
      case "timer":
        return <Timer />;
      case "music":
        return <Music />;
      case "airdrop":
        return <Airdrop setView={undefined} />;
      case "airdropMini":
        return <AirdropMini />;
      case "lowBattery":
        return <LowBattery />;
      case "phone":
        return <Phone />;
      case "findmy":
        return <FindMy />;
      case "screenRecord":
        return <ScreenRecord />;
      case "idle":
        return <div className="h-7" />;
    }
  }, [view]);

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        bounce:
          BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] || 0.2,
      }}
      style={{ borderRadius: 32 }}
      className="mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black"
    >
      <motion.div
        transition={{
          type: "spring",
          bounce:
            BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] || 0.2,
        }}
        initial={{
          scale: 0.9,
          opacity: 0,
          filter: "blur(5px)",
          originX: 0.5,
          originY: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          originX: 0.5,
          originY: 0.5,
          transition: {
            delay: 0.05,
          },
        }}
        key={view}
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

const Options = ({
  view,
  setView,
  setVariantKey,
}: {
  view: string;
  setView: (v: string) => void;
  setVariantKey: (v: string) => void;
}) => {
  return (
    <motion.div
      drag
      className="top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[245px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0"
    >
      <div className="flex items-center justify-between">
        <span className="size-4 cursor-grab active:cursor-grabbing">
          <GripHorizontal className="size-4 opacity-50" />
        </span>
        <p
          onClick={() => {
            setView("idle");
            setVariantKey("idle");
          }}
          className="hover:bg-muted3 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50"
        >
          Options
          <span className="group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90">
            <RefreshCcw className="size-4 opacity-50" />
          </span>{" "}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
          "idle",
          "ring",
          "timer",
          "record",
          "music",
          "airdrop",
          "airdropMini",
          "lowBattery",
          "phone",
          "findmy",
          "screenRecord",
        ].map((v) => (
          <button
            type="button"
            className="bg-muted3 text-foreground flex-1 rounded-xl px-2.5 py-1.5 text-xs"
            onClick={() => {
              if (v === "idle") {
                setView("idle");
                setVariantKey("idle");
                return;
              }
              setView("idle");
              setTimeout(() => setView(v), 500);
              setVariantKey(`${view}-${v}`);
            }}
            key={v}
          >
            {v}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const Skiper2 = () => {
  const [view, setView] = useState("idle");
  const [variantKey, setVariantKey] = useState("idle");

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <DynamicIsland view={view} variantKey={variantKey} />
      <Options view={view} setView={setView} setVariantKey={setVariantKey} />
    </div>
  );
};

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
  "music-timer": 0.2,
  "music-ring": 0.2,
  "aridrop-ring": 0.2,
  "aridrop-timer": 0.2,
  "aridrop-record": 0.2,
  "music-record": 0.2,
  "music-airdrop": 0.2,
  "airdrop-airdropMini": 0.2,
  "airdropMini-airdrop": 0.2,
};

export { Skiper2 };

/**
 * Dynamic Island Animation Component — v1.0.0
 
 * This implementation follows the process taught in the Animations.dev course by Emil Kowalski, with additional components and modifications by the author.
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * Built with Motion for React to recreate the iPhone Dynamic Island animations.
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
