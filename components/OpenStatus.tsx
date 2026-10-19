"use client";

import { useSyncExternalStore } from "react";
import {
  CLOSE_HOUR,
  OPEN_HOUR,
  OPEN_HOURS_LABEL,
  hours,
  site,
} from "@/lib/site";

const phoenixParts = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone,
  weekday: "short",
  hour: "numeric",
  hourCycle: "h23",
});
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Snapshot is "<day>:<open 0|1>" in clinic-local time, e.g. "2:1".
function getSnapshot() {
  const parts = phoenixParts.formatToParts(new Date());
  const day = WEEKDAYS.indexOf(parts.find((p) => p.type === "weekday")!.value);
  const hour = Number(parts.find((p) => p.type === "hour")!.value);
  const open =
    hours.some((h) => h.day === day && h.open) &&
    hour >= OPEN_HOUR &&
    hour < CLOSE_HOUR;
  return `${day}:${open ? 1 : 0}`;
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

// null on the server and during hydration, so markup never mismatches.
function useClinicNow() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => null);
  if (!snap) return null;
  const [day, open] = snap.split(":");
  return { day: Number(day), open: open === "1" };
}

export function OpenStatus() {
  const now = useClinicNow();
  return (
    <div className="flex min-h-5 items-center gap-2.5 text-sm font-semibold">
      <span className="h-2.5 w-2.5 flex-none rounded-full bg-orange-soft" />
      <span aria-live="polite">
        {now === null
          ? "Open Tue–Fri, 7AM–6PM"
          : now.open
            ? "Open now · until 6PM"
            : "Closed now · open Tue–Fri, 7AM–6PM"}
      </span>
    </div>
  );
}

export function HoursTable() {
  const now = useClinicNow();
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-y-2 border-t border-deep-tint/20 pt-4 text-[15px] text-deep-tint">
      {hours.map((h) => (
        <div key={h.name} className="contents">
          <dt>
            {h.name}
            {now?.day === h.day && " (today)"}
          </dt>
          <dd className="text-right">
            {h.open ? OPEN_HOURS_LABEL : "Closed"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
