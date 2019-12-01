#!/usr/bin/env node
"use strict";

const React = require("react");
const Ink = require("ink");
const Git = require("simple-git");
const App = require("import-jsx")("./ui");
const { parseWorkingDirFiles } = require("./utils");

const dir = process.cwd();
const git = Git(dir);

git.status((err, res) => {
  if (err) return;

  const files = parseWorkingDirFiles(res.files);

  if (files.length === 0) return;

  Ink.render(React.createElement(App, { files, git }));
});
