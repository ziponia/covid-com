import { PrismaClient } from "@prisma/client"

const _log: any[] = []

// process.env.NODE_ENV !== "production" && _log.push("query")

let prisma: PrismaClient | null = null

if (!prisma) {
  console.log("[Database Connection] Install")
  prisma = new PrismaClient({
    log: _log,
  })
}
export default prisma!
