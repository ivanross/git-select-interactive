import path from 'path'
import { spawn } from 'node-pty'

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

// Key codes
export const keys = {
  up: '\x1B\x5B\x41',
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  space: '\x20',
}

export function execute(processPath: string, args: string[] = []) {
  let resolve: (value?: unknown) => void
  let reject: (error: Error) => void

  const exitPromise = new Promise((resolve2, reject2) => {
    resolve = resolve2
    reject = reject2
  })
  // console.log(process.env)
  const ps = spawn(processPath, args, {
    rows: 100,
    cwd: process.env.PWD || '',
  })

  const result = {
    write: (input: string) => ps.write(input),
    output: '',
    waitForExit: () => exitPromise,
  }

  ps.on('data', (data) => {
    result.output = data
  })

  ps.on('exit', (code) => {
    if (code === 0) {
      resolve()
      return
    }

    reject(new Error(`Process exited with non-zero exit code: ${code}`))
  })

  return result
}
