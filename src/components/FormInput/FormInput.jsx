import './FormInput.css';

function FormInput ({ id, name, type, placeholder, onChange, required }) {
  return (
    <input
      className='form__input'
      id={id} name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}

export { FormInput };
