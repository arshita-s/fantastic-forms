import React, { useState, useEffect, useRef } from 'react';
import ReactSelect from 'react-select';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { useField } from '@unform/core';

export default function Select({ name, options, ...rest }) {

  
  const [selectedOpt, setSelectedOpt] = useState("Yes");
  
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  
  
  
  function handleChange(event) {
    setSelectedOpt(event);
    console.log(event);
    console.log(event['value']);
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        return event['value']
      }
    });
  }

  /*useEffect(() => {
    console.log(selectedOpt['value']);
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value"
    });
  }, [fieldName, selectedOpt, registerField, rest.isMulti]);*/

  const customStyles ={
    valueContainer: (provided) => ({
      ...provided,
      overflow: isVisible
    }),
    container: (provided) => ({
      ...provided,
      animation: "slide-top 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      marginBottom: "25px",
      minWidth: "50vh",
      "z-index": "1"
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0px",
      borderColor: state.hover ? "#444" : "#ddd"
    })
  }
  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      options={options}
      onChange={handleChange}
      value={
        options.filter(function(option) {
        return option === selectedOpt;
      })}
      styles={customStyles}
      theme="neutral90"
    />
  );
};