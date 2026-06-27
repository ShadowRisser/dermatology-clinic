import { db } from '@/lib/db';

/**
 * Lumière Aesthetic & Dermatology Clinic — Seed Script
 * Clears all clinic tables then inserts curated seed data:
 *   - 12 Services
 *   - 3 Doctors
 *   - 6 Reviews (all featured)
 *
 * Run with: bun run /home/z/my-project/scripts/seed.ts
 */

interface ServiceSeed {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  durationMin: number;
  image: string;
  featured: boolean;
  sortOrder: number;
}

const services: ServiceSeed[] = [
  {
    slug: 'botulinum-toxin',
    name: 'Botulinum Toxin',
    category: 'Injectables',
    tagline: 'Smooth expression lines',
    description:
      'A precision neurotoxin treatment that gently softens fine lines and wrinkles across the forehead, glabella, and crow\'s feet. Administered by our board-certified physicians using a bespoke dosing protocol, results emerge within days and last for months — restoring a calm, refreshed, and effortlessly youthful appearance.',
    price: 480,
    durationMin: 30,
    image: '/clinic/treatment-injectables.png',
    featured: true,
    sortOrder: 1,
  },
  {
    slug: 'dermal-fillers',
    name: 'Dermal Fillers',
    category: 'Injectables',
    tagline: 'Restore volume & contour',
    description:
      'Hyaluronic acid fillers artfully placed to restore lost volume, define cheekbones, smooth nasolabial folds, and sculpt the jawline. Our physicians use a micro-droplet, cannula-led technique for natural, undetectable results that honour your facial architecture and leave you looking rested, never “done.”',
    price: 750,
    durationMin: 45,
    image: '/clinic/treatment-injectables.png',
    featured: true,
    sortOrder: 2,
  },
  {
    slug: 'laser-resurfacing',
    name: 'Laser Resurfacing',
    category: 'Laser',
    tagline: 'Reveal smoother skin',
    description:
      'A fractionated laser resurfacing treatment that improves tone, texture, scarring, and fine lines by stimulating deep collagen remodelling. Personalised depth settings allow us to treat everything from subtle dullness to post-acne scarring, revealing luminous, refined skin with lasting, structural improvement.',
    price: 900,
    durationMin: 60,
    image: '/clinic/treatment-laser.png',
    featured: true,
    sortOrder: 3,
  },
  {
    slug: 'hydrafacial',
    name: 'Hydrafacial',
    category: 'Facial',
    tagline: 'Deep cleanse & hydrate',
    description:
      'A multi-step medical-grade treatment that cleanses, exfoliates, extracts, and hydrates in a single session. Infused with antioxidant-rich serums tailored to your skin, it delivers an immediate, lit-from-within glow with zero downtime — the perfect reset before any occasion.',
    price: 280,
    durationMin: 45,
    image: '/clinic/treatment-facial.png',
    featured: true,
    sortOrder: 4,
  },
  {
    slug: 'chemical-peel',
    name: 'Chemical Peel',
    category: 'Facial',
    tagline: 'Renew & brighten',
    description:
      'A physician-formulated chemical peel that lifts away dead skin cells, evens pigmentation, and refines pores. Tailored from light to medium depth, it accelerates cellular turnover for visibly brighter, smoother, and more uniform skin over the following weeks.',
    price: 320,
    durationMin: 40,
    image: '/clinic/treatment-skincare.png',
    featured: false,
    sortOrder: 5,
  },
  {
    slug: 'microneedling',
    name: 'Microneedling',
    category: 'Facial',
    tagline: 'Stimulate collagen',
    description:
      'A controlled micro-injury treatment that triggers the skin\'s natural wound-healing response, building fresh collagen and elastin. Exceptional for refining texture, softening acne scars, and improving elasticity — often paired with growth factors or PRP for amplified results.',
    price: 380,
    durationMin: 50,
    image: '/clinic/treatment-facial.png',
    featured: false,
    sortOrder: 6,
  },
  {
    slug: 'prp-therapy',
    name: 'PRP Therapy',
    category: 'Advanced',
    tagline: 'Platelet-rich plasma',
    description:
      'A regenerative treatment that isolates growth factors from your own platelets and reintroduces them to the skin or scalp. PRP accelerates tissue repair, improves tone and texture, and is renowned for natural facial rejuvenation and hair restoration — the ultimate in autologous, biologically-driven aesthetics.',
    price: 1100,
    durationMin: 60,
    image: '/clinic/treatment-injectables.png',
    featured: true,
    sortOrder: 7,
  },
  {
    slug: 'thread-lift',
    name: 'Thread Lift',
    category: 'Advanced',
    tagline: 'Non-surgical lifting',
    description:
      'A minimally invasive lift using biodegradable PDO threads to reposition sagging tissue along the midface, jawline, and neck. Beyond immediate structural lifting, the threads stimulate collagen for continued improvement — a refined alternative to surgery with subtle, elegant results.',
    price: 2400,
    durationMin: 90,
    image: '/clinic/treatment-injectables.png',
    featured: false,
    sortOrder: 8,
  },
  {
    slug: 'coolsculpting',
    name: 'CoolSculpting',
    category: 'Body',
    tagline: 'Freeze away fat',
    description:
      'A clinically-proven cryolipolysis treatment that targets and eliminates stubborn fat cells without surgery or downtime. Ideal for refining the abdomen, flanks, and submental area, results develop naturally over the following weeks as the body gently processes the treated fat cells.',
    price: 750,
    durationMin: 60,
    image: '/clinic/treatment-laser.png',
    featured: false,
    sortOrder: 9,
  },
  {
    slug: 'laser-hair-removal',
    name: 'Laser Hair Removal',
    category: 'Laser',
    tagline: 'Silky smooth skin',
    description:
      'A diode laser hair removal treatment tailored to your skin tone and hair type for safe, progressive, lasting reduction. Each session targets follicles in the active growth phase, gradually delivering smooth, low-maintenance skin across the face and body.',
    price: 250,
    durationMin: 30,
    image: '/clinic/treatment-laser.png',
    featured: false,
    sortOrder: 10,
  },
  {
    slug: 'medical-facial',
    name: 'Medical Facial',
    category: 'Facial',
    tagline: 'Physician-grade',
    description:
      'A fully bespoke physician-grade facial combining diagnostic skin analysis, medical-strength actives, and targeted modalities such as LED, microcurrent, or mild peels. Designed around your concerns on the day, it delivers clinical results with the sensory luxury of a spa ritual.',
    price: 420,
    durationMin: 60,
    image: '/clinic/treatment-facial.png',
    featured: false,
    sortOrder: 11,
  },
  {
    slug: 'skin-consultation',
    name: 'Skin Consultation',
    category: 'Consultation',
    tagline: 'Bespoke assessment',
    description:
      'A comprehensive one-to-one consultation with one of our physicians, including digital skin analysis, concern mapping, and a fully personalised treatment and skincare roadmap. The starting point of every Lumière journey — informed, unhurried, and entirely tailored to you.',
    price: 150,
    durationMin: 30,
    image: '/clinic/treatment-skincare.png',
    featured: true,
    sortOrder: 12,
  },
];

interface DoctorSeed {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
  specialty: string;
  experienceY: number;
  sortOrder: number;
}

const doctors: DoctorSeed[] = [
  {
    name: 'Dr. Elena Marchetti',
    title: 'Medical Director, MD',
    credentials: 'Board-Certified Dermatologist, FAAD',
    bio: 'Dr. Marchetti leads Lumière with eighteen years of clinical excellence and a fellowship in cosmetic dermatology from a leading European institute. Renowned for her subtle, anatomy-led approach to injectables, she has trained physicians internationally and is frequently cited in aesthetic media for her philosophy of “invisible refinement.” Patients describe her consults as the most thorough they have ever experienced.',
    image: '/clinic/doctor-1.png',
    specialty: 'Cosmetic Dermatology',
    experienceY: 18,
    sortOrder: 1,
  },
  {
    name: 'Dr. James Whitford',
    title: 'Senior Dermatologist, MD PhD',
    credentials: 'Board-Certified, Mohs Surgery',
    bio: 'Dr. Whitford brings twenty-two years of expertise in laser and procedural dermatology, with a doctorate investigating fractional laser tissue interactions. He oversees our laser and surgical dermatology programme, combining rigorous clinical science with an artist\'s eye for facial harmony. His patients value his calm precision and the rare depth of explanation he offers at every stage of care.',
    image: '/clinic/doctor-2.png',
    specialty: 'Laser & Surgical Dermatology',
    experienceY: 22,
    sortOrder: 2,
  },
  {
    name: 'Sofia Renaud',
    title: 'Lead Aesthetician',
    credentials: 'Licensed Medical Aesthetician, LE',
    bio: 'Sofia has spent twelve years perfecting the artistry of clinical aesthetics, with advanced training in Hydrafacial, chemical peels, microneedling, and bespoke skincare protocols. Her signature facials blend medical efficacy with a deeply restorative sensory experience, and she personally designs the at-home regimens that extend every in-clinic result. Her loyal clientele return as much for her warmth as for her transformative touch.',
    image: '/clinic/doctor-3.png',
    specialty: 'Clinical Aesthetics',
    experienceY: 12,
    sortOrder: 3,
  },
];

interface ReviewSeed {
  name: string;
  rating: number;
  treatment: string;
  text: string;
  location: string;
}

const reviews: ReviewSeed[] = [
  {
    name: 'Isabelle Laurent',
    rating: 5,
    treatment: 'Dermal Fillers',
    text: 'I have been to several clinics across Paris and New York, and Lumière is simply in a league of its own. Dr. Marchetti understood exactly the refined result I wanted — refreshed, never “done.” Six weeks on, my cheeks look like the best version of myself. The entire experience, from consult to follow-up, was flawless.',
    location: 'New York, NY',
  },
  {
    name: 'Marcus Chen',
    rating: 5,
    treatment: 'Laser Resurfacing',
    text: 'Dr. Whitford walked me through every detail of the laser resurfacing process before we began. As someone with acne scarring for over a decade, I was cautious, but the results have genuinely transformed my confidence. The clinic feels less like a medical office and more like a private atelier.',
    location: 'Los Angeles, CA',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    treatment: 'Hydrafacial',
    text: 'Sofia\'s Hydrafacial is the single best facial I have ever had — and I have tried many. My skin glowed for weeks afterward, and she designed a home regimen that has completely changed its texture. Booking my next three sessions without hesitation.',
    location: 'London, UK',
  },
  {
    name: 'Olivia Hartman',
    rating: 4,
    treatment: 'Botulinum Toxin',
    text: 'A discreet, elegant clinic with a genuinely personalised approach. The treatment itself was quick and comfortable, and the results appeared exactly as promised — soft, natural, and lifted. The only reason for four stars rather than five is that I wish they had Saturday morning appointments, though I understand why they do not.',
    location: 'Chicago, IL',
  },
  {
    name: 'Daniel Okafor',
    rating: 5,
    treatment: 'PRP Therapy',
    text: 'I came to Lumière for PRP therapy to address early hair thinning. Eight months in, the difference is remarkable and entirely my own biology at work. Dr. Marchetti is honest, warm, and never once tried to upsell. This is what real medical aesthetics should feel like.',
    location: 'Toronto, ON',
  },
  {
    name: 'Camille Dubois',
    rating: 5,
    treatment: 'Skin Consultation',
    text: 'The consultation alone was worth every cent. For the first time, a physician mapped out my skin concerns with genuine diagnostic precision and gave me a realistic, staged plan rather than pushing treatments. I left feeling informed and respected — and my skin has never looked better since following their guidance.',
    location: 'Montréal, QC',
  },
];

async function main() {
  console.log('🌱 Lumière Clinic — seeding database...\n');

  // ---- CLEAR ALL TABLES ----
  console.log('🧹 Clearing existing data...');
  await db.review.deleteMany({});
  await db.contactMessage.deleteMany({});
  await db.newsletter.deleteMany({});
  await db.booking.deleteMany({});
  await db.doctor.deleteMany({});
  await db.service.deleteMany({});
  console.log('   ✓ All tables cleared\n');

  // ---- INSERT SERVICES ----
  console.log(`✨ Inserting ${services.length} services...`);
  for (const s of services) {
    await db.service.create({ data: s });
  }
  console.log('   ✓ Services inserted\n');

  // ---- INSERT DOCTORS ----
  console.log(`🩺 Inserting ${doctors.length} doctors...`);
  for (const d of doctors) {
    await db.doctor.create({ data: d });
  }
  console.log('   ✓ Doctors inserted\n');

  // ---- INSERT REVIEWS ----
  console.log(`💬 Inserting ${reviews.length} reviews...`);
  for (const r of reviews) {
    await db.review.create({
      data: { ...r, featured: true },
    });
  }
  console.log('   ✓ Reviews inserted\n');

  // ---- VERIFY COUNTS ----
  const serviceCount = await db.service.count();
  const doctorCount = await db.doctor.count();
  const reviewCount = await db.review.count();

  console.log('========== SEED COMPLETE ==========');
  console.log(`  Services : ${serviceCount}`);
  console.log(`  Doctors  : ${doctorCount}`);
  console.log(`  Reviews  : ${reviewCount}`);
  console.log('====================================\n');
}

main()
  .then(async () => {
    await db.$disconnect();
    console.log('✅ Seed script finished successfully.');
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('❌ Seed script failed:', err);
    await db.$disconnect();
    process.exit(1);
  });
