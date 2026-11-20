import { replyPromise, whatsappLink } from "@/content/site";
import TrackedLink from "./TrackedLink";

export default function CtaBand({ heading = "Tell us about your building." }: { heading?: string }) {
  return (
    <section className="cta-band" aria-labelledby="cta-h">
      <div className="wrap">
        <h2 id="cta-h">{heading}</h2>
        {replyPromise && <p>{replyPromise}</p>}
        <div className="btn-row">
          <TrackedLink href="/contact" className="btn btn-primary" event="quote_cta_tap" place="cta-band">Get a free quote</TrackedLink>
          <TrackedLink href={whatsappLink()} className="btn btn-secondary" event="whatsapp_tap" place="cta-band">WhatsApp us</TrackedLink>
        </div>
      </div>
    </section>
  );
}
