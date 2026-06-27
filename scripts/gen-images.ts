import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/clinic';

interface ImgJob {
  name: string;
  size: string;
  prompt: string;
}

const jobs: ImgJob[] = [
  {
    name: 'hero-interior.png',
    size: '1344x768',
    prompt:
      "Luxurious modern aesthetic dermatology clinic interior, soft warm natural lighting, rose gold and cream tones, minimalist elegant design, marble accents, fresh orchids, floor to ceiling windows, editorial architectural photography, high-end medical spa, serene sophisticated atmosphere, no people, ultra detailed, professional",
  },
  {
    name: 'doctor-1.png',
    size: '768x1344',
    prompt:
      "Professional editorial portrait of a confident female dermatologist in her 40s wearing a crisp white lab coat, warm natural lighting, soft cream background, elegant approachable expression, high-end clinic branding, shoulders up, beauty editorial photography",
  },
  {
    name: 'doctor-2.png',
    size: '768x1344',
    prompt:
      "Professional editorial portrait of a distinguished male dermatologist in his 50s wearing a white lab coat, warm natural lighting, soft cream background, confident trustworthy expression, high-end clinic branding, shoulders up, beauty editorial photography",
  },
  {
    name: 'doctor-3.png',
    size: '768x1344',
    prompt:
      "Professional editorial portrait of a friendly female aesthetician in her 30s wearing elegant cream medical attire, warm soft lighting, blush pink background, warm approachable smile, high-end spa branding, shoulders up, beauty editorial photography",
  },
  {
    name: 'treatment-injectables.png',
    size: '1024x1024',
    prompt:
      "Elegant close-up of a woman's smooth glowing cheek and jawline, rose gold lighting, luxury skincare aesthetic, editorial beauty photography, flawless radiant skin, soft focus background, no text",
  },
  {
    name: 'treatment-laser.png',
    size: '1024x1024',
    prompt:
      "Modern aesthetic laser treatment device in a luxury clinic, rose gold and white, soft lighting, professional medical equipment, clean minimalist, editorial product photography, no text",
  },
  {
    name: 'treatment-facial.png',
    size: '1024x1024',
    prompt:
      "Luxurious facial treatment in progress, woman lying down with hydrating facial mask, serene spa setting, soft pink lighting, fresh flowers, high-end medical spa, editorial photography, peaceful",
  },
  {
    name: 'treatment-skincare.png',
    size: '1024x1024',
    prompt:
      "Elegant arrangement of luxury skincare serum bottles in rose gold and cream tones on a marble surface, soft natural light, fresh botanicals, editorial product photography, high-end cosmetics, no text",
  },
  {
    name: 'spa-room.png',
    size: '1344x768',
    prompt:
      "Serene luxury treatment room in a high-end aesthetic clinic, treatment bed with crisp white linens, soft warm lighting, rose gold fixtures, fresh orchids, large window with natural light, minimalist elegant design, editorial interior photography, no people",
  },
  {
    name: 'skin-after.png',
    size: '1024x1024',
    prompt:
      "Extreme macro close-up of flawless radiant glowing skin, dewy healthy complexion, soft natural lighting, editorial beauty photography, macro skin texture, natural beauty, no makeup",
  },
  {
    name: 'skin-before.png',
    size: '1024x1024',
    prompt:
      "Extreme macro close-up of skin texture with fine lines and slight uneven tone, natural lighting, editorial beauty photography, macro skin texture, realistic, mature skin",
  },
];

async function gen(prompt: string, size: string, outPath: string) {
  const zai = await ZAI.create();
  const response = await zai.images.generations.create({ prompt, size });
  const b64 = response.data[0].base64;
  fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
  console.log('saved', outPath);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const succeeded: string[] = [];
  const failed: { name: string; error: string }[] = [];

  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.name);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
      console.log(`[${job.name}] already exists, skipping`);
      succeeded.push(outPath);
      continue;
    }
    try {
      console.log(`\n[${job.name}] generating (${job.size})...`);
      await gen(job.prompt, job.size, outPath);
      succeeded.push(outPath);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.error(`[${job.name}] FAILED:`, msg);
      failed.push({ name: job.name, error: msg });
    }
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Succeeded (${succeeded.length}/${jobs.length}):`);
  for (const p of succeeded) console.log('  -', p);
  if (failed.length) {
    console.log(`\nFailed (${failed.length}):`);
    for (const f of failed) console.log(`  - ${f.name}: ${f.error}`);
  } else {
    console.log('\nAll images generated successfully!');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
