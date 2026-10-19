import Link from "next/link";
import { site } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] gap-2.5 border-t border-sand-line bg-white px-3.5 py-2.5 shadow-bar nav:hidden">
      <a
        href={site.phoneHref}
        className="flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-deep font-semibold text-deep"
      >
        Call
      </a>
      <Link
        href="/contact"
        className="flex min-h-12 items-center justify-center rounded-full bg-orange font-semibold text-white"
      >
        Request Appointment
      </Link>
    </div>
  );
}
