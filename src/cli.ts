#!/usr/bin/env node
import React from 'react'
import * as Ink from 'ink'
import meow from 'meow'
import Git, { SimpleGit } from 'simple-git/promise'
import App from './App'
import { parse } from './simple-git-parse'
import { DEFAULT_ERROR_MESSAGE } from './constants'

const cli = meow({
  help: `
  Usage
    
    $ git select-interactive [--reset]
    
  Select files to stage with interactive cli.
  Use arrows to navigate, <space> to select, <a> to 
  toggle all.

  Options
  
    --reset,   -r     Select files to unstage.
    --help,    -h     Show help
    --version, -v     Show version
`,
  autoHelp: true,
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
  },
})
const { reset } = cli.flags
const workingDir = process.cwd()

const git = Git(workingDir)

async function run(git: SimpleGit) {
  const isRepo = await git.checkIsRepo()
  if (!isRepo) {
    console.error(DEFAULT_ERROR_MESSAGE)
    process.exit(128)
  }

  const rootDir = await git.revparse(['--show-toplevel'])
  const changeInfo = (await git.diffSummary(reset ? ['--cached'] : [])).files
  const statusInfo = (await git.status()).files

  const files = parse(statusInfo, changeInfo, rootDir, workingDir, reset)
  if (files.length === 0) return

  Ink.render(React.createElement(App, { files, git, reset }))
}

run(git)
