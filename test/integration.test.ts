import React from 'react'
import * as u from './test-utils'

describe('ls', () => {
  it('should print files', async () => {
    u.execute('cd', ['test'])
    const ps = u.execute('./build/cli.js')
    await u.delay(1000)
    ps.write(u.keys.space)
    await u.delay(100)
    ps.write(u.keys.enter)

    const status = u.execute('git', ['status'])
    await u.delay(1000)
    expect(status.output).toMatchInlineSnapshot(`
      "Changes to be committed:
        (use \\"git reset HEAD <file>...\\" to unstage)

      	[32mnew file:   index.js[m
      	[32mmodified:   package.json[m
      	[32mmodified:   src/cli.ts[m
      	[32mmodified:   test/integration.test.ts[m
      	[32mmodified:   test/test-utils.ts[m
      	[32mmodified:   yarn.lock[m

      Changes not staged for commit:
        (use \\"git add <file>...\\" to update what will be committed)
        (use \\"git checkout -- <file>...\\" to discard changes in working directory)

      	[31mmodified:   test/integration.test.ts[m

      "
    `)
  })
})
