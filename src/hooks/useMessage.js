import { useState } from 'react';

function useMessage () {
  const [message, setMessage] = useState({ isActive: false, info: '' });

  const onEvent = (data) => {
    if (data) {
      setMessage({ isActive: true, info: data });
    } else {
      setMessage({ isActive: false, info: '' });
    }
  };

  return {
    message,
    onEvent
  };
}

export { useMessage };
