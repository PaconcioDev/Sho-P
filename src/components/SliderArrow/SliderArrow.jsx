import './SliderArrow.css';

function SliderArrow ({ direction, onClick }) {
  return (
    <button
      className={`slider__btn ${
        direction ? 'slider__btn--next' : 'slider__btn--prev'
      }`}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        fill='currentColor'
        viewBox='0 0 16 16'
      >
        <path d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708' />
      </svg>
    </button>
  );
}

export { SliderArrow };
