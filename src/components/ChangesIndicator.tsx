import React from 'react'
import { Box, Color } from 'ink'

interface Props {
  insertions?: number
  deletions?: number
}
export default function ChangesIndicator({ insertions, deletions }: Props) {
  if (!insertions && !deletions) return null
  return (
    <Box marginLeft={1}>
      (
      {insertions ? (
        <Box>
          +<Color green>{insertions}</Color>
        </Box>
      ) : null}
      {deletions ? (
        <Box>
          -<Color red>{deletions}</Color>
        </Box>
      ) : null}
      )
    </Box>
  )
}
