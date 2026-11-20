import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" intro="That page does not exist or has moved." />
      <section className="section"><div className="wrap"><Link className="btn btn-primary" href="/">Back to home</Link></div></section>
    </>
  );
}
