import { PrismaClient } from "@prisma/client";

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prismadb = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma