#!/usr/bin/env node
import { execSync } from 'child_process'
import React from 'react'
import * as Ink from 'ink'
import meow from 'meow'
import Git, { SimpleGit } from 'simple-git/promise'
import UI from './UI'
import { parse, FileStatusInfo } from './lib/simple-git-parse'
import { DEFAULT_ERROR_MESSAGE } from './lib/constants'
import { Action } from './lib/types'

const cli = meow({
  autoHelp: false,
  flags: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    version: {
      type: 'boolean',
      alias: 'v',
    },
    reset: {
      type: 'boolean',
      alias: 'r',
    },
    stash: {
      type: 'boolean',
      alias: 's',
    },
  },
})
const { reset, stash, help } = cli.flags

if (help) {
  try {
    execSync('man git-select-interactive')
  } catch {
  } finally {
    process.exit(1)
  }
}

const action: Action = reset ? 'unstage' : stash ? 'stash' : 'stage'

const workingDir = process.cwd()

const git = Git(workingDir)

async function run(git: SimpleGit) {
  const isRepo = await git.checkIsRepo()
  if (!isRepo) {
    console.error(DEFAULT_ERROR_MESSAGE)
    process.exit(128)
  }

  const rootDir = await git.revparse(['--show-toplevel'])
  const { files: changeInfo } = await git.diffSummary(reset ? ['--cached'] : [])
  const { files: statusInfo } = await git.status()

  const files = parse(statusInfo as FileStatusInfo[], changeInfo, rootDir, workingDir, reset)
  if (files.length === 0) return

  Ink.render(React.createElement(UI, { files, git, action }))
}

run(git)
