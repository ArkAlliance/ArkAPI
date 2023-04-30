import {
  spawn,
  SpawnOptionsWithStdioTuple,
  StdioNull,
  StdioPipe,
} from 'node:child_process'
import fs from 'node:fs/promises'
import { logger } from 'pkg/logger'

const log = logger.child({ name: 'importer-exec' })

// execCommand executes a command and logs the output
// per line using the logger.
export async function execCommand(
  cmd: string,
  options: Omit<
    SpawnOptionsWithStdioTuple<StdioNull, StdioPipe, StdioPipe>,
    'shell' | 'stdio'
  > = {},
) {
  log.info('executing command: %s', cmd)

  const proc = spawn(cmd, {
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  })

  proc.stdout.on('data', (data) => {
    for (const line of data.toString().split('\n')) {
      log.info('stdout: %s', line)
    }
  })

  proc.stderr.on('data', (data) => {
    for (const line of data.toString().split('\n')) {
      log.info('stderr: %s', line)
    }
  })

  return new Promise<void>((resolve, reject) => {
    proc.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`exit code: ${code}`))
      }
    })
  })
}

export async function accessible(dir: string) {
  try {
    await fs.access(dir, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch {
    return false
  }
}
