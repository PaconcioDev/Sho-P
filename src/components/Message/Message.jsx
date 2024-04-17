import './Message.css';

function Message ({ children, isError }) {
  return (
    <span className={`message ${isError ? 'message--error' : ''}`}>
      {children}
    </span>

  );
}

export { Message };
