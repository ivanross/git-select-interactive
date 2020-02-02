import React from 'react'
import FilesMultiSelect from './components/FilesMultiSelect'
import Summary from './components/Summary'
import { flatMap } from './lib/utils'
import { SimpleGit } from 'simple-git/promise'
import { FileInfo } from './lib/simple-git-parse'

interface Props {
  git: SimpleGit
  files: FileInfo[]
  reset: boolean
}

export default function UI({ files, git, reset }: Props) {
  const [submitted, setSubmitted] = React.useState<FileInfo[]>([])

  const handleFilesSubmit = async (items: FileInfo[]) => {
    if (items.length === 0) return

    const fileNames = flatMap(items, ({ files }) => files.reverse())

    if (reset) await git.reset(fileNames)
    else await git.add(fileNames)

    setSubmitted(items)
  }

  return submitted.length === 0 ? (
    <FilesMultiSelect files={files} onSubmit={handleFilesSubmit} reset={reset} />
  ) : (
    <Summary files={submitted} reset={reset} />
  )
}
