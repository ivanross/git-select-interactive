import path from 'path'
// prettier-ignore
const statusMap = {
  "?": "untracked",
   M : "modified",
   D : "deleted",
   R : "renamed",
   A : "new_file",
};

// prettier-ignore
export const status2hex = {
  untracked: {"yellow": true},
  modified:  {"green":  true},
  deleted:   {"red":    true},
  renamed:   {"green":  true},
  new_file:  {"yellow": true}
};

export function cleanString(str: string) {
  let s = ''
  for (const c of str) {
    if (c === '"') continue
    if (c === ' ') s += '\\ '
    else s += c
  }
  return s
}

export function relativePath(from: string, to: string, filePath: string) {
  return path.relative(to, path.join(from, filePath))
}

export function getWorkingDirFilesInfo(files) {
  return files
    .filter(({ working_dir }) => statusMap[working_dir])
    .map(({ path, working_dir, insertions, deletions }) => ({
      path,
      status: statusMap[working_dir],
      insertions,
      deletions,
    }))
}

export function getIndexFilesInfo(files) {
  return files
    .filter(({ index, working_dir }) => statusMap[index] && working_dir !== '?')
    .map(({ path, index, insertions, deletions }) => ({
      path,
      status: statusMap[index],
      insertions,
      deletions,
    }))
}

export function parseFilesInfo(filesInfo, from?, to?) {
  return filesInfo
    .reduce((acc, { path, status, insertions, deletions }) => {
      const fromCWDFiles = path.split(' -> ').map(p => relativePath(from, to, p))
      const files = fromCWDFiles.map(cleanString)

      acc.push({
        files,
        status,
        label: fromCWDFiles.join(' -> '),
        value: fromCWDFiles.join(' -> '),
        insertions: insertions || 0,
        deletions: deletions || 0,
      })
      return acc
    }, [])
    .sort((a, b) => a.label.localeCompare(b.label))
}
