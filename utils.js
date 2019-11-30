"use strict";

// prettier-ignore
const statusMap = {
  "?": "untracked",
   M : "modified",
   D : "deleted",
   R : "renamed"
};

module.exports.parseFiles = function parseFiles(files) {
  return files
    .reduce((acc, { path, index, working_dir }) => {
      const status = statusMap[working_dir];
      if (status !== undefined)
        acc.push({ path, status, value: path, label: path });
      return acc;
    }, [])
    .sort((a, b) => a.path.localeCompare(b.path));
};

// prettier-ignore
module.exports.status2hex = {
  untracked: {"yellow": true},
    deleted: {"red":    true},
   modified: {"green":  true},
    renamed: {"green":  true}
};
