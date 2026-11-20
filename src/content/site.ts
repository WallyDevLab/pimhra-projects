/**
 * Single source of truth for business details and content.
 * Everything marked SAMPLE comes from the PRD and must be replaced or confirmed
 * by Pimhra Projects before launch. Flags below keep unconfirmed claims off the site.
 */

export const site = {
  // Spelling is unconfirmed (Pimhra or Pimra). Change it here and everything follows.
  name: "Pimhra Projects",
  tagline: "Renovation and maintenance you can rely on.",
  description:
    "Pimhra Projects builds, repairs and maintains commercial and residential property across Johannesburg.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.co.za",
  // PLACEHOLDER contact details. Set real values in environment variables.
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "011 000 0000",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "+27110000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "27110000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@example.co.za",
  hours: "Monday to Friday, 07:30 to 17:00", // SAMPLE
  region: "Johannesburg, Gauteng",
  serviceAreas: [
    "Johannesburg CBD",
    "Marshalltown",
    "Sandton",
    "Rosebank",
    "Randburg",
    "Midrand",
    "Roodepoort",
    "Pretoria",
  ], // SAMPLE
} as const;

/**
 * Claims that may only appear once documented. Leave `confirmed: false` until
 * Pimhra Projects supplies the document. The trust bar shows confirmed items only
 * and disappears if none are confirmed.
 */
export const credentials: { label: string; confirmed: boolean }[] = [
  { label: "Registered company", confirmed: false },
  { label: "Insured", confirmed: false },
  { label: "Safety compliant", confirmed: false },
];

/** Set to a real commitment only once someone owns the inbox, e.g. "We reply within one business day." */
export const replyPromise: string | null = null;

export const whatsappLink = (text = "Hello, I would like a quote.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "building-renovations",
    title: "Building renovations",
    short: "Full and partial renovations, from strip out to final finishes.",
    description:
      "Full and partial renovations of commercial and residential buildings, from strip out to final finishes.",
    includes: [
      "Strip out and making good",
      "Ceilings, partitions and wall repairs",
      "Interior and exterior finishes",
      "Coordination of trades on site",
    ],
  },
  {
    slug: "painting-and-plastering",
    title: "Painting and plastering",
    short: "Interior and exterior painting, plaster repairs and coatings.",
    description:
      "Interior and exterior painting, plaster repairs and weatherproof coatings.",
    includes: [
      "Surface preparation and crack repair",
      "Plaster repairs and skim coats",
      "Interior and exterior painting",
      "Weatherproof coatings",
    ],
  },
  {
    slug: "roofing-and-waterproofing",
    title: "Roofing and waterproofing",
    short: "Roof repairs, replacements and flat roof waterproofing.",
    description:
      "Roof repairs, replacements and waterproofing of flat roofs and parapets.",
    includes: [
      "Leak tracing and roof repairs",
      "Roof replacements",
      "Flat roof and parapet waterproofing",
      "Gutters and rainwater goods",
    ],
  },
  {
    slug: "tiling-and-flooring",
    title: "Tiling and flooring",
    short: "Floor and wall tiling, screeding and floor finishes.",
    description: "Floor and wall tiling, screeding and floor finishes.",
    includes: [
      "Floor and wall tiling",
      "Screeding and levelling",
      "Floor finishes",
      "Repairs to damaged tiles and joints",
    ],
  },
  {
    slug: "ablutions-and-plumbing",
    title: "Ablutions and plumbing",
    short: "Bathroom and ablution upgrades, fixtures and plumbing repairs.",
    description:
      "Bathroom and ablution upgrades, fixtures and plumbing repairs.",
    includes: [
      "Bathroom and ablution upgrades",
      "Fixtures and fittings",
      "Leak and drain repairs",
      "Plumbing repairs and replacements",
    ],
  },
  {
    slug: "maintenance-contracts",
    title: "Maintenance contracts",
    short: "Scheduled inspections and repairs for owners and managers.",
    description:
      "Scheduled inspections and repairs for property owners and managers.",
    includes: [
      "Scheduled inspections",
      "Planned and reactive repairs",
      "Reporting for property managers",
      "A single contact for your portfolio",
    ],
  },
];

/**
 * status:
 *  - "sample": placeholder from the PRD, not a real project
 *  - "pending": real project, publishing permission not yet confirmed
 *  - "approved": permission and photos confirmed, badge disappears
 */
export type Project = {
  slug: string;
  title: string;
  location: string;
  clientType: string;
  serviceSlugs: string[];
  scope: string;
  duration: string;
  summary: string;
  outcome: string;
  status: "sample" | "pending" | "approved";
};

export const projects: Project[] = [
  {
    slug: "magnet-house-marshalltown",
    title: "Magnet House",
    location: "Marshalltown, Johannesburg",
    clientType: "Property owner",
    serviceSlugs: ["painting-and-plastering", "building-renovations"],
    scope:
      "Exterior repainting, scaffold netting removed, interior corridors and rooms painted.",
    duration: "To be confirmed",
    summary:
      "A four storey 1930s building on Anderson Street. Exterior repainting, scaffold netting removed, and interior corridors and rooms painted.",
    outcome:
      "A refreshed heritage building with a clean exterior and finished interiors. A photo and video record of progress is available.",
    status: "pending",
  },
  {
    slug: "office-refurbishment-sandton",
    title: "Office refurbishment",
    location: "Sandton",
    clientType: "Business owner",
    serviceSlugs: ["building-renovations", "painting-and-plastering", "tiling-and-flooring"],
    scope: "Open plan refurbishment with new ceilings, painting and flooring.",
    duration: "6 weeks",
    summary:
      "Open plan office refurbishment completed in 6 weeks with new ceilings, painting and flooring.",
    outcome: "A finished open plan office delivered on a fixed six week programme.",
    status: "sample",
  },
  {
    slug: "retail-shopfront-rosebank",
    title: "Retail shopfront upgrade",
    location: "Rosebank",
    clientType: "Retail tenant",
    serviceSlugs: ["painting-and-plastering", "building-renovations"],
    scope: "Shopfront repair, repaint and signage preparation.",
    duration: "One weekend",
    summary:
      "Shopfront repair, repaint and signage preparation completed over a weekend to limit trading disruption.",
    outcome: "The shop reopened on Monday with a renewed frontage and no lost trading days.",
    status: "sample",
  },
];

export const processSteps = [
  {
    title: "Site visit",
    text: "We visit the property, listen to what you need and note the condition of the work.",
  },
  {
    title: "Written quote",
    text: "You receive a clear written quote covering scope, materials and timing, so there are no surprises.",
  },
  {
    title: "Build",
    text: "Our team carries out the work, keeping you informed and keeping disruption to a minimum.",
  },
  {
    title: "Handover",
    text: "We walk through the finished work with you and close out any snags before we leave.",
  },
];

/** Real, permissioned client quotes only. The testimonials section hides when empty. */
export const testimonials: { quote: string; name: string; role: string }[] = [];
