"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

// Custom Navigation Buttons Component
const CustomCarouselNavigation = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <>
      <button
        className={cn(
          "absolute left-0 top-1/2 flex size-10 -translate-x-full -translate-y-1/2 cursor-pointer justify-end active:scale-95",
          !canScrollPrev && "opacity-0",
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ChevronLeft className="size-5" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button
        className={cn(
          "absolute -right-0 top-1/2 flex size-10 -translate-y-1/2 translate-x-full cursor-pointer active:scale-95",
          !canScrollNext && "opacity-0",
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ChevronRight className="size-5" />
        <span className="sr-only">Next slide</span>
      </button>
    </>
  );
};

// Carousel component that syncs with isActive state
const CarouselWithActiveSync = ({
  isActive,
  setIsActive,
  FEATURES,
  colors,
  activeColor,
  setActiveColor,
}: {
  isActive: number | null;
  setIsActive: (index: number | null) => void;
  FEATURES: {
    id: number;
    name: string;
    desc: string;
    src: string;
  }[];
  colors: {
    id: number;
    color: string;
    src: string;
  }[];
  activeColor: number | null;
  setActiveColor: (index: number) => void;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Listen to carousel slide changes and update isActive
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setIsActive(currentIndex);
    };

    api.on("select", onSelect);
    onSelect(); // Set initial state

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setIsActive]);

  // Scroll to active slide when isActive changes externally
  useEffect(() => {
    if (!api || isActive === null) return;

    const currentIndex = api.selectedScrollSnap();
    if (currentIndex !== isActive) {
      api.scrollTo(isActive);
    }
  }, [api, isActive]);

  return (
    <>
      {isActive === null ? (
        <ul className="no-scroll z-1 relative flex gap-3 overflow-scroll px-5 lg:hidden lg:flex-col lg:items-start">
          {FEATURES.map((feature, index) => (
            <motion.li
              key={index}
              layout
              transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.3,
              }}
              style={{
                borderRadius: "25px",
              }}
              className="hover:bg-foreground/14 bg-foreground/10 flex h-fit w-fit items-center justify-center backdrop-blur-sm"
            >
              <motion.button
                key="btn"
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.3, delay: 0.25 }}
                onClick={() => setIsActive(index)}
                className="flex h-[56px] cursor-pointer items-center justify-center gap-[14px] rounded-full pl-[14px] pr-8"
              >
                {!index ? (
                  <div
                    style={{
                      backgroundColor: activeColor
                        ? colors[activeColor].color
                        : "white",
                    }}
                    className="size-6 rounded-full border-b border-white"
                  />
                ) : (
                  <PlusAdd />
                )}
                <span className="whitespace-nowrap text-lg font-semibold capitalize">
                  {feature.name}
                </span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-1 flex items-end">
            {FEATURES.map((feature, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-[85%] pl-2 first:ml-10 last:mr-10"
              >
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.3,
                  }}
                  style={{
                    borderRadius: "25px",
                  }}
                  className={cn(
                    "hover:bg-foreground/14 bg-foreground/10 flex h-fit w-full items-center justify-center backdrop-blur-sm",
                  )}
                >
                  {isActive === index ? (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25,
                        y: {
                          duration: 0.5,
                          delay: 0.25,
                        },
                      }}
                      className="p-6 text-lg"
                    >
                      <div>
                        <b className="capitalize">{feature.name}.</b>{" "}
                        {feature.desc}
                      </div>
                      {!index && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                          {colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveColor(color.id)}
                              style={{ backgroundColor: color.color }}
                              className="size-6 cursor-pointer rounded-full border-b border-white"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(2px)" }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      onClick={() => setIsActive(index)}
                      className={cn(
                        "flex h-[56px] w-full cursor-pointer items-center justify-start gap-[14px] rounded-full",
                        index > isActive
                          ? "justify-start pl-3 lg:justify-center"
                          : "justify-end pr-3 lg:justify-center",
                      )}
                    >
                      {index > isActive ? <ChevronRight /> : <ChevronLeft />}
                    </motion.button>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CustomCarouselNavigation />
        </Carousel>
      )}
    </>
  );
};

const Skiper76 = () => {
  const FEATURES = [
    {
      id: 1,
      name: "colors",
      desc: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 2,
      name: "aluminum unibody",
      desc: "Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
      src: "/images/oct25Coll/iphone17pro/2.jpg",
    },
    {
      id: 3,
      name: "vapor chamber",
      desc: "Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
      src: "/images/oct25Coll/iphone17pro/3.jpg",
    },
    {
      id: 4,
      name: "ceramic shield",
      desc: "Protects the back of iPhone 17 Pro, making it 4x more resistant to cracks.4 New Ceramic Shield 2 on the front has 3x better scratch resistance.5",
      src: "/images/oct25Coll/iphone17pro/4.jpg",
    },
    {
      id: 5,
      name: "immersive pro display",
      desc: "Our best‑ever 6.3‑inch and 6.9‑inch Super Retina XDR displays.6 Brighter. Better anti‑reflection. ProMotion up to 120Hz.",
      src: "/images/oct25Coll/iphone17pro/5.jpg",
    },
    {
      id: 6,
      name: "camera control",
      desc: "Instantly take a photo, record video, adjust settings, and more. So you never miss a moment.",
      src: "/images/oct25Coll/iphone17pro/6.jpg",
    },
    {
      id: 7,
      name: "Action button",
      desc: "A customizable fast track to your favorite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts, and more.",
      src: "/images/oct25Coll/iphone17pro/7.jpg",
    },
  ];

  const [isActive, setIsActive] = useState<number | null>(null);

  const colors = [
    {
      id: 0,
      color: "#fff",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 1,
      color: "#F77313",
      src: "/images/oct25Coll/iphone17pro/1c.jpg",
    },
    {
      id: 2,
      color: "#2B3145",
      src: "/images/oct25Coll/iphone17pro/1b.jpg",
    },
  ];

  const [activeColor, setActiveColor] = useState<number | null>(null);

  const { isMobile, isLoading } = useIsMobile();

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
    >
      <div className="from-muted to-muted text-foreground dark flex h-full w-screen items-center justify-center bg-gradient-to-t p-4">
        <div className="rounded-4xl relative flex h-[745px] w-full max-w-[90rem] flex-col justify-end overflow-hidden bg-black pb-5 shadow md:justify-center">
          <div className="relative flex items-center md:px-10 lg:px-24">
            <AnimatePresence>
              {isActive !== null && (
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="absolute left-8 hidden flex-col gap-2 lg:flex"
                >
                  <button
                    onClick={() => {
                      if (isActive === null) {
                        setIsActive(0);
                      } else if (isActive > 0) {
                        setIsActive(isActive - 1);
                      }
                    }}
                    disabled={isActive === 0}
                    className={cn(
                      "z-3 bg-foreground/10 top-5 flex size-10 items-center justify-center rounded-full active:scale-95",
                      isActive === 0
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                    )}
                  >
                    <ChevronUp className="stroke-3 size-6" />
                  </button>
                  <button
                    onClick={() => {
                      if (isActive === null) {
                        setIsActive(0);
                      } else if (isActive < FEATURES.length - 1) {
                        setIsActive(isActive + 1);
                      }
                    }}
                    disabled={isActive === FEATURES.length - 1}
                    className={cn(
                      "z-3 bg-foreground/10 top-5 flex size-10 items-center justify-center rounded-full transition-all ease-out active:scale-95",
                      isActive === FEATURES.length - 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                    )}
                  >
                    <ChevronDown className="stroke-3 size-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* desktop */}
            <ul className="z-1 relative hidden flex-col justify-center gap-3 md:flex">
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={index}
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.3,
                  }}
                  style={{
                    borderRadius: "25px",
                  }}
                  className="hover:bg-foreground/14 bg-foreground/10 flex h-fit w-fit items-center justify-center backdrop-blur-sm"
                >
                  {isActive === index ? (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25,
                        y: {
                          duration: 0.5,
                          delay: 0.25,
                        },
                      }}
                      className="max-w-[26.5rem] p-6 text-lg"
                    >
                      {" "}
                      <div>
                        <b className="capitalize">{feature.name}.</b>{" "}
                        {feature.desc}
                      </div>
                      {!index && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                          {colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveColor(color.id)}
                              style={{ backgroundColor: color.color }}
                              className="size-6 cursor-pointer rounded-full border-b border-white"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(2px)" }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      onClick={() => setIsActive(index)}
                      className="flex h-[56px] cursor-pointer items-center justify-center gap-[14px] rounded-full pl-[14px] pr-8"
                    >
                      {!index ? (
                        <div
                          style={{
                            backgroundColor: activeColor
                              ? colors[activeColor].color
                              : "white",
                          }}
                          className="size-6 rounded-full border-b border-white"
                        />
                      ) : (
                        <PlusAdd />
                      )}
                      <span className="whitespace-nowrap text-lg font-semibold capitalize">
                        {feature.name}
                      </span>
                    </motion.button>
                  )}
                </motion.li>
              ))}
            </ul>
            {/* mobile */}
            {isMobile && (
              <div className="relative z-10 flex w-full lg:hidden">
                <CarouselWithActiveSync
                  isActive={isActive}
                  setIsActive={setIsActive}
                  FEATURES={FEATURES}
                  colors={colors}
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                />
              </div>
            )}
          </div>
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="popLayout">
              {isActive === null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1.2,
                    transition: {
                      delay: 0.25,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  key={isActive}
                  className="h-full w-full"
                >
                  <img
                    src="/images/oct25Coll/iphone17pro/1.jpg"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isActive !== null ? "15%" : 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1.2,
                    transition: {
                      delay: 0.2,
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  exit={{
                    opacity: 0,
                    x: isActive !== null ? "-15%" : 0,
                    scale: 0.9,
                  }}
                  key={isActive}
                  className="h-full w-full"
                >
                  {!isActive && activeColor !== null ? (
                    <img
                      src={colors[activeColor].src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      src={FEATURES[isActive].src}
                      alt=""
                      className="lg:translate-0 h-full w-full -translate-x-[9%] object-contain"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isActive !== null && (
              <motion.button
                initial={{ y: "100%", opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 0, scale: 0 }}
                onClick={() => setIsActive(null)}
                className="z-3 bg-foreground/10 absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full active:scale-95"
              >
                <Plus className="stroke-3 size-6 rotate-45" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

export { Skiper76 };

const PlusAdd = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11.3"
        fill="none"
        stroke="var(--foreground)"
      ></circle>
      <g transform="translate(7 7)" fill="var(--foreground)" stroke="none">
        <path d="m9 4h-3v-3c0-0.553-0.447-1-1-1s-1 0.447-1 1v3h-3c-0.553 0-1 0.447-1 1s0.447 1 1 1h3v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3h3c0.553 0 1-0.447 1-1s-0.447-1-1-1"></path>
      </g>
    </svg>
  );
};

interface UseIsMobileReturn {
  isMobile: boolean;
  isLoading: boolean;
}

export const useIsMobile = (): UseIsMobileReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check using media query
      const mediaQuery = window.matchMedia("(max-width: 768px)");

      // Check using user agent (additional detection)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "mobile",
      ];

      const isMobileUA = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword),
      );

      // Combine both checks - prioritize media query but consider user agent
      const isMobileDevice =
        mediaQuery.matches || (isMobileUA && window.innerWidth <= 768);

      setIsMobile(isMobileDevice);
      setIsLoading(false);
    };

    // Initial check
    checkIsMobile();

    // Listen for media query changes
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => checkIsMobile();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Listen for window resize
    window.addEventListener("resize", checkIsMobile);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return {
    isMobile,
    isLoading,
  };
};

export default useIsMobile;
