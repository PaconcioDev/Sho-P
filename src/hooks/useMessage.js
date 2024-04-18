import { useState } from 'react';

function useMessage () {
  const [message, setMessage] = useState({ isActive: false, info: '' });

  const onEvent = (data) => {
    setMessage({ isActive: true, info: data });
  };

  return {
    message,
    onEvent
  };
}

export { useMessage };
