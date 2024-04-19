import { useState } from 'react';

function useToggle (initialState = false) {
  const [isOn, setIsON] = useState(initialState);

  const handleState = () => setIsON(!isOn);

  return {
    isOn,
    handleState
  };
}

export { useToggle };
