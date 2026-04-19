import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Vacancies ────────────────────────────────────────────────
  await prisma.vacancy.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'vac-001',
        title: 'Senior React Developer',
        department: 'Digital Financial Services',
        location: 'Kathmandu (Remote-friendly)',
        type: 'Full-time',
        level: 'Senior',
        description: 'Build next-generation fintech frontends for our banking and wallet platforms. Work with TypeScript, React, and modern tooling on production systems used by millions.',
        requirements: ['5+ years React', 'TypeScript proficiency', 'Experience with financial apps', 'REST/GraphQL APIs'],
        niceToHave: ['React Native experience', 'Fintech domain knowledge'],
        active: true,
      },
      {
        id: 'vac-002',
        title: 'Backend Engineer — Node.js / Go',
        department: 'Platform Engineering',
        location: 'Kathmandu / Remote',
        type: 'Full-time',
        level: 'Senior',
        description: 'Design and build high-throughput payment processing systems, settlement engines, and microservices for fintech and e-governance platforms.',
        requirements: ['Node.js or Go', 'Distributed systems', 'PostgreSQL / Redis', 'REST API design'],
        niceToHave: ['Payment systems experience', 'Kafka / event streaming'],
        active: true,
      },
      {
        id: 'vac-003',
        title: 'AI/ML Engineer',
        department: 'AI & Data',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        description: 'Develop and productionise ML models for fraud detection, merchant risk scoring, and signature verification.',
        requirements: ['Python / PyTorch or TensorFlow', 'MLOps experience', 'Financial data modelling'],
        niceToHave: ['Computer vision', 'LLM fine-tuning'],
        active: true,
      },
      {
        id: 'vac-004',
        title: 'Business Development Manager — Middle East',
        department: 'Sales & Partnerships',
        location: 'Dubai, UAE',
        type: 'Full-time',
        level: 'Senior',
        description: 'Drive growth across the GCC for Innovation Next\'s fintech and e-governance solutions.',
        requirements: ['5+ years B2B sales in tech', 'UAE/GCC market experience', 'Fintech or GovTech knowledge'],
        niceToHave: ['Arabic language skills', 'Existing banking relationships'],
        active: true,
      },
    ],
  })

  // ── Blog Posts ───────────────────────────────────────────────
  await prisma.blogPost.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'post-001',
        title: 'What it actually takes to build a national payment switch',
        slug: 'building-national-payment-switch',
        excerpt: 'From licensing with the central bank to PCI DSS certification — the operational reality of deploying financial infrastructure at national scale.',
        content: '# Building a National Payment Switch\n\nBuilding national payment infrastructure is fundamentally different from building a consumer app...',
        category: 'Fintech',
        tags: ['payment-switch', 'fintech', 'infrastructure', 'pci-dss'],
        authorName: 'Innovation Next Team',
        authorRole: 'Technology Team',
        featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
        published: true,
        featured: true,
        readTime: 8,
        publishedAt: new Date('2026-04-10'),
      },
      {
        id: 'post-002',
        title: 'Designing for 15 million citizens: lessons from the Nagarik App',
        slug: 'citizen-app-design-principles',
        excerpt: 'Offline-first UX, USSD fallback, and multi-ministry interoperability — the design decisions that made Nepal\'s citizen super-app work for everyone.',
        content: '# Designing for 15 Million Citizens\n\nWhen you\'re building for an entire nation, every design decision carries weight...',
        category: 'E-Governance',
        tags: ['e-governance', 'citizen-app', 'ux', 'nepal'],
        authorName: 'Innovation Next Team',
        authorRole: 'Product Team',
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
        published: true,
        featured: true,
        readTime: 6,
        publishedAt: new Date('2026-03-28'),
      },
      {
        id: 'post-003',
        title: 'AI fraud detection in emerging market payment systems',
        slug: 'ai-in-fintech-fraud-detection',
        excerpt: 'Why traditional ML models fail for QR and mobile money in low-data environments — and what actually works in production.',
        content: '# AI Fraud Detection in Emerging Markets\n\nStandard fraud detection models trained on Western card data fail dramatically...',
        category: 'AI & ML',
        tags: ['ai', 'fraud-detection', 'fintech', 'machine-learning'],
        authorName: 'Innovation Next Team',
        authorRole: 'AI Team',
        featuredImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
        published: true,
        featured: false,
        readTime: 7,
        publishedAt: new Date('2026-03-15'),
      },
    ],
  })

  // ── Case Studies ─────────────────────────────────────────────
  await prisma.caseStudy.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'cs-001',
        title: 'Building Nepal\'s National Citizen Super-App',
        slug: 'nagarik-app-government-nepal',
        client: 'Government of Nepal',
        industry: 'Government',
        domain: 'E-Governance',
        challenge: 'Nepal\'s government operated dozens of fragmented digital portals — one per ministry, none interoperable — leaving citizens navigating a maze of disconnected services.',
        solution: 'We designed and built the Nagarik App — a unified citizen super-app covering national ID, PAN, voter card, driving licence, vaccination certificates, vehicle tax, and municipality services — accessible via a single login on Android and iOS.',
        results: JSON.stringify([
          { metric: 'Citizens served', value: '15M+', description: 'On the national platform' },
          { metric: 'Service domains', value: '7+', description: 'Ministry departments integrated' },
          { metric: 'Launch timeline', value: '< 12 months', description: 'From contract to nationwide rollout' },
        ]),
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Biometric SDK', 'QR Engine'],
        duration: '10 months',
        featuredImage: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=1200&q=80',
        published: true,
        featured: true,
        publishedAt: new Date('2026-04-01'),
      },
    ],
  })

  console.log('✅ Seed complete')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
