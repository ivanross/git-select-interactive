import {
  FileStatusSumary,
  DiffResultTextFile,
  DiffResultBinaryFile,
} from 'simple-git/typings/response'
import { relativePath, cleanString, mergeBy } from './utils'

// prettier-ignore
const statusMap = {
  "?": "untracked",
  "M": "modified",
  "D": "deleted",
  "R": "renamed",
  "A": "new_file",
};

interface FileChangesInfo extends Partial<DiffResultTextFile & DiffResultBinaryFile> {}
export type FileInfo = ReturnType<typeof parse>[number]
export function parse(
  statusInfo: FileStatusSumary[],
  changesInfo: FileChangesInfo[],
  from: string,
  to: string,
  reset: boolean
) {
  const mergedInfo = mergeBy(statusInfo, changesInfo, ({ path }, { file }) => path === file)

  const filteredInfo = mergedInfo
    .filter(
      !reset
        ? ({ working_dir }) => statusMap[working_dir]
        : ({ index, working_dir }) => statusMap[index] && working_dir !== '?'
    )
    .map(info => {
      const status: string = statusMap[!reset ? info.working_dir : info.index]
      const fromCWDFiles = info.path.split(' -> ').map(p => relativePath(from, to, p))
      const files = fromCWDFiles.map(cleanString)
      const label = files.join(' -> ')

      return {
        status,
        files,
        label,
        value: label,
        insertions: info.insertions ?? 0,
        deletions: info.deletions ?? 0,
      }
    })

  return filteredInfo.sort((a, b) => a.label.localeCompare(b.label))
}
