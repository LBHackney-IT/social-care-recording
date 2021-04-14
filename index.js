const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const main = async () => {
  await prisma.submission.findMany()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

module.exports = main
