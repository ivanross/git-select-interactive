import React from 'react'
import { Box, Color, Text, Static } from 'ink'
import { status2hex } from '../lib/simple-git-parse'
import ChangesIndicator from './ChangesIndicator'
import { FileInfo } from '../lib/simple-git-parse'
import { Action } from '../lib/types'

interface Props {
  files: FileInfo[]
  action: Action
}

const action2title: Record<Action, string> = {
  stage: 'added files',
  stash: 'stashed files',
  unstage: 'unstaged files',
}

export default function Summary({ files, action }: Props) {
  return (
    <Static>
      <Box paddingBottom={1} marginTop={1}>
        <Text>{action2title[action]}: </Text>
      </Box>

      {files.map(({ status, label, insertions, deletions, binary, after, before }) => (
        <Box flexDirection="row" paddingLeft={2} key={label}>
          <Color {...status2hex[status]}>{status.charAt(0).toUpperCase()}</Color>
          <Text> {label}</Text>
          <ChangesIndicator
            insertions={insertions}
            deletions={deletions}
            binary={binary}
            after={after}
            before={before}
          />
        </Box>
      ))}
    </Static>
  )
}
