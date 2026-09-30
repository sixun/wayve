"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Plus } from "lucide-react";
import React, { useState } from "react";
import useSound from "use-sound";

import { cn } from "@/lib/utils";

interface Message {
  sentByMe: boolean;
  message: string;
}

const Skiper82 = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [play] = useSound("/audio/send2.wav", {
    volume: 0.2,
  });

  const [arrow, setArrow] = useState(true);

  // Animation controls

  const delay = new Promise((resolve) => setTimeout(resolve, 1000));

  const handleMessageSubmit = async () => {
    play();
    setArrow(false);
    setIsSubmit((x) => !x);
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        { sentByMe: true, message: inputValue.trim() },
      ]);
      setInputValue("");
    }

    await delay;

    setMessages((prev) => [
      ...prev,
      { sentByMe: false, message: "Lock in vro 😵" },
    ]);

    setArrow(true);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F5F6F6] p-8 font-medium text-black">
      {/* Main input container */}
      <div className="mt-50 w-full max-w-lg">
        <div className="relative rounded-3xl bg-white p-1 shadow-[0_10px_20px_-6px_rgba(0,0,0,0.1)]">
          <div className="z-2 relative flex items-center justify-between rounded-3xl border-gray-100 bg-white p-1.5">
            {/* Main input field */}
            <div className="flex flex-1 items-center gap-3 pr-3">
              <button className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-[#f5f4f3] transition-colors">
                <Plus className="size-5 text-gray-400" />
              </button>
              <input
                type="text"
                value={inputValue}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleMessageSubmit();
                  }
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Send Message"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <button
              onClick={handleMessageSubmit}
              className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-[#f5f4f3] transition-colors"
            >
              <AnimatePresence>
                {arrow && (
                  <motion.span
                    initial={{ rotate: -90, x: "150%" }}
                    animate={{
                      rotate: inputValue ? 0 : -90,
                      x: 0,
                    }}
                    exit={{
                      y: "-150%",
                    }}
                  >
                    <ArrowUp className="stroke-2.5 text-[#f5f4f3]-foreground size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <motion.div
            layout="position"
            className={cn([
              "absolute bottom-[70px] right-0",
              "flex flex-col items-end gap-2",
              "z-1 pointer-events-none w-full",
            ])}
          >
            {messages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, type: "spring", bounce: 0.4 }}
                className={cn([
                  "max-w-[260px]",
                  "break-words px-[14px] py-[10px]",
                  "overflow-hidden text-ellipsis text-sm",
                  item.sentByMe
                    ? "self-end rounded-[14px_14px_6px] bg-white text-black shadow-[0_10px_20px_-6px_rgba(0,0,0,0.1)]"
                    : "self-start rounded-[14px_14px_14px_6px] bg-sky-500 text-white shadow-[0_10px_20px_-6px_rgba(0,0,0,0.2)]",
                ])}
              >
                <p className="will-change-transform">{item.message}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        key={`isSubmit${isSubmit}`}
        initial={{
          y: "100%",
          opacity: 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        animate={{
          y: "30%",
          opacity: 0,
        }}
        className="z-1 absolute left-1/2 flex h-[100vh] w-full max-w-3xl -translate-x-1/2"
      >
        <Grad className="w-full" />
        <Grad className="w-full -translate-y-20" />
        <Grad className="w-full" />
      </motion.div>
    </div>
  );
};

export { Skiper82 };

const Grad = ({ className }: { className?: string }) => (
  <div
    className={cn("flex h-full flex-col items-stretch -space-y-3", className)}
  >
    <div className="w-full flex-1 bg-[#FC2BA3] blur-xl" />
    <div className="w-full flex-1 bg-[#FC6D35] blur-xl" />
    <div className="w-full flex-1 bg-[#F9C83D] blur-xl" />
    <div className="w-full flex-1 bg-[#C2D6E1] blur-xl" />
    <div className="w-full flex-1 bg-[#144EC5] blur-xl" />
  </div>
);
