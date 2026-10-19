"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  AREA_SLUGS,
  CONDITIONS,
  FILTERS,
  categoryFromArea,
  type CategoryFilter,
} from "@/lib/conditions";

function View({
  category,
  onPick,
}: {
  category: CategoryFilter;
  onPick?: (c: CategoryFilter) => void;
}) {
  const shown = CONDITIONS.filter(
    (c) => category === "All" || c.category === category,
  );

  return (
    <>
      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter conditions by area"
      >
        {FILTERS.map((f) => {
          const on = f === category;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => onPick?.(f)}
              className={`min-h-11 rounded-full border px-[18px] text-[15px] transition-colors ${
                on
                  ? "border-deep bg-deep font-semibold text-white"
                  : "border-sand-line bg-white font-medium text-ink hover:border-teal"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="grid-fill-300 gap-3.5">
        {shown.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-2.5 rounded-[18px] border border-sand-line-2 bg-white p-[26px]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.1em] text-teal">
              {c.category}
            </div>
            <h3 className="text-[21px] font-semibold">{c.name}</h3>
            <p className="text-[15px] leading-[1.55] text-muted">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function Filter() {
  // The ?area= query param is the source of truth for the selected category.
  const searchParams = useSearchParams();
  const category = categoryFromArea(searchParams.get("area"));

  const pick = (c: CategoryFilter) => {
    const params = new URLSearchParams(searchParams);
    if (c === "All") params.delete("area");
    else params.set("area", AREA_SLUGS[c]);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  return <View category={category} onPick={pick} />;
}

export default function ConditionFilter() {
  return (
    <Suspense fallback={<View category="All" />}>
      <Filter />
    </Suspense>
  );
}
