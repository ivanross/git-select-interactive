#!/usr/bin/env node
"use strict";

const React = require("react");
const Ink = require("ink");
const meow = require("meow");
const Git = require("simple-git");
const App = require("import-jsx")("./ui");
const { parseWorkingDirFiles, parseIndexFiles } = require("./utils");

const cli = meow({
  help: `
  Usage
    
    $ git select-interactive [--reset]
    
  Select files to stage with interactive cli.
  Use arrows to navigate, <space> to select, <a> to 
  toggle all.

  Options
  
    --reset, -r     Select files to unstage.
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
const dir = process.cwd();
const git = Git(dir);

git.status((err, res) => {
  if (err) return;

  const files = (reset ? parseIndexFiles : parseWorkingDirFiles)(res.files);

  if (files.length === 0) return;

  Ink.render(React.createElement(App, { files, git, reset }));
});
