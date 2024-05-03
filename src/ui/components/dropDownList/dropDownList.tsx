import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import styles from './index.module.css';

interface DropdownListProps {
  data: string[];
  type: string;
  placeholder: string;
}

function DropdownList({ data, type, placeholder }: DropdownListProps) {
  const [value, setValue] = useState<string>(placeholder);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.container}>
      <Autocomplete
        value={value}
        onChange={(event, newValue: string | null): void => {
          if (newValue != null) setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={data}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label={type} />}
      />
    </div>
  );
}

export { DropdownList };
