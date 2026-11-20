import { z } from "zod";
import { services } from "@/content/site";

export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can reach you on")
  .max(25)
  .regex(/^[+0-9()\s]+$/, "Use digits, spaces and + only");

/** Shared by the browser (hints) and the server (authoritative). */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone,
  email: z.string().trim().email("Enter a valid email address").max(160),
  service: z.enum(serviceOptions as [string, ...string[]], { message: "Choose a service" }),
  location: z.string().trim().min(2, "Enter the suburb or address").max(160),
  message: z.string().trim().min(10, "Tell us a little about the work").max(2000),
  consent: z.literal(true, { message: "Please agree to the privacy policy to continue" }),
  // anti spam fields
  website: z.string().max(0).optional(), // honeypot, must stay empty
  startedAt: z.number().optional(),
  turnstile: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
