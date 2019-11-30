"use strict";
const React = require("react");
const { Box, Color, Text } = require("ink");
const { default: MultiSelect } = require("ink-multi-select");

// prettier-ignore
const status2hex = {
  untracked: "#FFAA00",
  created:   "#FFAA00",
  deleted:   "#FF0000",
  modified:  "#AABB00",
  renamed:   "#AABB00"
};

// prettier-ignore
const status2label = {
  untracked: "created ",
  created:   "created ",
  deleted:   "deleted ",
  modified:  "modified",
  renamed:   "renamed "
};

const App = ({ files, git }) => {
  const [submitted, setSubmitted] = React.useState([]);

  const handleFilesSubmit = items => {
    if (items.length === 0) return;
    const fileNames = items.map(({ label }) => label);
    git.add(fileNames);
    setSubmitted(items);
  };
  return submitted.length === 0 ? (
    <MultiSelect
      items={files}
      itemComponent={Element}
      onSubmit={handleFilesSubmit}
    />
  ) : (
    <Summary files={submitted} />
  );
};

const Element = ({ label, status }) => {
  return (
    <Color hex={status2hex[status]}>
      {status2label[status]}: {label}
    </Color>
  );
};

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

module.exports = App;
