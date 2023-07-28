/* eslint-disable react/prop-types */
import Select from 'react-select';
import { dropboxStyles } from './style';


export default function Dropdown ({ options, placeholder, selectedOption, setSelectedOption }){

  const handleChange = (value) => {
    setSelectedOption(value);
  }

  return (
    <div className='text-lg text-black'>
      <Select
        styles={dropboxStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isSearchable={false}
      />
    </div>
  )
}