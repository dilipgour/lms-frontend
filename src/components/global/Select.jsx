import React, { useState } from 'react';
import Select from 'react-select';


export default function CustomSelect({options,value,onChange}) {
  const [selectedOption, setSelectedOption] = useState(null);
const onSelect =(option)=>{
  onChange(option.value)
}
  return (
    <div>
      <Select
        defaultValue={value}
        onChange={onSelect}
        options={options}
      />
    </div>
  );
}