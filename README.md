# NARF 3.0

Marketing site for Northern Arizona Rehabilitation & Fitness (Cottonwood, AZ).
Next.js App Router + TypeScript + Tailwind CSS v4. Replaces the CRA site in `../narf2.0`.

## Develop

```bash
nvm use 20
npm install
npm run dev
```

## Where things live

- `app/(site)/` — pages with the full site header/footer (`/`, `/services`, `/services/stemwave`, `/patient-info`, `/team`, `/contact`, `/facilities`)
- `app/(campaign)/stemwave/` — StemWave ad/QR landing page with minimal chrome (no site nav, `noindex`)
- `components/` — Header, Footer, MobileActionBar, Button, and the client components (ConditionFilter, FaqAccordion, ContactForm, OpenStatus)
- `lib/site.ts` — phone, address, hours, nav links, EmailJS IDs (single source of truth)
- `lib/stemwave.ts` — StemWave copy, offer/CTA config, and photo paths
- `lib/conditions.ts`, `lib/team.ts`, `lib/faq.ts`, `lib/testimonials.ts` — page content
- `app/globals.css` — design tokens (`@theme`), type styles, and layout utilities (`wrap`, `section-y`, `grid-fit-*`)
- `public/images`, `public/docs`, `public/videos` — assets

## Notes

- Tailwind v4 has no `tailwind.config`; colors and the `nav` (1100px) breakpoint are defined in `app/globals.css`.
- The contact form sends through EmailJS using the same service/template as the old site. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying.
- Old routes redirect in `next.config.ts`.

## Content still needed from the clinic

Search the code for `TODO(clinic)`:

- Accepted insurance plans (`app/(site)/patient-info/page.tsx`)
- Amy Shantz bio + specialties; other staff names/roles/photos (`lib/team.ts`)
- Review FAQ answers (`lib/faq.ts`) and new checklist copy (`app/(site)/patient-info/page.tsx`)
- Confirm parking copy (`app/(site)/contact/page.tsx`)
- StemWave (`lib/stemwave.ts`): offer wording (or set `show: false`), insurance/pricing answer, contraindications reviewed by a PT, condition list, session wording, device photos (`public/images/stemwave/`), and "StemWave®" trademark usage
