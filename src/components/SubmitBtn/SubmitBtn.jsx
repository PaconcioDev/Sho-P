import './SubmitBtn.css';

function SubmitBtn ({ type = 'submit', extraStyle, isWarn, handleClick, disabled = false, children }) {
  return (
    <button
      type={type}
      className={`submit-btn ${isWarn ? 'submit-btn--red' : ''}`}
      style={extraStyle}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { SubmitBtn };
