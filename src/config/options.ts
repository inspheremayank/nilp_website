interface Option {
    value: string;
    label: string;
    options?: any;
  }
  const age: Option[] = [
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
  ];
  
  const id_type: Option[] = [
    { value: 'Driving License', label: 'Driving License' },
    { value: 'Labour Card', label: 'Labour Card' },
    { value: 'MGNREGA Job Card', label: 'MGNREGA Job Card' },
    { value: 'NPR Smart Card', label: 'NPR Smart Card' },
    { value: 'PAN Card', label: 'PAN Card' },
    { value: 'Passport', label: 'Passport' },
    { value: 'Prisoner ID', label: 'Prisoner ID' },
    { value: 'Ration Card', label: 'Ration Card' },
    { value: 'Student ID Card', label: 'Student ID Card' },
    { value: 'VOTER ID', label: 'VOTER ID' },
  ];
  
  const social: Option[] = [
    { value: 'General', label: 'General' },
    { value: 'Minority', label: 'Minority' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
  ];
  
  const professionOption: Option[] = [
    {
      value: 'Agriculture/Animal Husbandry & Dairy',
      label: 'Agriculture/Animal Husbandry & Dairy',
    },
    { value: 'Any other Occupation', label: 'Any other Occupation' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Contract Employee', label: 'Contract Employee' },
    { value: 'Daily Wager', label: ' Daily Wager' },
    { value: 'Garments/Fashion Industry', label: 'Garments/Fashion Industry' },
    { value: 'Self Employed', label: 'Self Employed' },
    {
      value: 'Technician/Technical personnel',
      label: 'Technician/Technical personnel',
    },
    { value: 'Vendors', label: 'Vendors' },
  ];