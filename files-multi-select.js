"use strict";
const React = require("react");
const { Box, Color, useInput } = require("ink");
const { status2hex } = require("./utils");
const { default: MultiSelect } = require("ink-multi-select");

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
    <MultiSelect
      items={files}
      selected={selected}
      itemComponent={Element(w + 5)}
      onSubmit={onSubmit}
      onSelect={add}
      onUnselect={remove}
    />
  );
};

module.exports = FilesMultiSelect;
