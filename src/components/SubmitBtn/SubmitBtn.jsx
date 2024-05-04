import './SubmitBtn.css';

function SubmitBtn ({ text, extraStyle }) {
  return (
    <button type='submit' className='submit-btn' style={extraStyle}>
      {text}
    </button>
  );
}

export { SubmitBtn };
