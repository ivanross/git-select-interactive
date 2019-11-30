"use strict";
const React = require("react");
const { Color, useInput } = require("ink");
const { status2hex, status2label } = require("./utils");
const { default: MultiSelect } = require("ink-multi-select");

const Element = ({ label, status }) => (
  <Color hex={status2hex[status]}>
    {status2label[status]}: {label}
  </Color>
);

const FilesMultiSelect = ({ files, onSubmit }) => {
  const [selected, setSelected] = React.useState([]);
  useInput(input => {
    if (input === "a" || input === "A") {
      if (selected.length === files.length) setSelected([]);
      else setSelected(files);
    }
  });

  const handleSelect = item => {
    setSelected(selected => [...selected, item]);
  };

  const handleUnselect = item => {
    setSelected(selected => selected.filter(file => file.label !== item.label));
  };

  return (
    <MultiSelect
      items={files}
      selected={selected}
      itemComponent={Element}
      onSubmit={onSubmit}
      onSelect={handleSelect}
      onUnselect={handleUnselect}
    />
  );
};

module.exports = FilesMultiSelect;
