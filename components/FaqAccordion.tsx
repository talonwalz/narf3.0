"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="border-t border-sand-line">
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={open}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-[18px] text-left text-lg font-semibold text-ink"
              >
                {item.question}
                <span aria-hidden className="flex-none text-[22px] text-teal">
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-[1.6] text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
