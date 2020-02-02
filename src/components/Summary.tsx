import React from 'react'
import { Box, Color, Text, Static } from 'ink'
import { status2hex } from '../lib/simple-git-parse'
import ChangesIndicator from './ChangesIndicator'
import { FileInfo } from '../lib/simple-git-parse'

interface Props {
  files: FileInfo[]
  reset: boolean
}

export default function Summary({ files, reset }: Props) {
  return (
    <Static>
      <Box paddingBottom={1} marginTop={1}>
        <Text>{reset ? 'unstaged' : 'added'} files: </Text>
      </Box>

      {files.map(({ label, status, insertions, deletions }) => (
        <Box flexDirection="row" paddingLeft={2} key={label}>
          <Color {...status2hex[status]}>{status.charAt(0).toUpperCase()}</Color>
          <Text> {label}</Text>
          <ChangesIndicator insertions={insertions} deletions={deletions} />
        </Box>
      ))}
    </Static>
  )
}
