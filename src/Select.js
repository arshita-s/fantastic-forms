import React, { useState, useRef } from 'react';
import ReactSelect from 'react-select';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { useField } from '@unform/core';
import makeAnimated from 'react-select/animated';

export default function Select({ name, options, isMulti,...rest }) {

  
  const [selectedOpt, setSelectedOpt] = useState([]);
  const animatedComponents = makeAnimated();
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField} = useField(name);
  
  
  function handleChange(event) {
    setSelectedOpt(event);
    console.log(selectedOpt);
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        let temp = [];
        for (var i=0; i < event.length; i++) temp.push(event[i]);
        return temp;
      }
    });
  }

  const customStyles ={
    valueContainer: (provided) => ({
      ...provided,
      overflow: isVisible
    }),
    container: (provided) => ({
      ...provided,
      animation: "slide-top 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      marginBottom: "40px",
      minWidth: "50vh",
      "z-index": "1"
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0px",
      borderColor: state.hover ? "#444" : "#ddd"
    })
  }
  if(isMulti === 'true') {
    return (
      <ReactSelect
        components={animatedComponents}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        isSearchable={false}
        isMulti
        onChange={handleChange}
        value={selectedOpt}
        styles={customStyles}
      />
    );
  }
  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      options={options}
      isSearchable='false'
      onChange={handleChange}
      value={
        options.filter(function(option) {
        return option === selectedOpt;
      })}
      styles={customStyles}
    />
  );
};