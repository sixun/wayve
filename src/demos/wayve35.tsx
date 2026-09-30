// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Project {
  id: number;
  label: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    label: "Velvet ® Dreams Studio",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/imgp3.webp",
  },
  {
    id: 2,
    label: "Neon Pulse ® Agency",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/illstration15.webp",
  },
  {
    id: 3,
    label: "Midnight Canvas",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/img32.webp",
  },
  {
    id: 4,
    label: "Echo Digital Lab",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/img27.webp",
  },
  {
    id: 5,
    label: "Wayve Creative ® Co ",
    year: "2023",
    image: "/wayve/media/site/wayvev1/common/img5.webp",
  },
  {
    id: 6,
    label: "Cosmic Brew Studios",
    year: "2023—2024",
    image: "/wayve/media/cdn/images/lummi/illstration12.webp",
  },
  {
    id: 7,
    label: "Horizon Typography",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/illstration13.webp",
  },
  {
    id: 8,
    label: "Waves & ® Motion",
    year: "2022—2024",
    image: "/wayve/media/site/wayvev1/common/img8.webp",
  },
  {
    id: 9,
    label: "Stellar Workshop",
    year: "2023",
    image: "/wayve/media/cdn/images/lummi/illstration9.webp",
  },
  {
    id: 10,
    label: "Prism ® Media House",
    year: "2023",
    image: "/wayve/media/cdn/images/lummi/img17.webp",
  },
  {
    id: 11,
    label: "Aurora Design Co ™ ",
    year: "2023",
    image: "/wayve/media/cdn/images/lummi/illstration5.webp",
  },
  {
    id: 12,
    label: "Flux Interactive",
    year: "2023",
    image: "/wayve/media/cdn/images/lummi/img12.webp",
  },
  {
    id: 13,
    label: "Ember Creative Lab ™",
    year: "2022",
    image: "/wayve/media/cdn/images/lummi/illstration3.webp",
  },
  {
    id: 14,
    label: "Zenith Brand Studio",
    year: "2024",
    image: "/wayve/media/cdn/images/lummi/img15.webp",
  },
  {
    id: 15,
    label: "Quantum Visual Arts",
    year: "2022—2023",
    image: "/wayve/media/cdn/images/lummi/img21.webp",
  },
  {
    id: 16,
    label: "Quantum Visual Arts",
    year: "2022—2023",
    image: "/wayve/media/cdn/images/lummi/img8.webp",
  },
  {
    id: 17,
    label: "Quantum Visual Arts",
    year: "2022—2023",
    image: "/wayve/media/cdn/images/lummi/img1.webp",
  },
];

const Wayve35 = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(15);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section className="h-full w-full bg-[#121212] text-[#F1F1F1]">
      <div className="overflow-hidden md:h-full">
        <motion.div className="mx-auto flex w-full flex-col md:h-full md:flex-row lg:min-w-[1600px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="lg:border-r-1 relative h-full w-full cursor-pointer border-0 border-white/30"
              onClick={isMobile ? () => setSelectedIndex(index) : undefined}
              onMouseEnter={
                !isMobile ? () => setSelectedIndex(index) : undefined
              }
              initial={
                isMobile
                  ? { height: "4rem", width: "100%" }
                  : { width: "4rem", height: "100%" }
              }
              animate={
                isMobile
                  ? {
                      height: selectedIndex === index ? "500px" : "4rem",
                      width: "100%",
                    }
                  : { width: selectedIndex === index ? "28rem" : "4rem" }
              }
              transition={{ stiffness: 200, damping: 25, type: "spring" }}
            >
              <motion.div
                className="absolute bottom-0 left-[2vw] flex w-[calc(100vh-2.6vw)] origin-[0_50%] transform justify-between pr-5 text-xl font-medium leading-[2.6vw] tracking-[-0.03em] md:-rotate-90 md:text-[2vw]"
                animate={{
                  color:
                    selectedIndex === index
                      ? "#F1F1F1"
                      : "rgba(241, 241, 241, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="label w-full border-b py-2 md:w-auto md:border-0 md:py-0">
                  {project.label}
                </p>
                <AnimatePresence>
                  {selectedIndex === index && (
                    <motion.p
                      className="year"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.year}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: selectedIndex === index ? 1 : 0,
                }}
                className="h-[92%] rounded-[0.6vw] object-cover pl-2 pr-[1.3vw] pt-[1.3vw] md:h-[100%] md:pb-[1.3vw] md:pl-[4vw]"
              >
                <motion.img
                  src={project.image}
                  alt={project.label}
                  className="w-full rounded-xl"
                  style={{ height: "100%", objectFit: "cover" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Wayve35 };


