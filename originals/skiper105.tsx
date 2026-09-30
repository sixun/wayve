"use client";

import { useDialKit } from "dialkit";
import React, {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type NumberFormat = "us" | "eu" | "space" | "ch" | "in" | "none" | "string";

type AutoscaleInputProps = ComponentPropsWithoutRef<"input"> & {
  numberFormat?: NumberFormat;
  prefix?: string;
  suffix?: string;
  minSize?: number;
  maxSize?: number;
  wrapperClassName?: string;
  containerClassName?: string;
};

const NUMBER_FORMAT_OPTIONS: { value: NumberFormat; label: string }[] = [
  { value: "us", label: "1,234,567.89 (US)" },
  { value: "eu", label: "1.234.567,89 (EU)" },
  { value: "space", label: "1 234 567,89 (SPACE)" },
  { value: "ch", label: "1'234'567.89 (CH)" },
  { value: "in", label: "12,34,567.89 (IN)" },
  { value: "none", label: "1234567.89 (NONE)" },
  { value: "string", label: "Any text (STRING)" },
];

const isStringFormat = (format: NumberFormat) => format === "string";

const usesCommaDecimal = (format: NumberFormat) =>
  format === "eu" || format === "space";

const getDecimalSeparator = (format: NumberFormat) =>
  usesCommaDecimal(format) ? "," : ".";

/** Indian numbering: groups of 3 at the end, then groups of 2. */
const formatIndianGrouping = (digits: string) => {
  const len = digits.length;
  if (len <= 3) return digits;

  const segments: string[] = [];
  let rest = digits;

  segments.unshift(rest.slice(-3));
  rest = rest.slice(0, -3);

  while (rest.length > 0) {
    const take = rest.length >= 2 ? 2 : rest.length;
    segments.unshift(rest.slice(-take));
    rest = rest.slice(0, -take);
  }

  return segments.join(",");
};

const formatWesternGrouping = (digits: string) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatEuGrouping = (digits: string) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const formatSpaceGrouping = (digits: string) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const formatSwissGrouping = (digits: string) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

const groupDigits = (digits: string, format: NumberFormat) => {
  switch (format) {
    case "in":
      return formatIndianGrouping(digits);
    case "us":
      return formatWesternGrouping(digits);
    case "eu":
      return formatEuGrouping(digits);
    case "space":
      return formatSpaceGrouping(digits);
    case "ch":
      return formatSwissGrouping(digits);
    case "none":
    case "string":
      return digits;
  }
};

const parseNumberBody = (body: string, format: NumberFormat) => {
  if (isStringFormat(format)) return { int: body, frac: "" };

  const decimalSep = getDecimalSeparator(format);
  let work = body;

  switch (format) {
    case "us":
    case "in":
      work = work.replace(/,/g, "");
      break;
    case "eu":
      work = work.replace(/\./g, "");
      break;
    case "space":
      work = work.replace(/ /g, "");
      break;
    case "ch":
      work = work.replace(/'/g, "");
      break;
    case "none":
      break;
  }

  const decIdx = work.lastIndexOf(decimalSep);
  if (decIdx === -1) {
    return { int: work.replace(/\D/g, ""), frac: "" };
  }

  return {
    int: work.slice(0, decIdx).replace(/\D/g, ""),
    frac: work.slice(decIdx + 1).replace(/\D/g, ""),
  };
};

const parseNeutralBody = (body: string) => {
  for (let i = body.length - 1; i >= 0; i--) {
    const ch = body[i];
    if (ch === "." || ch === ",") {
      const frac = body.slice(i + 1).replace(/\D/g, "");
      const int = body.slice(0, i).replace(/\D/g, "");
      if (frac.length > 0) return { int, frac };
    }
  }

  return { int: body.replace(/\D/g, ""), frac: "" };
};

const formatNumberParts = (
  { int, frac }: { int: string; frac: string },
  format: NumberFormat,
) => {
  if (isStringFormat(format)) return int;

  if (!int && !frac) return "";

  const decimalSep = getDecimalSeparator(format);
  const groupedInt = int ? groupDigits(int, format) : "0";

  if (!frac) return groupedInt;
  return `${groupedInt}${decimalSep}${frac}`;
};

const formatNumberInput = (raw: string, format: NumberFormat) => {
  if (isStringFormat(format)) return raw;

  const parts = parseNumberBody(raw, format);
  const decimalSep = getDecimalSeparator(format);
  const endsWithDecimal = raw.endsWith(decimalSep) && !parts.frac;

  if (!parts.int && !parts.frac) return "";

  let formatted = formatNumberParts(parts, format);
  if (endsWithDecimal) formatted += decimalSep;

  return formatted;
};

const reformatStoredValue = (value: string, format: NumberFormat) => {
  if (isStringFormat(format)) return value;

  const parts = parseNeutralBody(value);
  if (!parts.int && !parts.frac) return "";

  return formatNumberParts(parts, format);
};

const buildPlaceholder = (format: NumberFormat) =>
  isStringFormat(format)
    ? "Type here…"
    : formatNumberParts({ int: "0", frac: "0" }, format);

const formatInitialValue = (raw: string, format: NumberFormat) =>
  isStringFormat(format) ? raw : formatNumberInput(raw, format);

// ─── useAutoscaleInput — scales font size to fit container width ───────────
const useAutoscaleInput = ({
  minSize = 12,
  maxSize = 512,
  multiLine = false,
  observeMutations = false,
  emptyMeasureFallback = "",
  prefixRef,
  suffixRef,
  inputRef,
  watch,
}: {
  minSize?: number;
  maxSize?: number;
  multiLine?: boolean;
  observeMutations?: boolean;
  emptyMeasureFallback?: string;
  prefixRef?: React.RefObject<HTMLSpanElement | null>;
  suffixRef?: React.RefObject<HTMLSpanElement | null>;
  inputRef?: React.Ref<HTMLInputElement | null>;
  watch?: unknown;
} = {}) => {
  const localRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof inputRef === "function") inputRef(node);
      else if (inputRef) inputRef.current = node;
    },
    [inputRef],
  );

  const autoscale = useCallback(() => {
    const el = localRef.current;
    if (!el || !el.parentElement) return;

    const prefixEl = prefixRef?.current;
    const suffixEl = suffixRef?.current;
    const availableWidth = el.parentElement.offsetWidth;

    el.style.whiteSpace = multiLine ? "normal" : "nowrap";
    el.style.display = "inline-block";

    const restoreValue = el.value;
    el.value = restoreValue || emptyMeasureFallback || "\u00a0";

    const applySize = (size: number) => {
      const px = `${size}px`;
      el.style.fontSize = px;
      if (prefixEl) prefixEl.style.fontSize = px;
      if (suffixEl) suffixEl.style.fontSize = px;
    };

    const measureWidth = () =>
      (prefixEl?.offsetWidth ?? 0) +
      el.scrollWidth +
      (suffixEl?.offsetWidth ?? 0);

    let low = minSize,
      high = maxSize;
    while (high - low > 0.5) {
      const mid = (low + high) / 2;
      applySize(mid);
      if (measureWidth() > availableWidth) high = mid;
      else low = mid;
    }

    const finalSize = Math.floor(low);
    applySize(finalSize);
    setFontSize(finalSize);

    el.value = restoreValue;
  }, [minSize, maxSize, multiLine, emptyMeasureFallback, prefixRef, suffixRef]);

  useEffect(() => {
    const el = localRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    autoscale();

    const ro = new ResizeObserver(autoscale);
    ro.observe(parent);

    let mo: MutationObserver | undefined;
    if (observeMutations) {
      mo = new MutationObserver(autoscale);
      mo.observe(el, { childList: true, subtree: true, characterData: true });
    }

    return () => {
      ro.disconnect();
      mo?.disconnect();
    };
  }, [autoscale, observeMutations]);

  useEffect(() => {
    autoscale();
  }, [autoscale, watch]);

  return { ref: setRef, fontSize };
};

const AutoscaleInput = React.forwardRef<HTMLInputElement, AutoscaleInputProps>(
  (
    {
      numberFormat = "us",
      prefix = "$",
      suffix = "",
      minSize = 18,
      maxSize = 100,
      wrapperClassName,
      containerClassName,
      className,
      style,
      value,
      defaultValue,
      onChange,
      placeholder,
      inputMode,
      spellCheck,
      autoComplete = "off",
      "aria-label": ariaLabel = "Value",
      ...inputProps
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      formatInitialValue(defaultValue?.toString() ?? "", numberFormat),
    );

    const params = useDialKit(
      "Autoscale Input",
      {
        numberFormat: {
          type: "select",
          options: NUMBER_FORMAT_OPTIONS,
          default: numberFormat,
        },
        prefix: { type: "text", default: prefix, placeholder: "e.g. $, €, ₹" },
        suffix: { type: "text", default: suffix, placeholder: "e.g. USD, /mo" },
        placeholder: {
          type: "text",
          default: placeholder ?? buildPlaceholder(numberFormat),
          placeholder: "Empty state text…",
        },
        minSize: [minSize, 8, 64],
        maxSize: [maxSize, 32, 200, 4],
        inputLayout: {
          maxWidth: [384, 200, 640, 8],
          paddingX: [24, 0, 48, 4],
        },
        clear: { type: "action", label: "Clear value" },
      },
      {
        onAction: (path) => {
          if (path !== "clear") return;

          if (!isControlled) {
            setUncontrolledValue("");
          }

          onChange?.({
            target: { value: "" },
            currentTarget: { value: "" },
          } as React.ChangeEvent<HTMLInputElement>);
        },
      },
    );

    const activeFormat = params.numberFormat as NumberFormat;
    const displayValue = isControlled
      ? (value?.toString() ?? "")
      : uncontrolledValue;

    useEffect(() => {
      if (isControlled) return;
      setUncontrolledValue((prev) => {
        if (!prev) return "";
        return reformatStoredValue(prev, activeFormat);
      });
    }, [activeFormat, isControlled]);

    const displayPlaceholder =
      params.placeholder || placeholder || buildPlaceholder(activeFormat);

    const prefixRef = useRef<HTMLSpanElement>(null);
    const suffixRef = useRef<HTMLSpanElement>(null);

    const { ref: autoscaleRef, fontSize } = useAutoscaleInput({
      minSize: params.minSize,
      maxSize: params.maxSize,
      observeMutations: false,
      emptyMeasureFallback: displayPlaceholder,
      prefixRef,
      suffixRef,
      inputRef: ref,
      watch: [
        displayValue,
        displayPlaceholder,
        params.minSize,
        params.maxSize,
        params.prefix,
        params.suffix,
      ],
    });

    const fontSizeStyle = fontSize ? { fontSize: `${fontSize}px` } : undefined;
    const isEmpty = !displayValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = formatNumberInput(e.target.value, activeFormat);

      if (!isControlled) {
        setUncontrolledValue(next);
      }

      onChange?.({
        ...e,
        target: { ...e.target, value: next },
        currentTarget: { ...e.currentTarget, value: next },
      });
    };

    return (
      <div
        className={cn("mx-auto w-full", containerClassName)}
        style={{
          maxWidth: params.inputLayout.maxWidth,
          paddingInline: params.inputLayout.paddingX,
        }}
      >
        <div
          className={cn(
            "text-foreground relative flex w-full items-center justify-center overflow-hidden text-center font-semibold tracking-tighter",
            wrapperClassName,
          )}
        >
          {params.prefix ? (
            <span
              ref={prefixRef}
              className={cn(
                "text-foreground shrink-0 transition-opacity",
                isEmpty && "text-foreground/20",
              )}
              style={fontSizeStyle}
            >
              {params.prefix}
            </span>
          ) : null}
          <input
            {...inputProps}
            ref={autoscaleRef}
            type="text"
            inputMode={
              inputMode ?? (isStringFormat(activeFormat) ? "text" : "decimal")
            }
            autoComplete={autoComplete}
            spellCheck={spellCheck ?? isStringFormat(activeFormat)}
            value={displayValue}
            placeholder={displayPlaceholder}
            onChange={handleChange}
            aria-label={ariaLabel}
            className={cn(
              "field-sizing-content min-w-0 cursor-text border-0 p-0 text-center text-inherit outline-none",
              "caret-foreground placeholder:text-foreground/20",
              "appearance-none [-webkit-appearance:none]",
              "shadow-none ring-0 focus:shadow-none focus:ring-0 focus-visible:outline-none",
              "touch-manipulation",
              className,
            )}
            style={{ ...fontSizeStyle, ...style }}
          />
          {params.suffix ? (
            <span
              ref={suffixRef}
              className={cn(
                "text-foreground shrink-0 transition-opacity",
                isEmpty && "text-foreground/20",
              )}
              style={fontSizeStyle}
            >
              {params.suffix}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);

AutoscaleInput.displayName = "AutoscaleInput";

const Skiper105 = () => (
  <div className="bg-muted text-foreground flex h-full w-full flex-col items-center justify-center">
    <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
      <span className="after:bg-linear-to-b after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:from-transparent after:content-['']">
        Try Entering a number
      </span>
    </div>
    <div className="w-full">
      <AutoscaleInput />
    </div>
  </div>
);

export { AutoscaleInput, Skiper105 };
export type { AutoscaleInputProps, NumberFormat };
