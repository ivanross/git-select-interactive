import React from 'react'
import { Box, Color } from 'ink'

export default function ChangesIndicator({ insertions, deletions }) {
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
