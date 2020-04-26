import React from 'react'
import { Box, Text, StdinContext } from 'ink'

export function TestRawMode() {
  return (
    <StdinContext.Consumer>
      {({ isRawModeSupported }) =>
        isRawModeSupported ? <Text>RAW MODE SUPPORTED</Text> : <Text>RAW MODE NOT SUPPORTED</Text>
      }
    </StdinContext.Consumer>
  )
}
