// @ts-nocheck — purchased upstream demo, preserved except runtime adapters.
"use client";

import { motion } from "framer-motion";
import { ChevronsRightIcon, Shield } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type Team = {
  name: string;
  code: string; // ISO 3166-1 alpha-2 code used by flagcdn
};

type MatchSide = {
  team: Team | null; // null = TBD
  score: number | null;
  penalties?: number; // shootout score, renders as "1 (3)" with an FT (P) badge
};

type Match = {
  id: string;
  date: string;
  time?: string;
  status: "finished" | "upcoming";
  home: MatchSide;
  away: MatchSide;
  winner?: "home" | "away";
};

type Round = {
  name: string;
  matches: Match[];
};

const TEAMS = {
  southAfrica: { name: "South Africa", code: "za" },
  netherlands: { name: "Netherlands", code: "nl" },
  germany: { name: "Germany", code: "de" },
  sweden: { name: "Sweden", code: "se" },
  senegal: { name: "Senegal", code: "sn" },
  bosnia: { name: "Bosnia and Herzegovina", code: "ba" },
  austria: { name: "Austria", code: "at" },
  croatia: { name: "Croatia", code: "hr" },
  ivoryCoast: { name: "Côte d'Ivoire", code: "ci" },
  ecuador: { name: "Ecuador", code: "ec" },
  drCongo: { name: "DR Congo", code: "cd" },
  algeria: { name: "Algeria", code: "dz" },
  ghana: { name: "Ghana", code: "gh" },
  australia: { name: "Australia", code: "au" },
  egypt: { name: "Egypt", code: "eg" },
  caboVerde: { name: "Cabo Verde", code: "cv" },
  canada: { name: "Canada", code: "ca" },
  morocco: { name: "Morocco", code: "ma" },
  paraguay: { name: "Paraguay", code: "py" },
  france: { name: "France", code: "fr" },
  usa: { name: "USA", code: "us" },
  belgium: { name: "Belgium", code: "be" },
  portugal: { name: "Portugal", code: "pt" },
  spain: { name: "Spain", code: "es" },
  brazil: { name: "Brazil", code: "br" },
  norway: { name: "Norway", code: "no" },
  mexico: { name: "Mexico", code: "mx" },
  england: { name: "England", code: "gb-eng" },
  switzerland: { name: "Switzerland", code: "ch" },
  colombia: { name: "Colombia", code: "co" },
  argentina: { name: "Argentina", code: "ar" },
  japan: { name: "Japan", code: "jp" },
} satisfies Record<string, Team>;

const ROUNDS: Round[] = [
  {
    name: "Round of 32",
    matches: [
      {
        id: "r32-1",
        date: "Mon, 29 Jun",
        status: "finished",
        home: { team: TEAMS.southAfrica, score: 0 },
        away: { team: TEAMS.canada, score: 1 },
        winner: "away",
      },
      {
        id: "r32-2",
        date: "Tue, 30 Jun",
        status: "finished",
        home: { team: TEAMS.netherlands, score: 1, penalties: 2 },
        away: { team: TEAMS.morocco, score: 1, penalties: 3 },
        winner: "away",
      },
      {
        id: "r32-3",
        date: "Tue, 30 Jun",
        status: "finished",
        home: { team: TEAMS.germany, score: 1, penalties: 3 },
        away: { team: TEAMS.paraguay, score: 1, penalties: 4 },
        winner: "away",
      },
      {
        id: "r32-4",
        date: "Wed, 1 Jul",
        status: "finished",
        home: { team: TEAMS.france, score: 3 },
        away: { team: TEAMS.sweden, score: 0 },
        winner: "home",
      },
      {
        id: "r32-5",
        date: "Thu, 2 Jul",
        status: "finished",
        home: { team: TEAMS.belgium, score: 3 },
        away: { team: TEAMS.senegal, score: 2 },
        winner: "home",
      },
      {
        id: "r32-6",
        date: "Thu, 2 Jul",
        status: "finished",
        home: { team: TEAMS.usa, score: 2 },
        away: { team: TEAMS.bosnia, score: 0 },
        winner: "home",
      },
      {
        id: "r32-7",
        date: "Fri, 3 Jul",
        status: "finished",
        home: { team: TEAMS.spain, score: 3 },
        away: { team: TEAMS.austria, score: 0 },
        winner: "home",
      },
      {
        id: "r32-8",
        date: "Fri, 3 Jul",
        status: "finished",
        home: { team: TEAMS.portugal, score: 2 },
        away: { team: TEAMS.croatia, score: 1 },
        winner: "home",
      },
      {
        id: "r32-9",
        date: "Mon, 29 Jun",
        status: "finished",
        home: { team: TEAMS.brazil, score: 2 },
        away: { team: TEAMS.japan, score: 1 },
        winner: "home",
      },
      {
        id: "r32-10",
        date: "Tue, 30 Jun",
        status: "finished",
        home: { team: TEAMS.ivoryCoast, score: 1 },
        away: { team: TEAMS.norway, score: 2 },
        winner: "away",
      },
      {
        id: "r32-11",
        date: "Wed, 1 Jul",
        status: "finished",
        home: { team: TEAMS.mexico, score: 2 },
        away: { team: TEAMS.ecuador, score: 0 },
        winner: "home",
      },
      {
        id: "r32-12",
        date: "Wed, 1 Jul",
        status: "finished",
        home: { team: TEAMS.england, score: 2 },
        away: { team: TEAMS.drCongo, score: 1 },
        winner: "home",
      },
      {
        id: "r32-13",
        date: "Fri, 3 Jul",
        status: "finished",
        home: { team: TEAMS.switzerland, score: 2 },
        away: { team: TEAMS.algeria, score: 0 },
        winner: "home",
      },
      {
        id: "r32-14",
        date: "Sat, 4 Jul",
        status: "finished",
        home: { team: TEAMS.colombia, score: 1 },
        away: { team: TEAMS.ghana, score: 0 },
        winner: "home",
      },
      {
        id: "r32-15",
        date: "Fri, 3 Jul",
        status: "finished",
        home: { team: TEAMS.australia, score: 1, penalties: 2 },
        away: { team: TEAMS.egypt, score: 1, penalties: 4 },
        winner: "away",
      },
      {
        id: "r32-16",
        date: "Sat, 4 Jul",
        status: "finished",
        home: { team: TEAMS.argentina, score: 3 },
        away: { team: TEAMS.caboVerde, score: 2 },
        winner: "home",
      },
    ],
  },
  {
    name: "Round of 16",
    matches: [
      {
        id: "r16-1",
        date: "Sat, 4 Jul",
        status: "finished",
        home: { team: TEAMS.canada, score: 0 },
        away: { team: TEAMS.morocco, score: 3 },
        winner: "away",
      },
      {
        id: "r16-2",
        date: "Sun, 5 Jul",
        status: "finished",
        home: { team: TEAMS.paraguay, score: 0 },
        away: { team: TEAMS.france, score: 1 },
        winner: "away",
      },
      {
        id: "r16-3",
        date: "Mon, 6 Jul",
        status: "finished",
        home: { team: TEAMS.usa, score: 1 },
        away: { team: TEAMS.belgium, score: 4 },
        winner: "away",
      },
      {
        id: "r16-4",
        date: "Mon, 6 Jul",
        status: "finished",
        home: { team: TEAMS.portugal, score: 0 },
        away: { team: TEAMS.spain, score: 1 },
        winner: "away",
      },
      {
        id: "r16-5",
        date: "Mon, 6 Jul",
        status: "finished",
        home: { team: TEAMS.brazil, score: 1 },
        away: { team: TEAMS.norway, score: 2 },
        winner: "away",
      },
      {
        id: "r16-6",
        date: "Mon, 6 Jul",
        status: "finished",
        home: { team: TEAMS.mexico, score: 2 },
        away: { team: TEAMS.england, score: 3 },
        winner: "away",
      },
      {
        id: "r16-7",
        date: "Tue, 7 Jul",
        status: "finished",
        home: { team: TEAMS.switzerland, score: 0, penalties: 4 },
        away: { team: TEAMS.colombia, score: 0, penalties: 3 },
        winner: "home",
      },
      {
        id: "r16-8",
        date: "Tue, 7 Jul",
        status: "finished",
        home: { team: TEAMS.argentina, score: 3 },
        away: { team: TEAMS.egypt, score: 2 },
        winner: "home",
      },
    ],
  },
  {
    name: "Quarter-finals",
    matches: [
      {
        id: "qf-1",
        date: "Fri, 10 Jul",
        time: "4:00 am",
        status: "finished",
        home: { team: TEAMS.france, score: 2 },
        away: { team: TEAMS.morocco, score: 0 },
        winner: "home",
      },
      {
        id: "qf-2",
        date: "Sat, 11 Jul",
        time: "3:00 am",
        status: "finished",
        home: { team: TEAMS.spain, score: 2 },
        away: { team: TEAMS.belgium, score: 1 },
        winner: "home",
      },
      {
        id: "qf-3",
        date: "Sun, 12 Jul",
        time: "5:00 am",
        status: "upcoming",
        home: { team: TEAMS.norway, score: null },
        away: { team: TEAMS.england, score: null },
      },
      {
        id: "qf-4",
        date: "Sun, 12 Jul",
        time: "10:00 am",
        status: "upcoming",
        home: { team: TEAMS.argentina, score: null },
        away: { team: TEAMS.switzerland, score: null },
      },
    ],
  },
  {
    name: "Semi-finals",
    matches: [
      {
        id: "sf-1",
        date: "Wed, 15 Jul",
        time: "4:00 am",
        status: "upcoming",
        home: { team: TEAMS.france, score: null },
        away: { team: TEAMS.spain, score: null },
      },
      {
        id: "sf-2",
        date: "Thu, 16 Jul",
        time: "3:00 am",
        status: "upcoming",
        home: { team: null, score: null },
        away: { team: null, score: null },
      },
    ],
  },
  {
    name: "Final",
    matches: [
      {
        id: "f-1",
        date: "Mon, 20 Jul",
        time: "3:00 am",
        status: "upcoming",
        home: { team: null, score: null },
        away: { team: null, score: null },
      },
    ],
  },
];

const CARD_W = 250;
const CARD_H = 124;
const GAP_X = 40; // horizontal gap between round columns (elbow + stub)
const GAP_Y = 32; // vertical gap between stacked cards of the base round
const PAD_L = 20; // room on the left for the entry stubs
const VISIBLE_COLS = 3;

const EASE = [0.4, 0, 0.2, 1] as const;
const TRANSITION = { duration: 0.5, ease: EASE };

const TeamFlag = ({ team }: { team: Team | null }) => {
  if (!team) {
    return (
      <span className="flex h-5 w-7 items-center justify-center">
        <Shield className="text-muted-foreground/50 h-5 w-5 fill-current" />
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w80/${team.code}.png`}
      alt={`${team.name} flag`}
      className="border-border/40 h-5 w-7 rounded-[4px] border object-cover"
      loading="lazy"
      draggable={false}
    />
  );
};

const TeamRow = ({
  side,
  isWinner,
  isFinished,
}: {
  side: MatchSide;
  isWinner: boolean;
  isFinished: boolean;
}) => {
  const isLoser = isFinished && !isWinner;

  return (
    <div className="flex items-center gap-3">
      <TeamFlag team={side.team} />
      <span
        className={cn(
          "flex-1 truncate text-base font-medium",
          isLoser && "text-muted-foreground",
        )}
      >
        {side.team?.name ?? "TBD"}
      </span>
      {side.score !== null && (
        <span
          className={cn(
            "text-base font-medium tabular-nums",
            isLoser && "text-muted-foreground",
          )}
        >
          {side.score}
          {side.penalties !== undefined && ` (${side.penalties})`}
        </span>
      )}
      <span
        className={cn(
          "border-y-4 border-r-[6px] border-y-transparent",
          isWinner ? "border-r-foreground" : "border-r-transparent",
        )}
      />
    </div>
  );
};

const MatchCard = ({ match }: { match: Match }) => {
  const isFinished = match.status === "finished";

  return (
    <div
      style={{ width: CARD_W, height: CARD_H }}
      className="border-border/60 bg-muted2 hover:border-border rounded-2xl border p-4 transition-colors"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-muted-foreground text-sm leading-5">
          {match.date}
          {match.time ? `, ${match.time}` : ""}
        </span>
        {isFinished && (
          <span className="bg-muted2 text-muted-foreground rounded-full px-2.5 text-xs font-medium leading-5">
            FT{match.home.penalties !== undefined && " (P)"}
          </span>
        )}
      </div>
      <div className="space-y-2.5">
        <TeamRow
          side={match.home}
          isWinner={match.winner === "home"}
          isFinished={isFinished}
        />
        <TeamRow
          side={match.away}
          isWinner={match.winner === "away"}
          isFinished={isFinished}
        />
      </div>
    </div>
  );
};

const UTC8_TIMEZONE = "Asia/Singapore";

const LiveUtc8Clock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const currentTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: UTC8_TIMEZONE,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now),
    [now],
  );

  return (
    <p className="text-muted-foreground text-sm italic">
      All times are in UTC+8 · Current time:{" "}
      <time dateTime={now.toISOString()} className="tabular-nums not-italic">
        {currentTime}
      </time>
    </p>
  );
};

/**
 * The bracket pages one round at a time (Google-style): the leftmost
 * visible round stacks its matches compactly, every later round centers
 * each match between its two feeder matches, and all cards, connectors
 * and headers animate to their new positions when paging.
 */
const KnockoutBracket = ({
  rounds,
  initialRound = 1,
  className,
}: {
  rounds: Round[];
  /** Index of the round shown as the leftmost column on mount (default 1: earlier rounds stay behind the left chevron). */
  initialRound?: number;
  className?: string;
}) => {
  const maxStart = Math.max(0, rounds.length - 2);
  const [start, setStart] = useState(() =>
    Math.min(Math.max(initialRound, 0), maxStart),
  );

  const colX = (r: number) => PAD_L + (r - start) * (CARD_W + GAP_X);

  // Vertical center of every match, relative to the current base round.
  const centers = useMemo(() => {
    const all: number[][] = rounds.map(() => []);

    all[start] = rounds[start].matches.map(
      (_, i) => i * (CARD_H + GAP_Y) + CARD_H / 2,
    );
    for (let r = start + 1; r < rounds.length; r++) {
      all[r] = rounds[r].matches.map(
        (_, i) => (all[r - 1][2 * i] + all[r - 1][2 * i + 1]) / 2,
      );
    }
    // Rounds behind the window collapse onto their parent as they fade out.
    for (let r = start - 1; r >= 0; r--) {
      all[r] = rounds[r].matches.map((_, i) => all[r + 1][Math.floor(i / 2)]);
    }

    return all;
  }, [rounds, start]);

  const bracketHeight = rounds[start].matches.length * (CARD_H + GAP_Y) - GAP_Y;
  const bracketWidth =
    PAD_L + VISIBLE_COLS * CARD_W + (VISIBLE_COLS - 1) * GAP_X;

  return (
    <div className={cn("w-full", className)} style={{ maxWidth: bracketWidth }}>
      <div className="relative mb-6 h-10 overflow-hidden">
        <motion.button
          type="button"
          aria-label="Previous round"
          onClick={() => setStart((s) => Math.max(0, s - 1))}
          animate={{ opacity: start > 0 ? 1 : 0 }}
          transition={TRANSITION}
          className={cn(
            "text-foreground hover:bg-muted2 absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            start === 0 && "pointer-events-none",
          )}
        >
          <ChevronsRightIcon className="h-5 w-5 rotate-180" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next round"
          onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
          animate={{ opacity: start < maxStart ? 1 : 0 }}
          transition={TRANSITION}
          className={cn(
            "text-foreground hover:bg-muted2 absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full  transition-colors",
            start >= maxStart && "pointer-events-none",
          )}
        >
          <ChevronsRightIcon className="h-5 w-5" />
        </motion.button>

        {rounds.map((round, r) => (
          <motion.div
            key={round.name}
            initial={false}
            animate={{
              x: colX(r),
              opacity: r >= start && r < start + VISIBLE_COLS ? 1 : 0,
            }}
            transition={TRANSITION}
            style={{ width: CARD_W }}
            className="absolute top-0 flex h-10 items-center justify-center"
          >
            <span className="text-base font-medium">{round.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ height: bracketHeight }}
        transition={TRANSITION}
        className="relative overflow-hidden"
      >
        {/* entry stubs on the left of the base round */}
        {rounds.map((round, r) =>
          round.matches.map((match, i) => (
            <motion.span
              key={`stub-${match.id}`}
              initial={false}
              animate={{
                x: colX(r) - PAD_L,
                y: centers[r][i],
                opacity: r === start ? 1 : 0,
              }}
              transition={TRANSITION}
              style={{ width: PAD_L }}
              className="bg-border/60 absolute left-0 top-0 h-px"
            />
          )),
        )}

        {/* elbow connectors joining each pair to its next-round match */}
        {rounds.map((round, r) => {
          if (r === 0) return null;

          return round.matches.map((match, i) => {
            const top = centers[r - 1][2 * i];
            const height = centers[r - 1][2 * i + 1] - top;

            return (
              <motion.div
                key={`elbow-${match.id}`}
                initial={false}
                animate={{
                  x: colX(r - 1) + CARD_W,
                  y: top,
                  height: Math.max(height, 1),
                  opacity: r > start ? 1 : 0,
                }}
                transition={TRANSITION}
                style={{ width: GAP_X / 2 }}
                className="border-border/60 absolute left-0 top-0 rounded-r-xl border-y border-r"
              >
                <span
                  style={{ width: GAP_X / 2 }}
                  className="bg-border/60 absolute left-full top-1/2 h-px"
                />
              </motion.div>
            );
          });
        })}

        {/* match cards */}
        {rounds.map((round, r) =>
          round.matches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={false}
              animate={{
                x: colX(r),
                y: centers[r][i] - CARD_H / 2,
                opacity: r >= start ? 1 : 0,
              }}
              transition={TRANSITION}
              className={cn(
                "absolute left-0 top-0",
                r < start && "pointer-events-none",
              )}
            >
              <MatchCard match={match} />
            </motion.div>
          )),
        )}
      </motion.div>

      <div className="border-border/60 mt-10 border-t pt-6">
        <LiveUtc8Clock />
      </div>
    </div>
  );
};

const Skiper107 = () => {
  return (
    <div className="text-foreground h-full w-full overflow-y-auto">
      <div className="py-22 mx-auto flex max-w-6xl flex-col items-center justify-center px-6">
        <KnockoutBracket rounds={ROUNDS} initialRound={2} />
      </div>
    </div>
  );
};

export { KnockoutBracket, ROUNDS, Skiper107, TEAMS };
export type { Match, MatchSide, Round, Team };

export default Skiper107;
