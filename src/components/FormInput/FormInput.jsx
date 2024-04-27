import './FormInput.css';

function FormInput ({ id, name, type, value, placeholder, onChange, required }) {
  return (
    <input
      className='form__input'
      id={id} name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}

export { FormInput };
