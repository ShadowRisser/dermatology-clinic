# Task 2 & 4 — Database Schema, Seed Data, and Backend API Routes

**Agent:** full-stack-developer
**Task IDs:** 2 (DB schema + seed) and 4 (API routes)
**Status:** ✅ Complete

## What was delivered

### Part A — Database (Task 2)

**Schema** — `/home/z/my-project/prisma/schema.prisma`
- Replaced the default User/Post models with 6 clinic models:
  - `Service` (slug, name, category, tagline, description, price, durationMin, image, featured, sortOrder, createdAt)
  - `Doctor` (name, title, credentials, bio, image, specialty, experienceY, sortOrder, createdAt)
  - `Booking` (name, email, phone, service, doctor, date, time, notes, status="pending", createdAt)
  - `Newsletter` (email @unique, createdAt)
  - `ContactMessage` (name, email, subject, message, createdAt)
  - `Review` (name, rating, treatment, text, location, featured, createdAt)
- SQLite primitive types only; no lists.
- **Spec deviation (documented):** The original spec wrote `id String @id @default(now())` for `ContactMessage`, which is invalid in Prisma (`now()` returns DateTime, not String). Changed to `@default(cuid())` to match every other id field. All other fields match the spec verbatim.
- `bunx prisma db push --force-reset --accept-data-loss` → ✅
- `bun run db:generate` → ✅ (Prisma Client v6.19.2)

**Seed script** — `/home/z/my-project/scripts/seed.ts`
- Uses `import { db } from '@/lib/db'` (the @ alias resolved fine under bun).
- Clears every table with `deleteMany({})` first, then inserts:
  - **12 Services** with luxury 2–3 sentence descriptions + realistic slugs (botulinum-toxin, dermal-fillers, laser-resurfacing, hydrafacial, chemical-peel, microneedling, prp-therapy, thread-lift, coolsculpting, laser-hair-removal, medical-facial, skin-consultation). Featured flags + sortOrder exactly per spec.
  - **3 Doctors** — Dr. Elena Marchetti, Dr. James Whitford, Sofia Renaud — each with a detailed bio and credentials per spec.
  - **6 Reviews** — all featured=true, names/locations/treatments per spec (Isabelle Laurent/NYC, Marcus Chen/LA, Priya Sharma/London, Olivia Hartman/Chicago, Daniel Okafor/Toronto, Camille Dubois/Montréal). Ratings: 5,5,5,4,5,5.
- Verified counts after run: **Services=12, Doctors=3, Reviews=6**.

### Part B — API Routes (Task 4)

8 Next.js 16 App Router route handlers at `/home/z/my-project/src/app/api/`:

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/services` | All services sorted by sortOrder asc |
| GET | `/api/doctors` | All doctors sorted by sortOrder asc |
| GET | `/api/reviews` | Featured reviews sorted by createdAt desc |
| POST | `/api/reviews` | Create a review (validates name, rating 1–5, treatment, text) |
| POST | `/api/bookings` | Create a booking (validates name, email, phone, service, doctor, date, time; status="pending"; try/catch → 500) |
| POST | `/api/newsletter` | Subscribe (email regex; returns "already subscribed" 200 if dup, else 201) |
| POST | `/api/contact` | Create contact message (validates name, email, subject, message) |
| POST | `/api/ai/skin-analysis` | VLM skin analysis via `zai.chat.completions.createVision` with strict JSON prompt; strips ```json fences; returns `{success, analysis}` or `{success, analysis:null, raw}` on parse failure |
| POST | `/api/ai/consult` | LLM consultation chatbot "Lumée" via `zai.chat.completions.create` with system prompt + disclaimer; accepts `{message, history}`; returns `{success, reply}` |

- All routes use `import { NextRequest, NextResponse } from 'next/server'` and `import { db } from '@/lib/db'` (where needed).
- All AI routes use `thinking: { type: 'disabled' }` per spec.
- All responses follow `{ success: boolean, ...payload }` envelope with appropriate 200/201/400/500 codes.
- Robust input validation and try/catch error handling throughout.

## Verification

- `bun run lint` → clean (0 errors).
- Live curl-tested every endpoint against the running dev server (port 3000):
  - All GET endpoints returned correct seeded data.
  - All POST endpoints created records successfully; validation errors returned 400 with clear messages.
  - `/api/newsletter` correctly returned `"already subscribed"` on duplicate email.
  - `/api/ai/consult` made a real successful LLM call (~3.3s) and returned a warm, on-brand dermatology consultation reply.
- After testing, re-ran the seed to wipe test data; DB now contains only the curated seed (Services=12, Doctors=3, Reviews=6, other tables empty).

## Notes for downstream agents

- **Frontend integration agent:** All 8 endpoints are live and return the documented JSON shapes. Consume freely.
- **Image generation (Task 1):** Seed data references these images in `/public/clinic/`:
  - `treatment-injectables.png`, `treatment-laser.png`, `treatment-facial.png`, `treatment-skincare.png`
  - `doctor-1.png`, `doctor-2.png`, `doctor-3.png`
  - The script `scripts/gen-images.ts` (already present from Task 1) generates these plus `hero-interior.png`, `spa-room.png`, `skin-before.png`, `skin-after.png`.
- **Re-seed anytime:** `bun run /home/z/my-project/scripts/seed.ts` (idempotent — clears then inserts).
- **Booking status flow:** All new bookings start as `"pending"`. If a future agent needs an admin status-update endpoint (e.g. to confirm/cancel), it can be added at `/api/bookings/[id]/route.ts`.
