import prisma from "@covid/server/prisma"

const findUserById = async (id: number) => {
  return prisma.users.findFirst({
    where: {
      id,
    },
  })
}

export default {
  findUserById,
}
