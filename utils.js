"use strict";
const path = require("path");
// prettier-ignore
const statusMap = {
  "?": "untracked",
   M : "modified",
   D : "deleted",
   R : "renamed",
   A : "new_file",
};

// prettier-ignore
module.exports.status2hex = {
  untracked: {"yellow": true},
  modified:  {"green":  true},
  deleted:   {"red":    true},
  renamed:   {"green":  true},
  new_file:  {"yellow": true}
};

function cleanString(str) {
  let s = "";
  for (const c of str) {
    if (c === '"') continue;
    if (c === " ") s += "\\ ";
    else s += c;
  }
  return s;
}

module.exports.cleanString = cleanString;

function relativePath(from, to, filePath) {
  return path.relative(to, path.join(from, filePath));
}

module.exports.relativePath = relativePath;

module.exports.getWorkingDirFilesInfo = function getWorkingDirFilesInfo(files) {
  return files
    .filter(({ working_dir }) => statusMap[working_dir])
    .map(({ path, working_dir }) => ({ path, status: statusMap[working_dir] }));
};

module.exports.getIndexFilesInfo = function getIndexFilesInfo(files) {
  return files
    .filter(({ index, working_dir }) => statusMap[index] && working_dir !== "?")
    .map(({ path, index }) => ({ path, status: statusMap[index] }));
};

module.exports.parseFilesInfo = function parseFilesInfo(filesInfo, from, to) {
  return filesInfo
    .reduce((acc, { path, status }) => {
      const fromCWDFiles = path
        .split(" -> ")
        .map(p => relativePath(from, to, p));
      const files = fromCWDFiles.map(cleanString);

      acc.push({
        files,
        status,
        label: fromCWDFiles.join(" -> "),
        value: fromCWDFiles.join(" -> ")
      });
      return acc;
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label));
};
