"use strict";
const React = require("react");
const { Static, Box, Color, Text } = require("ink");
const { status2hex } = require("./utils");
const ChangesIndicator = require("import-jsx")("./changes-indicator");

const Summary = ({ files, reset }) => {
  return (
    <Static marginTop={1} flexDirection="column">
      <Box paddingBottom={1}>
        <Text>{reset ? "unstaged" : "added"} files: </Text>
      </Box>

      {files.map(({ label, status, insertions, deletions }) => (
        <Box flexDirection="row" paddingLeft={2} key={label}>
          <Color {...status2hex[status]}>
            {status.charAt(0).toUpperCase()}
          </Color>
          <Text> {label}</Text>
          <ChangesIndicator insertions={insertions} deletions={deletions} />
        </Box>
      ))}
    </Static>
  );
};

module.exports = Summary;
