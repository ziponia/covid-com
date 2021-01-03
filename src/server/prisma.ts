import { PrismaClient } from "@prisma/client"

const _log: any[] = []

// process.env.NODE_ENV !== "production" && _log.push("query")

const prisma = new PrismaClient({
  log: _log,
})
export default prisma
