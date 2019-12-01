"use strict";

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

module.exports.parseWorkingDirFiles = function parseWorkingDirFiles(files) {
  return files
    .reduce((acc, { path, index, working_dir }) => {
      const status = statusMap[working_dir];
      if (!status) return acc;

      const fileName = cleanString(path);
      acc.push({
        files: [fileName],
        status,
        value: path,
        label: path
      });
      return acc;
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label));
};

module.exports.parseIndexFiles = function parseIndexFiles(files) {
  return files
    .reduce((acc, { path, index, working_dir }) => {
      const status = statusMap[index];
      if (!status || working_dir === "?") return acc;

      const files = path.split(" -> ").map(cleanString);

      acc.push({ files, status, label: path, value: path });
      return acc;
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label));
};
