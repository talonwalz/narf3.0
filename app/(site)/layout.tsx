import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";

// Full site chrome. Campaign pages in app/(campaign) use their own minimal layout.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
