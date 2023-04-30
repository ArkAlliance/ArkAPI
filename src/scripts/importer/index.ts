import { PrismaClient } from '@prisma/client'

import fs from 'node:fs/promises'
import path from 'node:path'
import { logger } from 'pkg/logger'
import { imports } from 'scripts/importer/config'
import { accessible, execCommand } from 'scripts/importer/utils/exec'

const prisma = new PrismaClient()
const log = logger.child({ name: 'importer' })

async function cloneGitRepo(repo: string, clonePath: string) {
  if (await accessible(path.join(clonePath, '.git'))) {
    // Already cloned
    log.info('Pulling git repo %s to %s', repo, clonePath)
    await execCommand('git pull', { cwd: clonePath })
    return
  }

  await fs.rm(clonePath, { recursive: true })
  await fs.mkdir(clonePath, { recursive: true })

  log.info('Cloning git repo %s to %s', repo, clonePath)

  return execCommand(`git clone ${repo} ${clonePath}`)
}

async function main() {
  const repo = 'git@github.com:Kengxxiao/ArknightsGameData.git'
  const resourceBasePath = 'workspace/gamedata'
  await fs.mkdir(resourceBasePath, { recursive: true })

  await cloneGitRepo(repo, resourceBasePath)

  for (const task of imports) {
    const { servers, cls } = task

    for (const server of servers) {
      const importer = new cls({
        server,
        resourceBasePath,
        prisma,
      })

      await importer.import()
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect()
})
