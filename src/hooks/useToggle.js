import { useState } from 'react';

function useToggle (initialState = false) {
  const [isOn, setIsON] = useState(initialState);

  const handleState = () => setIsON(!isOn);
  const manualOff = () => setIsON(false);
  const manualOn = () => setIsON(true);

  return {
    isOn,
    handleState,
    manualOff,
    manualOn
  };
}

export { useToggle };
