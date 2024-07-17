import { useState } from 'react';

function useFormInput ({ type, initialState = '', trim = true }) {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    const finalValue = trim ? e.target.value.trim() : e.target.value;
    setValue(finalValue);
  };

  return {
    type,
    value,
    onChange
  };
}

export { useFormInput };
