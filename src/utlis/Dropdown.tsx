'use client';
import React, { useState } from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
  {
    value: 'Andaman and Nicobar Islands',
    label: 'Andaman and Nicobar Islands',
  },
  { value: 'Chandigarh', label: 'Chandigarh' },
  {
    value: 'Daman and Diu',
    label: 'Daman and Diu',
  },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'Puducherry', label: 'Puducherry' },
];

const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = (selected: Option | null) => {
    setSelectedOption(selected);
  };

  return (
    <div className="">
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Select State"
      />
    </div>
  );
};

export default Dropdown;
