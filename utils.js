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

function pathFromCWD(from, to) {
  return function(filePath) {
    return path.relative(to, path.join(from, filePath));
  };
}

module.exports.pathFromCWD = pathFromCWD;

module.exports.parseWorkingDirFiles = function parseWorkingDirFiles(
  files,
  parse = x => x
) {
  return files
    .reduce((acc, { path, working_dir }) => {
      const status = statusMap[working_dir];
      if (!status) return acc;

      const fromCwd = parse(path);
      const fileName = cleanString(fromCwd);
      acc.push({
        files: [fileName],
        status,
        value: fromCwd,
        label: fromCwd
      });
      return acc;
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label));
};

module.exports.parseIndexFiles = function parseIndexFiles(
  files,
  parse = x => x
) {
  return files
    .reduce((acc, { path, index, working_dir }) => {
      const status = statusMap[index];
      if (!status || working_dir === "?") return acc;

      const fromCWDFiles = path.split(" -> ").map(parse);
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
