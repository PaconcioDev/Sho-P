import './DeleteAccount.css';
import { useContext } from 'react';
import { useUser } from '../../hooks/useUser.js';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useToggle } from '../../hooks/useToggle.js';
import { useMessage } from '../../hooks/useMessage.js';
import { FormInput } from '../FormInput/FormInput.jsx';
import { PasswordBtn } from '../PasswordBtn/PasswordBtn.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { UsersService } from '../../services/users.js';
import { Message } from '../Message/Message.jsx';

function DeleteAccount () {
  const { user } = useContext(ProductsContext);
  const { logout } = useUser();

  const { isOn: isPasswordOn, handleState: togglePassword } = useToggle();
  const { message, onEvent } = useMessage();

  const password = useFormInput({ type: !isPasswordOn ? 'password' : 'text' });

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const data = await UsersService.delete(
        user.id,
        user.token,
        password.value
      );
      if (data.error) {
        const errorMessage = data.error[0]?.message || data.error;
        onEvent(errorMessage);
        setTimeout(() => {
          onEvent();
        }, 10000);
        return;
      }

      onEvent(data);
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className='modal__text'>
        Please type your password.
      </p>
      <form className='modal__form' onSubmit={handleDelete}>
        <PasswordBtn
          isPasswordOn={isPasswordOn}
          togglePassword={togglePassword}
        >
          <FormInput
            {...password}
            placeholder='Password'
            required
          />
        </PasswordBtn>
        {
          (message.isActive && !message.info.message) &&
            <Message isError>{message.info}</Message>
        }
        {
          (message.isActive && message.info.message) &&
            <Message>{message.info.message}</Message>
        }
        <div className='security__btn-container'>
          <SubmitBtn isWarn>DELTE ACCOUNT</SubmitBtn>
        </div>
      </form>
    </>
  );
}

export { DeleteAccount };
