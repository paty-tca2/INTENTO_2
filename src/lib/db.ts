import { PrismaClient } from '@prisma/client'

// Function to create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Define the type for the prisma client singleton
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// Create a global object for prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// Create the prisma instance
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// Assign the prisma instance to global object in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
