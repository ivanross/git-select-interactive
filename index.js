#!/usr/bin/env node
"use strict";

const React = require("react");
const Ink = require("ink");
const App = require("import-jsx")("./ui");
const Git = require("simple-git");
const { parseFiles } = require("./utils");

const dir = process.cwd();
const git = Git(dir);

git.status((err, res) => {
  if (err) return;

  const files = parseFiles(res.files);

  if (files.length === 0) return;

  Ink.render(React.createElement(App, { files, git }));
});
