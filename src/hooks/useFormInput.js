import { useState } from 'react';

function useFormInput ({ type }) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    const trimValue = e.target.value.trim();
    setValue(trimValue);
  };

  return {
    type,
    value,
    onChange
  };
}

export { useFormInput };
