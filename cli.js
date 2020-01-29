#!/usr/bin/env node
"use strict";
const React = require("react");
const Ink = require("ink");
const meow = require("meow");
const Git = require("simple-git");
const App = require("import-jsx")("./ui");
const {
  parseFilesInfo,
  getWorkingDirFilesInfo,
  getIndexFilesInfo
} = require("./utils");

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
      type: "boolean",
      alias: "h"
    },
    version: {
      type: "boolean",
      alias: "v"
    },
    reset: {
      type: "boolean",
      alias: "r"
    }
  }
});
const { reset } = cli.flags;
const workingDir = process.cwd();
let rootDir;
const git = Git(workingDir);

const DEFAULT_ERROR_MESSAGE =
  "fatal: not a git repository (or any of the parent directories): .git";

git
  .checkIsRepo((err, isRepo) => {
    if (isRepo) return;
    console.log(DEFAULT_ERROR_MESSAGE);
    process.exit(128);
  })
  .revparse(["--show-toplevel"], (err, res) => (rootDir = res))
  .status((err, res) => {
    const getFilesInfo = reset ? getIndexFilesInfo : getWorkingDirFilesInfo;
    const fileInfo = getFilesInfo(res.files);
    const files = parseFilesInfo(fileInfo, rootDir, workingDir);
    if (files.length === 0) return;

    Ink.render(React.createElement(App, { files, git, reset }));
  });
