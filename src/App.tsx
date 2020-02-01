import React from 'react'
import FilesMultiSelect from './FilesMultiSelect'
import Summary from './Summary'

const flatMap = (arr, f) => arr.reduce((acc, el) => [...acc, ...f(el)], [])

export default function App({ files, git, reset }) {
  const [submitted, setSubmitted] = React.useState([])

  const handleFilesSubmit = items => {
    if (items.length === 0) return

    const fileNames = flatMap(items, ({ files }) => files)

    if (reset) git.reset(fileNames, () => setSubmitted(items))
    else git.add(fileNames, () => setSubmitted(items))
  }

  return submitted.length === 0 ? (
    <FilesMultiSelect files={files} onSubmit={handleFilesSubmit} reset={reset} />
  ) : (
    <Summary files={submitted} reset={reset} />
  )
}
