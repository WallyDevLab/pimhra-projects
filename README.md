# Pimhra Projects website

Next.js 16, TypeScript, plain CSS. Built from the Pimhra Projects Website PRD.

## Run

    npm install
    cp .env.example .env.local   # then fill in real values
    npm run dev                  # http://localhost:3000
    npm run build && npm start

## Where to change things

* `src/content/site.ts`: business details, services, projects, credentials, testimonials, reply promise. Items marked SAMPLE are placeholders from the PRD.
* `credentials` and `replyPromise`: leave unconfirmed until documented. The trust bar and the reply time line stay hidden until then.
* `testimonials`: empty on purpose. The section appears when real, permissioned quotes are added.
* Project `status`: "sample", "pending" (awaiting permission) or "approved". Badges disappear when approved.
* `public/company-profile.pdf`: add the file and a download button appears on the About page.
* Logo: replace `src/components/Logo.tsx` with the supplied light and dark logo files.

## Before launch

1. Set real contact details and `NEXT_PUBLIC_SITE_URL` in Vercel environment variables.
2. Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` and verify the sending domain. In production the form refuses to submit if email is not configured, so no lead is lost silently.
3. Add Cloudflare Turnstile keys for stronger spam protection.
4. Replace the in memory rate limiter in `src/app/api/quote/route.ts` with Upstash Redis.
5. Replace placeholder photos with real project photography (WebP or AVIF through `next/image`).
6. Have the privacy policy and terms reviewed by a lawyer and confirm the Information Officer.
7. Use the Vercel Pro plan (the free plan does not permit commercial use).

## Analytics events (cookieless, Vercel Analytics)

whatsapp_tap, call_tap, email_tap, quote_cta_tap, form_start, form_submit_success, form_submit_error, profile_download.
