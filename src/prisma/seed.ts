import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'john@admin.com' },
        update: {},
        create: {
            id: '1',
            email: 'john@admin.com',
            name: 'John Doe',
            password: 'admin'
      },
  })

  const property = await prisma.property.upsert({
    where: { id: '2' },
    update: {},
    create: {
        id: '2',
        name: 'Casa do campo',
        address: 'Rua das Mariposas, 3895',
        description: 'Bela e espaçosa residência no meio do mato.',
        image: 'ba4bcf20-2548-48ea-9e4b-bed9efaf6caa0d5155351e3e9e6c4c7fbd151083bb07.jpg',
        userId: '1'
    },
  })

  const tenant = await prisma.tenant.upsert({
    where: { id: '3' },
    update: {},
    create: {
        id: '3',
        name: 'Luke Skywalker',
        email: 'luke@email.com',
        userId: '1',
        propertyId: '2'
    },
  })

  const rental = await prisma.rental.upsert({
    where: { id: '1' },
    update: {},
    create: {
        checkin: new Date(),
        checkout: new Date(),
        userId: '1',
        propertyId: '2',
        tenantId: '3'
    },
  })

  console.log({ user, property, tenant, rental })
}

main()