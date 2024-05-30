import { ArrowIcon } from '../../icons/ArrowIcon';
import './SliderArrow.css';

function SliderArrow ({ direction, onClick }) {
  return (
    <button
      className={`slider__btn ${
        direction ? 'slider__btn--next' : 'slider__btn--prev'
      }`}
      onClick={onClick}
    >
      <ArrowIcon />
    </button>
  );
}

export { SliderArrow };
