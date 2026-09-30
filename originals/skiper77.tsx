"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  setActiveColor,
}: {
  isActive: number;
  setIsActive: (index: number) => void;
  FEATURES: {
    id: number;
    name: string;
    desc: string;
    desc2: string;
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
                    <b className="capitalize">{feature.name}.</b>
                    <span>{feature.desc}</span>
                    <span className="hidden md:inline-block">
                      {feature.desc2}
                    </span>
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
                      ? "justify-start pl-3"
                      : "justify-end pr-3",
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
  );
};

const Skiper77 = () => {
  const FEATURES = [
    {
      id: 1,
      name: "colors",
      desc: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange",
      desc2:
        "Available in Cosmic Orange, Natural Titanium, and Space Black. Each finish crafted with precision.",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 2,
      name: "aluminum unibody",
      desc: "Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
      desc2:
        "Precision-machined from aerospace-grade aluminum. Engineered for durability while maintaining elegant aesthetics.",
      src: "/images/oct25Coll/iphone17pro/2.jpg",
    },
    {
      id: 3,
      name: "vapor chamber",
      desc: "Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
      desc2:
        "Advanced thermal management system ensures consistent performance during intensive tasks and gaming sessions.",
      src: "/images/oct25Coll/iphone17pro/3.jpg",
    },
    {
      id: 4,
      name: "ceramic shield",
      desc: "Protects the back of iPhone 17 Pro, making it 4x more resistant to cracks.4 New Ceramic Shield 2 on the front has 3x better scratch resistance.5",
      desc2:
        "Industry-leading protection technology. Ceramic Shield 2 provides superior durability against drops and scratches.",
      src: "/images/oct25Coll/iphone17pro/4.jpg",
    },
    {
      id: 5,
      name: "immersive pro display",
      desc: "Our best‑ever 6.3‑inch and 6.9‑inch Super Retina XDR displays.6 Brighter. Better anti‑reflection. ProMotion up to 120Hz.",
      desc2:
        "Stunning visual experience with True Tone technology. Dynamic Island seamlessly integrates with your content.",
      src: "/images/oct25Coll/iphone17pro/5.jpg",
    },
    {
      id: 6,
      name: "camera control",
      desc: "Instantly take a photo, record video, adjust settings, and more. So you never miss a moment.",
      desc2:
        "Professional-grade camera system with advanced computational photography. Capture memories in stunning detail.",
      src: "/images/oct25Coll/iphone17pro/6.jpg",
    },
    {
      id: 7,
      name: "Action button",
      desc: "A customizable fast track to your favorite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts, and more.",
      desc2:
        "Enhanced productivity with programmable actions. Quick access to your most-used features and shortcuts.",
      src: "/images/oct25Coll/iphone17pro/7.jpg",
    },
  ];

  const [isActive, setIsActive] = useState(0);

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

  const [activeColor, setActiveColor] = useState<number | null>(1);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
    >
      <div className="from-muted to-background text-foreground dark flex h-screen w-screen items-center justify-center bg-gradient-to-t p-4">
        <div className="rounded-4xl relative flex h-[745px] w-full max-w-[90rem] flex-col justify-end overflow-hidden bg-black pb-5">
          {/* mobile */}
          <div className="relative z-10 flex w-full">
            <CarouselWithActiveSync
              isActive={isActive}
              setIsActive={setIsActive}
              FEATURES={FEATURES}
              colors={colors}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="popLayout">
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export { Skiper77 };
