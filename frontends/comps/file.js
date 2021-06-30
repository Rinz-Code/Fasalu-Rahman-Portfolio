/*import React, { useState } from "react";
import Select from "react-select";

const options = [
  { label: "Option 1", value: 1 ,id:1},
  { label: "Option 2", value: 2 ,id:2},
  { label: "Option 3", value: 3 ,id:3},
  { label: "Option 4", value: 4 ,id:4},
  { label: "Option 5", value: 5 ,id:5},
  { label: "Option 6", value: 6 ,id:6},
  { label: "Option 7", value: 7 ,id:7}
];
function File({options}) {

  const [checked,setChecked] = useState(false);
  const [values,setValues] = useState([]);

  const onChangeCheckbox = e => {
      const isChecked = !checked;
      setChecked(isChecked);
      setValues(isChecked ? options : values)
  };
  const onChange = opt => {
    const allOptionsSelected = opt.length === options.length;
    setChecked(allOptionsSelected ? true : false);
    setValues(opt);
  };

  return (
    <div className="App">
      <Select
          isMulti
          onChange={onChange}
          options={options}
          value={values}
      />
      <p>
        <input
          onChange={onChangeCheckbox}
          type="checkbox"
          id="selectAll"
          value="selectAll"
          checked={checked}
          />
      <label for="selectAll">Select all</label>
      </p>
    </div>
  );
}*/