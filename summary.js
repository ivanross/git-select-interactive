"use strict";
const React = require("react");
const { Box, Color, Text } = require("ink");
const { status2hex } = require("./utils");

const Summary = ({ files }) => {
  return (
    <Box flexDirection="column">
      <Box paddingBottom={1}>
        <Text>files added: </Text>
      </Box>

      {files.map(({ label, status }) => (
        <Box flexDirection="row" paddingLeft={2} key={label}>
          <Color hex={status2hex[status]}>
            {status.charAt(0).toUpperCase()}
          </Color>
          <Text> {label}</Text>
        </Box>
      ))}
    </Box>
  );
};

module.exports = Summary;
