const React = require("react");
const { Box, Color, useInput } = require("ink");

const ChangesIndicator = ({ insertions, deletions }) => {
  if (!insertions && !deletions) return null;
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
  );
};

module.exports = ChangesIndicator;
