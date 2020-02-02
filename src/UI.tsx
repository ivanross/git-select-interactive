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

    const getFileNames = (items: FileInfo[]) => flatMap(items, ({ files }) => files.reverse())

    if (!reset) {
      const fileNames = getFileNames(items)
      await git.add(fileNames)
    } else {
      const deletedFiles = getFileNames(items.filter(({ status }) => status === 'deleted'))
      const fileNames = getFileNames(items.filter(({ status }) => status !== 'deleted'))
      if (deletedFiles.length) fileNames.push('--', ...deletedFiles)
      await git.reset(fileNames)
    }

    setSubmitted(items)
  }

  return submitted.length === 0 ? (
    <FilesMultiSelect files={files} onSubmit={handleFilesSubmit} reset={reset} />
  ) : (
    <Summary files={submitted} reset={reset} />
  )
}
