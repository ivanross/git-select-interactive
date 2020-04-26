import { spawn, SpawnOptionsWithoutStdio } from 'child_process'
import concat from 'concat-stream'

export function execute(
  processPath: string,
  args: string[] = [],
  env?: SpawnOptionsWithoutStdio['env']
) {
  args = [processPath].concat(args)
  const childProcess = spawn('node', args, {
    env: { ...env, NODE_ENV: 'test', PATH: process.env.PATH },
    // stdio: 'inherit',
    // detached: false,
  })

  // childProcess.stdin.setEncoding('utf-8')
  // childProcess.stdin.setDefaultEncoding('utf-8')
  // console.log(childProcess)
  const promise = new Promise<string>((resolve, reject) => {
    childProcess.stderr!.once('data', (err) => {
      // console.log('childProcess.stderr')
      reject(err.toString())
    })
    childProcess.on('error', reject)
    childProcess.stdout!.pipe(
      concat((result) => {
        resolve(result.toString())
      })
    )
  })
  return promise
}
