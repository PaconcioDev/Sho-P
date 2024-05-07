import './ChangePassword.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useToggle } from '../../hooks/useToggle.js';
import { Layout } from '../../components/Layout/Layout.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { ProductsContext } from '../../context/ProductsContext';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';
import { useMessage } from '../../hooks/useMessage.js';
import { Message } from '../../components/Message/Message.jsx';
import { PasswordBtn } from '../../components/PasswordBtn/PasswordBtn.jsx';
import { AuthService } from '../../services/auth.js';

function ChangePassword () {
  const { user } = useContext(ProductsContext);

  //* Inputs
  const {
    isOn: isCurrentPasswordOn,
    handleState: toggleCurrentPassword
  } = useToggle();
  const {
    isOn: isNewPasswordOn,
    handleState: toggleNewPassword
  } = useToggle();
  const {
    isOn: isConfirmPasswordOn,
    handleState: toggleConfirmPassword
  } = useToggle();

  const currentPassword = useFormInput({
    type: !isCurrentPasswordOn
      ? 'password'
      : 'text'
  });
  const newPassword = useFormInput({
    type: !isNewPasswordOn
      ? 'password'
      : 'text'
  });
  const confirmNewPassword = useFormInput({
    type: !isConfirmPasswordOn
      ? 'password'
      : 'text'
  });

  const { message, onEvent } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.value !== confirmNewPassword.value) {
      onEvent('Passwords not matching');
      return;
    }

    try {
      const data = await AuthService.changePassword(
        user.token,
        user.id,
        currentPassword.value,
        newPassword.value
      );

      if (data.error) {
        const errorMessage = data.error[0]?.message || data.error;
        onEvent(errorMessage);
        setTimeout(() => {
          onEvent();
        }, 3000);
        return;
      }

      onEvent(data);
      setTimeout(() => {
        navigate('/account/my-account');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title='My Account'>
      <FormBox>
        <form className='change-password__form' onSubmit={handleSubmit}>
          <h3 className='change-password__text'>Change your password</h3>
          <label htmlFor='currentPassword'>Enter your current password</label>
          <FormInput
            {...currentPassword}
            id='currentPassword'
            placeholder='Current password'
            required
          />
          <PasswordBtn
            togglePassword={toggleCurrentPassword}
            isPasswordOn={isCurrentPasswordOn}
            topPosition='8.85rem'
            rightPosition='3.5rem'
          />
          <hr className='change-password__hr' />
          <label htmlFor='newPassword'>
            Enter your new password
          </label>
          <FormInput
            {...newPassword}
            id='newPassword'
            placeholder='New password'
            required
          />
          <PasswordBtn
            togglePassword={toggleNewPassword}
            isPasswordOn={isNewPasswordOn}
            topPosition='16.50rem'
            rightPosition='3.5rem'
          />
          <label htmlFor='confirmNewPassword'>
            Confirm your new password
          </label>
          <FormInput
            {...confirmNewPassword}
            id='confirmNewPassword'
            placeholder='Confirm new password'
            required
          />
          <PasswordBtn
            togglePassword={toggleConfirmPassword}
            isPasswordOn={isConfirmPasswordOn}
            topPosition='22.15rem'
            rightPosition='3.5rem'
          />
          {
            (message.isActive && !message.info.message) &&
              <Message isError>{message.info}</Message>
          }
          {
            (message.isActive && message.info.message) &&
              <Message>{message.info.message}</Message>
          }
          <SubmitBtn text='SUBMIT' extraStyle={{ alignSelf: 'center' }} />
        </form>
      </FormBox>
    </Layout>
  );
}

export { ChangePassword };
