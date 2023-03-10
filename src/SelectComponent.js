import React, { useState } from 'react';

function SelectComponent({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(option => option.value === selectedValue);
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  }

  return (
    <select value={selectedOption.value} onChange={handleOptionChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default SelectComponent;
