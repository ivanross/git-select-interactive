import React from 'react'
import * as Utils from './test-utils'
import * as InkTest from 'ink-testing-library'
import { TestRawMode } from '../src/components/Test'

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

// describe('ink-test-libray', () => {
//   it('test raw mode', () => {
//     const { lastFrame } = InkTest.render(React.createElement(TestRawMode))

//     expect(lastFrame()).toEqual('RAW MODE SUPPORTED')
//   })
// })

describe('ls', () => {
  it('should print files', async () => {
    // try {
    const res = await Utils.execute('./build/cli.js')
    // await delay(1000)
    expect(res).toBe('aaaa')
    // } catch (err) {
    // console.log({ err })
    // }
  })
})
