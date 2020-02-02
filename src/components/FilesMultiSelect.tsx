import React, { useState } from 'react'
import { Box, Color, Text, useInput } from 'ink'
import { status2hex } from '../lib/simple-git-parse'
import ChangesIndicator from './ChangesIndicator'

import chalk from 'chalk'
import figures from 'figures'
import logSymbols from 'log-symbols'
import MultiSelect, { Indicator } from 'ink-multi-select'
import TextInput from 'ink-text-input'
import { FileInfo } from '../lib/simple-git-parse'
import { useList } from '../hooks/useList'

const CheckBox = ({ isSelected }: { isSelected: boolean }) => (
  <Box marginRight={1}>
    <Text>{isSelected ? figures.circleFilled : figures.circle}</Text>
  </Box>
)

function highlight(label: string, search: string) {
  if (!search) return label
  const start = label.toLowerCase().indexOf(search.toLowerCase())
  if (start === -1) return label
  const match = label.slice(start, start + search.length)
  return label.replace(match, chalk.inverse(match))
}

const Element = (w: number, search: string) => ({
  label,
  status,
  insertions,
  deletions,
  binary,
  after,
  before,
}: FileInfo) => {
  const color = status2hex[status]

  return (
    <Box>
      <Color {...color}>
        <Box width={w}>{status}:</Box>
        <Box>{highlight(label, search)}</Box>
      </Color>
      <ChangesIndicator
        insertions={insertions}
        deletions={deletions}
        binary={binary}
        after={after}
        before={before}
      />
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
  const [searchFocus, setSearchFocus] = useState(false)
  const [search, setSearch] = useState('')
  const resetSearch = () => setSearch('')

  const w = maxStatusWidth(files)
  const height = Math.min(20, files.length)
  const trimmedSearch = search.trim()
  const searchVisible = searchFocus || trimmedSearch

  const filteredFiles = trimmedSearch
    ? files.filter(file => file.label.toLowerCase().includes(trimmedSearch.toLowerCase()))
    : files

  useInput(input => {
    if ((input === 'a' || input === 'A') && !searchFocus) {
      if (filteredFiles.every(f => selected.includes(f))) {
        set(selected.filter(f => !filteredFiles.includes(f)))
      } else {
        set(selected.concat(filteredFiles.filter(f => !selected.includes(f))))
      }
    }

    if (input === 'f' && !searchFocus) setSearchFocus(true)
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

      <Box height={height}>
        <MultiSelect
          items={filteredFiles}
          selected={selected}
          itemComponent={Element(w + 5, trimmedSearch)}
          checkboxComponent={CheckBox}
          indicatorComponent={!searchFocus ? Indicator : () => <Box width={2} />}
          onSubmit={!trimmedSearch ? onSubmit : resetSearch}
          onSelect={add}
          onUnselect={remove}
          limit={height}
          focus={!searchFocus}
        />
      </Box>

      <Box marginTop={1} height={1}>
        {searchVisible ? (
          <Box marginRight={1}>
            <Color gray={!searchFocus}>
              {figures.pointerSmall}{' '}
              <TextInput
                value={search}
                onChange={setSearch}
                focus={searchFocus}
                onSubmit={() => setSearchFocus(false)}
              />
            </Color>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
