"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Shows the help message if the check hasn't passed by now. The widget doesn't
// always report a failure, e.g. when something blocks its challenge.
const HELP_AFTER_MS = 15_000;

// Cloudflare Turnstile "are you human" check. Reports a token when passed and
// null when it expires or fails. Tokens are single use, so bump `resetKey` to
// get a new one after a failed submit.
export default function Turnstile({
  onToken,
  passed,
  resetKey = 0,
}: {
  onToken: (token: string | null) => void;
  passed: boolean;
  resetKey?: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  const [ready, setReady] = useState(false);
  const [needsHelp, setNeedsHelp] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useEffect(() => {
    if (!ready || !SITE_KEY || !container.current || !window.turnstile) return;
    const api = window.turnstile;
    const id = api.render(container.current, {
      sitekey: SITE_KEY,
      size: "flexible",
      theme: "light",
      callback: (token: string) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(null),
      "timeout-callback": () => onTokenRef.current(null),
      "error-callback": () => {
        setNeedsHelp(true);
        onTokenRef.current(null);
      },
    });
    return () => api.remove(id);
  }, [ready, resetKey]);

  useEffect(() => {
    const timer = setTimeout(() => setNeedsHelp(true), HELP_AFTER_MS);
    return () => clearTimeout(timer);
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-2">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
        onError={() => setNeedsHelp(true)}
      />
      <div ref={container} className="min-h-[65px]" />
      {!passed && (needsHelp || !SITE_KEY) && (
        <p role="alert" className="text-sm leading-normal text-orange-hover">
          Having trouble with the spam check? Try reloading the page or turning
          off any content blocker, or call us at{" "}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phone}
          </a>
          .
        </p>
      )}
    </div>
  );
}
