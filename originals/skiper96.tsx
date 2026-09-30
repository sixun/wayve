"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Bell,
  BookOpen,
  BookOpenIcon,
  ChevronRight,
  CircleFadingArrowUp,
  FolderKanban,
  Home,
  LogOut,
  LucideIcon,
  Settings2,
  ShieldAlert,
  User,
  Volume2,
} from "lucide-react";
import { RefObject, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { useOnClickOutside } from "usehooks-ts";

import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";

import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";

interface Tab {
  title: string;
  icon?: LucideIcon;
}

interface ExpandedTabsProps {
  tabs: Tab[];
  className?: string;
  selected: number | null;
  setSelected: (index: number | null) => void;
  setDirection: (direction: number) => void;
}

const transition = {
  delay: 0.1,
  type: "spring" as const,
  bounce: 0,
  duration: 0.6,
};

const ExpandedTabs = ({
  tabs,
  className,
  selected,
  setSelected,
  setDirection,
}: ExpandedTabsProps) => {
  const handleTabSelect = (index: number) => {
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }

    // Calculate direction: 1 for forward, -1 for backward
    const newDirection = index > selected ? 1 : -1;
    setDirection(newDirection);
    setSelected(index);
  };

  return (
    <div
      className={cn(
        "flex h-9 w-full items-center justify-center gap-1",
        className,
      )}
    >
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.title}
          initial={false}
          animate={{
            gap: selected === index ? ".5rem" : 0,
            paddingLeft: selected === index ? "1rem" : ".5rem",
            paddingRight: selected === index ? "1rem" : ".5rem",
          }}
          onClick={() => {
            handleTabSelect(index);
          }}
          className={cn(
            "relative flex h-full items-center justify-center rounded-2xl px-4 text-sm font-medium transition-colors duration-300 after:absolute after:right-0 after:top-0 after:h-full after:w-3 after:translate-x-full after:content-['']",
            selected === index
              ? cn("bg-foreground/4")
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {tab.icon && <tab.icon className="size-4 fill-current" />}
          <AnimatePresence initial={false}>
            {selected === index && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={transition}
                className="overflow-hidden whitespace-nowrap font-medium tracking-tight"
              >
                {tab.title}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
};

const Skiper96 = () => {
  const [direction, setDirection] = useState<number>(1);

  const [ref, bounds] = useMeasure();

  const [selected, setSelected] = useState<number | null>(null);

  const [volume, setVolume] = useState<number[]>([50]);

  const [settingsToggles, setSettingsToggles] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
  });

  const content = useMemo(() => {
    switch (selected) {
      case 0: {
        const items = [
          {
            icon: User,
            title: "profile",
          },
          {
            icon: CircleFadingArrowUp,
            title: "upgrade",
          },
          {
            icon: FolderKanban,
            title: "projects",
          },
          {
            icon: BookOpen,
            title: "documentation",
          },

          {
            icon: LogOut,
            title: "logout",
          },
        ];
        return (
          <div className="mb-2 flex flex-col gap-0.5">
            {items.map((item, index) => (
              <div
                key={index}
                className="hover:bg-muted flex h-10 cursor-pointer items-center justify-between gap-2 rounded-xl px-2 text-sm font-medium"
              >
                {" "}
                <span className="flex items-center justify-center gap-2">
                  <item.icon className="size-4" /> {item.title}
                </span>
                <span className="*:data-[slot='switch']:bg-foreground/10 **:data-[slot='switch-thumb']:w-5 *:data-[slot='switch']:w-10">
                  <ChevronRight className="size-4" />
                </span>
              </div>
            ))}
          </div>
        );
      }

      case 1: {
        return (
          <ScrollArea>
            <div className="mb-2 max-h-72 space-y-1 p-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="hover:bg-muted flex h-10 w-full items-center justify-between rounded-xl px-2 text-sm"
                >
                  <span>Notification {index + 1}</span>
                  <span className="text-muted-foreground flex items-center gap-3 text-xs">
                    {" "}
                    {index * 4 + 2} sec ago
                    <div className="size-2 rounded-2xl bg-sky-500">
                      <div className="size-2 animate-ping rounded-2xl bg-sky-500"></div>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        );
      }

      case 2:
        return (
          <div className="mb-2 flex flex-col gap-3 pt-3">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center gap-2 text-sm">
                <Volume2 className="size-4" />
                Volume
              </span>
              <span className="text-muted-foreground text-xs">
                {volume[0]}%
              </span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              className="w-full px-2"
            />

            <div className="flex flex-col gap-0.5">
              {[
                { key: "darkMode", label: "Dark Mode" },
                { key: "notifications", label: "Notifications" },
                { key: "autoSave", label: "Auto Save" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="hover:bg-muted flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 text-sm"
                >
                  <span>{item.label}</span>
                  <span className="*:data-[slot='switch']:bg-foreground/10 **:data-[slot='switch-thumb']:w-5 flex items-center justify-center *:data-[slot='switch']:h-fit *:data-[slot='switch']:w-10">
                    <Switch
                      checked={
                        settingsToggles[
                          item.key as keyof typeof settingsToggles
                        ]
                      }
                      onCheckedChange={(checked) =>
                        setSettingsToggles((prev) => ({
                          ...prev,
                          [item.key]: checked,
                        }))
                      }
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: {
        return (
          <ScrollArea>
            <div className="mb-2 max-h-52 space-y-1 p-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-10 w-full items-center justify-between rounded-xl px-2 text-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted-foreground relative flex size-4 items-start justify-center rounded-2xl">
                      <div className="bg-background z-2 absolute top-0.5 size-3 rounded-2xl"></div>
                      <div className="bg-muted-foreground absolute h-12 w-px"></div>
                    </div>
                    <span>Ticket 00{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-3 text-xs">
                    {" "}
                    {index * 4 + 2} sec ago
                    <div className="size-2 rounded-2xl bg-orange-500">
                      <div className="size-2 animate-ping rounded-2xl bg-orange-500"></div>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        );
      }

      case 4: {
        return (
          <>
            {[25, 15].map((item) => (
              <div className="space-y-2 p-2" key={item}>
                <div className="text-muted-foreground flex w-full justify-between gap-2 text-xs">
                  <span>{item > 20 ? "API" : "Build and Deploy"}</span>
                  <span
                    className={cn(
                      "text-sky-500/50",
                      item < 20 ? "text-red-500/50" : "text-sky-500/50",
                    )}
                  >
                    {item > 20 ? "operational" : "system failure"}
                  </span>
                </div>
                <div className="flex h-10 w-full justify-between gap-1">
                  {Array.from({ length: 29 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex h-10 w-0.5 items-center justify-center rounded-full",
                        index < item
                          ? item < 20
                            ? "bg-red-500"
                            : "bg-sky-500"
                          : "bg-muted",
                      )}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </>
        );
      }

      default: {
        return <div></div>;
      }
    }
  }, [selected, volume, settingsToggles]);

  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },
    { title: "Settings", icon: Settings2 },
    { title: "Changelog", icon: BookOpenIcon },
    { title: "Security", icon: ShieldAlert },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (selected !== null) {
      setSelected(null);
    }
  });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="-mt-36 mb-10 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Click to see the items
        </span>
      </div>
      <div ref={containerRef} className="flex h-96 items-end justify-center">
        <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
          <motion.div
            initial={false}
            animate={{
              height: selected === null ? 50 : bounds.height,
              width: selected === null ? 200 : 290,
            }}
            className={cn(
              "bg-background relative mx-auto overflow-hidden rounded-3xl",
            )}
          >
            <div ref={ref}>
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direction}
              >
                <motion.div
                  key={selected}
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  custom={direction}
                  className="bg-background/80 p-2 pb-11"
                >
                  {content}
                </motion.div>
              </AnimatePresence>

              <div className="bg-background absolute bottom-0 w-full p-2">
                <ExpandedTabs
                  tabs={tabs}
                  selected={selected}
                  setSelected={setSelected}
                  setDirection={setDirection}
                />
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
};

export { Skiper96 };

const variants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};
