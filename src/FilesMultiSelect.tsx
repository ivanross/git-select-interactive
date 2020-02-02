import React from 'react'
import { Box, Color, Text, useInput } from 'ink'
import { status2hex } from './simple-git-parse'
import ChangesIndicator from './ChangesIndicator'

import figures from 'figures'
import logSymbols from 'log-symbols'
import MultiSelect from 'ink-multi-select'
import { FileInfo } from './simple-git-parse'
import { useList } from './useList'

const CheckBox = ({ isSelected }: { isSelected: boolean }) => (
  <Box marginRight={1}>
    <Text>{isSelected ? figures.circleFilled : figures.circle}</Text>
  </Box>
)

const Element = (w: number) => ({ label, status, insertions, deletions }: FileInfo) => {
  const color = status2hex[status]

  return (
    <Box>
      <Color {...color}>
        <Box width={w}>{status}:</Box>
        <Box>{label}</Box>
      </Color>
      <ChangesIndicator insertions={insertions} deletions={deletions} />
    </Box>
  )
}

const maxStatusWidth = (files: FileInfo[]) => {
  const arr = files.map(f => f.status.length)
  return Math.max(...arr)
}

interface Props {
  files: FileInfo[]
  onSubmit: (files: FileInfo[]) => void
  reset: boolean
}

export default function FilesMultiSelect({ files, onSubmit, reset }: Props) {
  const [selected, add, remove, set] = useList<FileInfo>([])

  const w = maxStatusWidth(files)

  useInput(input => {
    if (input === 'a' || input === 'A') {
      if (selected.length === files.length) set([])
      else set(files)
    }
  })

  return (
    <Box marginTop={1} flexDirection="column">
      <Box>
        <Box marginRight={1}>
          {logSymbols.info} Choose which file to {reset ? 'unstage' : 'stage'}.
        </Box>
        <Box>
          (Press <Color blue>{'<space>'}</Color> to select, <Color blue>{'<a>'}</Color> to toggle
          all)
        </Box>
      </Box>

      <Box>
        <Box marginLeft={4} width={w + 2}>
          <Text underline>status</Text>
        </Box>
        <Box marginLeft={4}>
          <Text underline>file</Text>
        </Box>
      </Box>

      <MultiSelect
        items={files}
        selected={selected}
        itemComponent={Element(w + 5)}
        checkboxComponent={CheckBox}
        onSubmit={onSubmit}
        onSelect={add}
        onUnselect={remove}
        limit={20}
      />
    </Box>
  )
}
