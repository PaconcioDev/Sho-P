import './SubmitBtn.css';

function SubmitBtn ({ type = 'submit', extraStyle, isWarn, handleClick, children }) {
  return (
    <button
      type={type}
      className={`submit-btn ${isWarn ? 'submit-btn--red' : ''}`}
      style={extraStyle}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export { SubmitBtn };
