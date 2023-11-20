/* eslint-disable react/prop-types */
import Select from 'react-select';
import { dropboxStyles, tabletStyles } from './style';
import React, { useEffect, useState } from 'react';


export default function Dropdown({ options, placeholder, selectedOption, setSelectedOption }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (value) => {
    setSelectedOption(value);
  }

  return (
    <div className='max-w-[304px] w-full text-lg text-black'>
      <Select
        styles={(screenWidth > 768) ? dropboxStyles : tabletStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isSearchable={false}
      />
    </div>
  )
}


export function MultiDropdown({ options, placeholder, selectedOption, setSelectedOption }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (value) => {
    setSelectedOption(value);
  }

  return (
    <div className='max-w-[304px] w-full text-lg text-black z-[100]'>
      <Select
        styles={(screenWidth > 768) ? dropboxStyles : tabletStyles}
        onChange={handleChange}
        options={options}
        value={selectedOption}
        isSearchable={false}
        isMulti
      />
    </div>
  )
}