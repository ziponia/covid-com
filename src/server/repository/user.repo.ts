import prisma from "@covid/server/prisma"

const findUserById = async (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  })
}

export default {
  findUserById,
}
