/**
 * Creates (or updates) the admin user.
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret ADMIN_NAME="Your Name" \
 *   npx ts-node src/scripts/seed-admin.ts
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email    = process.env.ADMIN_EMAIL    || 'admin@innovationnext.com'
  const password = process.env.ADMIN_PASSWORD || 'admin1234'
  const name     = process.env.ADMIN_NAME     || 'Admin'

  const passwordHash = await bcrypt.hash(password, 12)

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  })

  console.log(`✅ Admin user ready: ${admin.email} (id: ${admin.id})`)
  console.log(`   Default password: ${password} — change this in production!`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
