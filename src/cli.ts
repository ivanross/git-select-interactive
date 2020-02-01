#!/usr/bin/env node
import React from 'react'
import * as Ink from 'ink'
import meow from 'meow'
import Git from 'simple-git'
import App from './App'
import { parseFilesInfo, getWorkingDirFilesInfo, getIndexFilesInfo } from './utils'

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
let rootDir: string
let changeInfo: any
const git = Git(workingDir)

function mergeBy(arr1, arr2, match) {
  return arr1.map(obj => {
    const mergeable = arr2.find(o => match(obj, o))
    return mergeable ? { ...obj, ...mergeable } : obj
  })
}

const DEFAULT_ERROR_MESSAGE = 'fatal: not a git repository (or any of the parent directories): .git'

git
  .checkIsRepo((err, isRepo) => {
    if (isRepo) return
    console.error(DEFAULT_ERROR_MESSAGE)
    process.exit(128)
  })
  .revparse(['--show-toplevel'], (err, res) => (rootDir = res))
  .diffSummary(reset ? ['--cached'] : [], (err, res) => (changeInfo = res.files))
  .status((err, res) => {
    const getFilesInfo = reset ? getIndexFilesInfo : getWorkingDirFilesInfo
    const mergedFile = mergeBy(res.files, changeInfo, (file1, file2) => file1.path === file2.file)
    const fileInfo = getFilesInfo(mergedFile)
    const files = parseFilesInfo(fileInfo, rootDir, workingDir)
    if (files.length === 0) return

    Ink.render(React.createElement(App, { files, git, reset }))
  })
