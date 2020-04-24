import React from 'react'
import FilesMultiSelect from './components/FilesMultiSelect'
import Summary from './components/Summary'
import { flatMap } from './lib/utils'
import { SimpleGit } from 'simple-git/promise'
import { FileInfo } from './lib/simple-git-parse'
import { Action } from './lib/types'

interface Props {
  git: SimpleGit
  files: FileInfo[]
  action: Action
}

export default function UI({ files, git, action }: Props) {
  const [submitted, setSubmitted] = React.useState<FileInfo[]>([])

  const handleFilesSubmit = async (items: FileInfo[]) => {
    if (items.length === 0) return

    const getFileNames = (items: FileInfo[]) => flatMap(items, ({ files }) => files.reverse())

    if (action === 'unstage') {
      const deletedFiles = getFileNames(items.filter(({ status }) => status === 'deleted'))
      const fileNames = getFileNames(items.filter(({ status }) => status !== 'deleted'))
      if (deletedFiles.length) fileNames.push('--', ...deletedFiles)
      await git.reset(fileNames)
    } else if (action === 'stash') {
      const fileNames = getFileNames(items)
      await git.stash(['push', '--include-untracked', ...fileNames])
    } else {
      const fileNames = getFileNames(items)
      await git.add(fileNames)
    }

    setSubmitted(items)
  }

  return submitted.length === 0 ? (
    <FilesMultiSelect files={files} onSubmit={handleFilesSubmit} action={action} />
  ) : (
    <Summary files={submitted} action={action} />
  )
}
