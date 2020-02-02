import {
  FileStatusSumary,
  DiffResultTextFile,
  DiffResultBinaryFile,
} from 'simple-git/typings/response'
import { relativePath, cleanString, mergeBy } from './utils'
import { ValuesOf, Id, KeysOf } from './types'

// prettier-ignore
const statusMap = {
  "?": "untracked",
  "M": "modified",
  "D": "deleted",
  "R": "renamed",
  "A": "new_file",
} as const

// prettier-ignore
export const status2hex: Record<Status, { [k: string]: boolean }> = {
  untracked: {"yellow": true},
  modified:  {"green":  true},
  deleted:   {"red":    true},
  renamed:   {"green":  true},
  new_file:  {"yellow": true}
}

export type StatusIndex = KeysOf<typeof statusMap>
export type Status = ValuesOf<typeof statusMap>

export type FileStatusInfo = Id<FileStatusSumary & { working_dir: StatusIndex; index: StatusIndex }>
export type FileChangesInfo = Partial<DiffResultTextFile & DiffResultBinaryFile>
export type FileInfo = ReturnType<typeof parse>[number]

export function parse(
  statusInfo: FileStatusInfo[],
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
      const status = statusMap[!reset ? info.working_dir : info.index]
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
