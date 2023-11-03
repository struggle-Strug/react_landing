export const dropboxStyles = {
  option: (provided,) => ({
    ...provided,
    fontSize: '16px',
    borderRadius: "10px"
  }),
  control: (provided) => ({
    ...provided,
    fontSize: '16px',
    borderRadius: "0px"
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    fontSize: '16px',
    borderRadius: "10px"
  }),
  '@media (max-width: 768px)': {
    option: (provided) => ({
      ...provided,
      fontSize: '14px', // Adjust the font size for screens with a width of 768px or less
    borderRadius: "40px"
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '14px', // Adjust the font size for screens with a width of 768px or less
      borderRadius: "40px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      fontSize: '14px', // Adjust the font size for screens with a width of 768px or less
      borderRadius: "40px",
    }),
  },
};