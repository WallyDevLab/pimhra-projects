import Link from "next/link";
import { services, site, whatsappLink } from "@/content/site";
import TrackedLink from "./TrackedLink";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h3>{site.name}</h3>
            <p>{site.description}</p>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><TrackedLink href={`tel:${site.phoneTel}`} event="call_tap" place="footer">{site.phoneDisplay}</TrackedLink></li>
              <li><TrackedLink href={whatsappLink()} event="whatsapp_tap" place="footer">WhatsApp us</TrackedLink></li>
              <li><TrackedLink href={`mailto:${site.email}`} event="email_tap" place="footer">{site.email}</TrackedLink></li>
              <li>{site.region}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/process">Our process</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of use</Link></li>
            </ul>
          </div>
        </div>
        <small>© {new Date().getFullYear()} {site.name}. All rights reserved.</small>
      </div>
    </footer>
  );
}
