"use strict";
const React = require("react");
const { Box, Color, Text, useInput } = require("ink");
const { status2hex } = require("./utils");
const figures = require("figures");
const logSymbols = require("log-symbols");
const { default: MultiSelect } = require("ink-multi-select");

const CheckBox = ({ isSelected }) => (
  <Box marginRight={1}>
    <Text>{isSelected ? figures.circleFilled : figures.circle}</Text>
  </Box>
);

const Element = w => ({ label, status }) => {
  const color = status2hex[status];

  return (
    <Color {...color}>
      <Box width={w}>{status}:</Box> {label}
    </Color>
  );
};

function useList(arr) {
  const [state, setState] = React.useState(arr);

  const add = item => {
    setState(values => [...values, item]);
  };

  const remove = item => {
    setState(values => values.filter(value => value !== item));
  };

  return [state, add, remove, setState];
}

const maxStatusWidth = files => {
  const arr = files.map(f => f.status.length);
  return Math.max(...arr);
};

const FilesMultiSelect = ({ files, onSubmit }) => {
  const [selected, add, remove, set] = useList([]);

  const w = maxStatusWidth(files);

  useInput(input => {
    if (input === "a" || input === "A") {
      if (selected.length === files.length) set([]);
      else set(files);
    }
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Box marginRight={1}>{logSymbols.info} Choose which file to stage.</Box>
        <Box>
          (Press <Color blue>{"<space>"}</Color> to select,{" "}
          <Color blue>{"<a>"}</Color> to toggle all)
        </Box>
      </Box>

      <Box>
        <Box marginLeft={4} width={w + 2}>
          <Text underline>status</Text>
        </Box>
        <Box marginLeft={4}>
          <Text underline>file</Text>
        </Box>
      </Box>

      <MultiSelect
        items={files}
        selected={selected}
        itemComponent={Element(w + 5)}
        checkboxComponent={CheckBox}
        onSubmit={onSubmit}
        onSelect={add}
        onUnselect={remove}
      />
    </Box>
  );
};

module.exports = FilesMultiSelect;
