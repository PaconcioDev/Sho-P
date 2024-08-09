import './FormInput.css';

function FormInput ({ id, name, type, value, placeholder, onChange, required, removeNumberArrows = false, disabled = false }) {
  return (
    <input
      className={`form__input ${disabled ? 'form__input--disabled' : ''} ${removeNumberArrows ? 'form__input--not-arrows' : ''}`}
      id={id} name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
}

export { FormInput };
