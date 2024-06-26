import { useState } from 'react';

function useFormInput ({ type, initialState = '' }) {
  const [value, setValue] = useState(initialState);

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
