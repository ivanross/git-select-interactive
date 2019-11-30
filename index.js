#!/usr/bin/env node
"use strict";

const React = require("react");
const Ink = require("ink");
const App = require("import-jsx")("./ui");
const Git = require("simple-git");

const dir = process.cwd();
const git = Git(dir);

git.status((err, res) => {
  if (err) return;
  const statusMap = {
    "?": "untracked",
    M: "modified",
    D: "deleted",
    R: "renamed"
  };

  const files = res.files
    .reduce((acc, { path, index, working_dir }) => {
      const status = statusMap[working_dir];
      if (status !== undefined)
        acc.push({ path, status, value: path, label: path });
      return acc;
    }, [])
    .sort((a, b) => a.path.localeCompare(b.path));

  if (files.length === 0) return;
  Ink.render(React.createElement(App, { files, git }));
});
