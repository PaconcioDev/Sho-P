// import { useContext } from 'react';
// import { ProductsContext } from '../../context/ProductsContext.jsx';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useToggle } from '../../hooks/useToggle.js';
import { FormInput } from '../FormInput/FormInput.jsx';
import { PasswordBtn } from '../PasswordBtn/PasswordBtn.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';

// TODO: HANDLE DELTE
function DeleteAccount () {
  // const { user } = useContext(ProductsContext);
  const { isOn: isPasswordOn, handleState: togglePassword } = useToggle();

  const password = useFormInput({ type: !isPasswordOn ? 'password' : 'text' });

  return (
    <>
      <p className='modal__text'>
        Please type your password.
      </p>
      <form>
        <PasswordBtn
          isPasswordOn={isPasswordOn}
          togglePassword={togglePassword}
        >
          <FormInput
            {...password}
            placeholder='Password'
          />
        </PasswordBtn>
        <div className='security__btn-container'>
          <SubmitBtn isWarn>DELTE ACCOUNT</SubmitBtn>
        </div>
      </form>
    </>
  );
}

export { DeleteAccount };
