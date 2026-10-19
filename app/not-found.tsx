import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "The page you were looking for couldn’t be found.",
  noindex: true,
});

// Lives at the app root, so it brings its own site chrome.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="section-y">
        <div className="wrap flex flex-col items-start gap-5">
          <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-teal">
            404
          </div>
          <h1 className="h1">We couldn’t find that page.</h1>
          <p className="lead max-w-[560px]">
            It may have moved when we updated our website. Try one of these
            instead, or give us a call at {site.phone}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/">Go to the home page</Button>
            <Button href="/services" variant="outline">
              Our services
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
