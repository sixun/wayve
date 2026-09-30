// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Captions,
  Maximize,
  Pause,
  PictureInPicture2,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Slider } from "@/components/ui/slider";

const Wayve97 = () => {
  // Video Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Motion values
  const currentTime = useMotionValue(0);
  const duration = useMotionValue(0);
  const volume = useMotionValue(1);
  const cursorX = useMotionValue(0);
  const hoverTime = useMotionValue(0);
  const cursorOpacity = useSpring(0);
  const progressPct = useMotionValue(0);
  const bufferPct = useMotionValue(0);

  // Refs
  const isScrubbingRef = useRef(false);
  const wasPlayingBeforeScrubRef = useRef(false);
  const previousVolumeRef = useRef(1);

  // States
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Compute controls visibility: always visible when paused, visible on hover when playing
  const isControlsVisible = !isPlaying || isHovered;

  // Formatted strings
  const currentTimeStr = useTransform(currentTime, (t) => formatTime(t));
  const durationStr = useTransform(duration, (d) => formatTime(d));
  const remainingTimeStr = useTransform(
    [currentTime, duration],
    ([curr, dur]: number[]) => formatTime(Math.max(0, dur - curr)),
  );
  const hoverTimeStr = useTransform(hoverTime, (t) => formatTime(t));

  // Sync video events
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateBuffer = () => {
      const buffered = videoElement.buffered;
      const dur = videoElement.duration;
      if (buffered.length > 0 && dur > 0 && Number.isFinite(dur)) {
        // Find the furthest buffered point
        let maxBufferedEnd = 0;
        for (let i = 0; i < buffered.length; i++) {
          const end = buffered.end(i);
          if (end > maxBufferedEnd) {
            maxBufferedEnd = end;
          }
        }
        const bufferedPercentage = (maxBufferedEnd / dur) * 100;
        bufferPct.set(Math.min(Math.max(bufferedPercentage, 0), 100));
      } else {
        bufferPct.set(0);
      }
    };

    const handleLoadedMetadata = () => {
      duration.set(videoElement.duration || 0);
      currentTime.set(videoElement.currentTime || 0);
      volume.set(videoElement.volume);
      updateBuffer();
    };

    const handleTimeUpdate = () => {
      if (!isScrubbingRef.current) {
        currentTime.set(videoElement.currentTime);
      }
      updateBuffer();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      currentTime.set(videoElement.duration || 0);
    };

    const handleProgress = () => {
      updateBuffer();
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("progress", handleProgress);
    videoElement.addEventListener("loadeddata", updateBuffer);
    videoElement.addEventListener("canplay", updateBuffer);
    videoElement.addEventListener("canplaythrough", updateBuffer);

    if (videoElement.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("progress", handleProgress);
      videoElement.removeEventListener("loadeddata", updateBuffer);
      videoElement.removeEventListener("canplay", updateBuffer);
      videoElement.removeEventListener("canplaythrough", updateBuffer);
    };
  }, [currentTime, duration, volume, bufferPct]);

  // Sync volume
  useMotionValueEvent(volume, "change", (latest) => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = latest;
    }
  });

  // Update progress percentage
  useMotionValueEvent(currentTime, "change", (curr) => {
    const dur = duration.get();
    if (!dur) {
      progressPct.set(0);
      return;
    }
    progressPct.set(Math.min(Math.max((curr / dur) * 100, 0), 100));
  });

  useMotionValueEvent(duration, "change", () => {
    const curr = currentTime.get();
    const dur = duration.get();
    if (!dur) {
      progressPct.set(0);
      return;
    }
    progressPct.set(Math.min(Math.max((curr / dur) * 100, 0), 100));
  });

  const playVideo = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.currentTime >= videoElement.duration) {
      videoElement.currentTime = 0;
    }

    try {
      await videoElement.play();
    } catch (error) {
      // Ignore the "interrupted by pause" error - it's expected behavior
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        !error.message.includes("interrupted")
      ) {
        console.error("Failed to play video", error);
      }
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.pause();
  }, []);

  const handleTogglePlayback = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      void playVideo();
    } else {
      pauseVideo();
    }
  }, [playVideo, pauseVideo]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      cursorX.set(x);

      if (progressBarRef.current) {
        const { width } = progressBarRef.current.getBoundingClientRect();
        const max = duration.get();
        if (max) {
          const hoverPercentage = Math.min(Math.max((x / width) * 100, 0), 100);
          const calculatedHoverTime = (hoverPercentage / 100) * max;
          hoverTime.set(calculatedHoverTime);
        }
      }
    },
    [cursorX, duration, hoverTime],
  );

  const handleProgressPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const videoElement = videoRef.current;
      if (!videoElement || !progressBarRef.current) return;

      isScrubbingRef.current = true;
      wasPlayingBeforeScrubRef.current = !videoElement.paused;
      videoElement.pause();

      const { left, width } = progressBarRef.current.getBoundingClientRect();
      const max = duration.get();
      if (max) {
        const clampedX = Math.min(Math.max(e.clientX, left), left + width);
        const ratio = (clampedX - left) / width;
        const nextValue = ratio * max;
        videoElement.currentTime = nextValue;
        currentTime.set(nextValue);
      }

      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [currentTime, duration],
  );

  const handleProgressPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isScrubbingRef.current || !progressBarRef.current) return;

      const { left, width } = progressBarRef.current.getBoundingClientRect();
      const max = duration.get();
      if (max) {
        const clampedX = Math.min(Math.max(e.clientX, left), left + width);
        const ratio = (clampedX - left) / width;
        const nextValue = ratio * max;
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.currentTime = nextValue;
          currentTime.set(nextValue);
        }
      }
    },
    [currentTime, duration],
  );

  const handleProgressPointerUp = useCallback(() => {
    isScrubbingRef.current = false;
    if (wasPlayingBeforeScrubRef.current) {
      void playVideo();
    }
  }, [playVideo]);

  const handleVolumeChange = useCallback(
    (value: number[]) => {
      const newVolume = value[0] / 100;
      volume.set(newVolume);
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.volume = newVolume;
        if (newVolume > 0 && isMuted) {
          setIsMuted(false);
          videoElement.muted = false;
        }
      }
    },
    [volume, isMuted],
  );

  const handleToggleMute = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isMuted) {
      const prevVol = previousVolumeRef.current;
      volume.set(prevVol);
      videoElement.volume = prevVol;
      videoElement.muted = false;
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume.get();
      volume.set(0);
      videoElement.volume = 0;
      videoElement.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const handleToggleCaptions = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const textTracks = videoElement.textTracks;
    if (textTracks && textTracks.length > 0) {
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = isCaptionsEnabled ? "hidden" : "showing";
      }
      setIsCaptionsEnabled(!isCaptionsEnabled);
    } else {
      // If no text tracks, toggle a visual indicator
      setIsCaptionsEnabled(!isCaptionsEnabled);
    }
  }, [isCaptionsEnabled]);

  const handleTogglePictureInPicture = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPictureInPicture(false);
      } else if (document.pictureInPictureEnabled) {
        await videoElement.requestPictureInPicture();
        setIsPictureInPicture(true);
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        void document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        void container.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Listen for picture-in-picture changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnterPictureInPicture = () => {
      setIsPictureInPicture(true);
    };

    const handleLeavePictureInPicture = () => {
      setIsPictureInPicture(false);
    };

    videoElement.addEventListener(
      "enterpictureinpicture",
      handleEnterPictureInPicture,
    );
    videoElement.addEventListener(
      "leavepictureinpicture",
      handleLeavePictureInPicture,
    );

    return () => {
      videoElement.removeEventListener(
        "enterpictureinpicture",
        handleEnterPictureInPicture,
      );
      videoElement.removeEventListener(
        "leavepictureinpicture",
        handleLeavePictureInPicture,
      );
    };
  }, []);

  // Listen for spacebar key press to play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle spacebar
      if (e.code !== "Space" && e.key !== " ") return;

      // Don't prevent default if user is typing in an input field
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Prevent default scrolling behavior
      e.preventDefault();
      handleTogglePlayback();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleTogglePlayback]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div className="flex size-full items-center justify-center p-10">
      {/* video player */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black lg:rounded-2xl"
      >
        <video
          ref={videoRef}
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          onClick={handleTogglePlayback}
          loop
          muted={false}
          controls={false}
          className="h-full w-full cursor-pointer object-cover"
          playsInline
          preload="metadata"
        />
        <AnimatePresence>
          {isControlsVisible && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-linear-to-t absolute bottom-0 left-1/2 flex h-10 w-full -translate-x-1/2 items-center justify-center gap-2 from-black/50 to-transparent px-2 md:h-20 md:px-10"
            >
              {/* left buttons */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleTogglePlayback}
                className="flex size-7 items-center justify-center rounded-md hover:bg-white/10 hover:backdrop-blur-lg"
              >
                {isPlaying ? (
                  <Pause className="size-3.5 fill-white stroke-none" />
                ) : (
                  <Play className="size-3.5 fill-white stroke-none" />
                )}
              </motion.button>
              <div
                className="relative"
                onMouseEnter={() => setIsVolumeOpen(true)}
                onMouseLeave={() => setIsVolumeOpen(false)}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleMute}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md transition-colors duration-100 ease-in-out",
                    isVolumeOpen &&
                      "bg-white/10 hover:bg-white/10 hover:backdrop-blur-lg",
                  )}
                >
                  <VolumeIcon className="size-4" isMuted={isMuted} />
                </motion.button>
                {isVolumeOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                    className="h-30 absolute bottom-[140%] left-0 w-full rounded-lg bg-white/10 py-2 backdrop-blur-lg after:absolute after:bottom-0 after:left-0 after:h-5 after:w-full after:translate-y-full after:content-['']"
                  >
                    <VolumeSlider
                      volume={volume}
                      onValueChange={handleVolumeChange}
                    />
                  </motion.div>
                )}
              </div>

              {/* Range */}
              <div className="flex h-full flex-1 items-center justify-center gap-2 text-xs tabular-nums text-white">
                <motion.span>{currentTimeStr}</motion.span>
                <div
                  ref={progressBarRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => cursorOpacity.set(1)}
                  onMouseLeave={() => cursorOpacity.set(0)}
                  onPointerDown={handleProgressPointerDown}
                  onPointerMove={handleProgressPointerMove}
                  onPointerUp={handleProgressPointerUp}
                  className="relative flex h-full flex-1 cursor-crosshair touch-none items-center justify-center"
                >
                  <div className="relative h-1 flex-1 rounded-2xl bg-white/10">
                    {/* the video buffer */}
                    <BufferBar bufferPct={bufferPct} />
                    {/* the Play bar */}
                    <ProgressBar progressPct={progressPct} />
                    {/* Hover cursor */}
                  </div>
                  <HoverCursor
                    cursorX={cursorX}
                    cursorOpacity={cursorOpacity}
                    hoverTimeStr={hoverTimeStr}
                    durationStr={durationStr}
                  />
                </div>
                <span>
                  <span>−</span>
                  <motion.span>{remainingTimeStr}</motion.span>
                </span>
              </div>

              {/* Right buttons */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleCaptions}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md text-white hover:bg-white/10 hover:backdrop-blur-lg",
                  isCaptionsEnabled && "bg-white/10",
                )}
              >
                <Captions className="size-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleTogglePictureInPicture}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md text-white hover:bg-white/10 hover:backdrop-blur-lg",
                  isPictureInPicture && "bg-white/10",
                )}
              >
                <PictureInPicture2 className="size-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFullscreen}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md text-white hover:bg-white/10 hover:backdrop-blur-lg",
                  isFullscreen && "bg-white/10",
                )}
              >
                <Maximize className="size-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-muted-foreground absolute top-4 text-xs">
        Inspired by{" "}
        <a
          href="https://linear.app/careers"
          target="_blank"
          className="hover:text-foreground underline"
        >
          Linear
        </a>
      </p>
    </div>
  );
};

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "00:00";
  }
  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Components
const VolumeSlider = ({
  volume,
  onValueChange,
}: {
  volume: import("framer-motion").MotionValue<number>;
  onValueChange: (value: number[]) => void;
}) => {
  const [value, setValue] = useState(100);
  useMotionValueEvent(volume, "change", (latest) => {
    setValue(Math.round(latest * 100));
  });
  return (
    <Slider
      value={[value]}
      onValueChange={onValueChange}
      orientation="vertical"
      max={100}
      className="min-h-0! **:data-[slot='slider-range']:bg-white **:data-[slot='slider-thumb']:size-2.5 **:data-[slot='slider-thumb']:border-0 **:data-[slot='slider-thumb']:ring-0 **:data-[slot='slider-track']:w-1! **:data-[slot='slider-track']:bg-white/10 cursor-crosshair"
      step={1}
    />
  );
};

const BufferBar = ({ bufferPct }: { bufferPct: MotionValue }) => {
  const width = useTransform(bufferPct, (pct) => `${pct}%`);
  return (
    <motion.div
      style={{ width }}
      className="absolute left-0 h-full rounded-2xl bg-white/30"
    />
  );
};

const ProgressBar = ({ progressPct }: { progressPct: MotionValue }) => {
  const width = useTransform(progressPct, (pct) => `${pct}%`);
  return (
    <motion.div
      style={{ width }}
      className="absolute left-0 h-full rounded-2xl bg-white"
    />
  );
};

const HoverCursor = ({
  cursorX,
  cursorOpacity,
  hoverTimeStr,
  durationStr,
}: {
  cursorX: MotionValue;
  cursorOpacity: MotionValue;
  hoverTimeStr: MotionValue;
  durationStr: MotionValue;
}) => {
  return (
    <motion.div
      style={{ x: cursorX, opacity: cursorOpacity }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none absolute left-0 flex h-8 w-px items-center justify-center bg-white/70 tabular-nums"
    >
      <span className="absolute -top-1 -translate-y-full whitespace-nowrap text-xs tabular-nums text-white">
        <motion.span>{hoverTimeStr}</motion.span> /{" "}
        <motion.span className="opacity-40">{durationStr}</motion.span>
      </span>
    </motion.div>
  );
};

const VolumeIcon = ({
  isMuted,
  className,
}: {
  isMuted: boolean;
  className?: string;
}) => {
  return (
    <div>
      <div
        className={cn(
          "flex size-full cursor-pointer items-center justify-center",
          className,
        )}
      >
        <motion.div
          initial={false}
          className="relative flex size-5 items-center justify-center"
          animate={{
            rotate: isMuted ? [0, -15, 5, -2, 0] : "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={cn("", className)}
          >
            <path
              fill="white"
              stroke="none"
              d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
            />

            <motion.g animate={{ opacity: isMuted ? 0.2 : 1 }}>
              <path
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                d="M16 9a5 5 0 0 1 0 6"
              />
              <path
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                d="M19.364 18.364a9 9 0 0 0 0-12.728"
              />
            </motion.g>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rotate-[-40deg] overflow-hidden">
              <motion.div
                animate={{ scaleY: isMuted ? 1 : 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: isMuted ? 0.125 : 0.05,
                  delay: isMuted ? 0.15 : 0,
                }}
                style={{
                  transformOrigin: "top",
                }}
                className="h-[14px] w-fit rounded-full"
              >
                <div className="flex h-full w-[4px] items-center justify-center rounded-full">
                  <div className="h-full w-[1px] rounded-full bg-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { Wayve97 };
