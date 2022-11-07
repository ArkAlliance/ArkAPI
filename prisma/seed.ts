import { PrismaClient } from '@prisma/client'

console.log('seed: connecting to database...')

const prisma = new PrismaClient()

async function main() {
  await prisma.character.deleteMany({})
  await prisma.character.createMany({
    data: [
      {
        id: 'char_285_medic2',
        name: 'Lancet-2',
        description:
          '恢复友方单位生命，且不受<@ba.kw>部署数量</>限制，但再部署时间极长',
      },
      {
        id: 'char_197_poca',
        name: '早露',
        description: '优先攻击重量最重的敌人',
      },
    ],
  })

  console.log('seed: created characters')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => process.exit())
