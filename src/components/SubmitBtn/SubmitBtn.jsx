import './SubmitBtn.css';

function SubmitBtn ({ extraStyle, isWarn, children }) {
  return (
    <button
      type='submit'
      className={`submit-btn ${isWarn ? 'submit-btn--red' : ''}`}
      style={extraStyle}
    >
      {children}
    </button>
  );
}

export { SubmitBtn };
