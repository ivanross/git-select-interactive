import React from 'react'
import { Box, Color } from 'ink'

function formatBytes(bytes: number, decimals = 0) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
interface Props {
  insertions: number
  deletions: number
  binary: boolean
  after: number
  before: number
}
export default function ChangesIndicator({ insertions, deletions, binary, before, after }: Props) {
  if (!binary && insertions | deletions)
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

  const changes = after - before
  if (binary && changes) {
    const color = { [changes > 0 ? 'green' : 'red']: true }
    const abs = Math.abs(changes)
    const sign = Math.sign(changes) > 0 ? '+' : '-'
    return (
      <Box marginLeft={1}>
        (BIN
        <Color {...color}>
          {' '}
          {sign}
          {formatBytes(abs)}
        </Color>
        )
      </Box>
    )
  }

  return <Box />
}
