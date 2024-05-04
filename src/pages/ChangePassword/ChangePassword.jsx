import './ChangePassword.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormInput } from '../../hooks/useFormInput.js';
import { Layout } from '../../components/Layout/Layout.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { ProductsContext } from '../../context/ProductsContext';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';
import { useMessage } from '../../hooks/useMessage.js';
import { Message } from '../../components/Message/Message.jsx';
import { AuthService } from '../../services/auth.js';

// TODO : See password
function ChangePassword () {
  const { user } = useContext(ProductsContext);

  const currentPassword = useFormInput({ type: 'password' });
  const newPassword = useFormInput({ type: 'password' });
  const confirmNewPassword = useFormInput({ type: 'password' });

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
    <Layout title='Change your password'>
      <FormBox>
        <form className='change-password__form' onSubmit={handleSubmit}>
          <h3 className='change-password__text'>Enter your current password and then confirm your new password</h3>
          <label htmlFor='currentPassword'>Enter your current password</label>
          <FormInput
            {...currentPassword}
            id='currentPassword'
            placeholder='Current password'
            required
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
          <label htmlFor='confirmNewPassword'>
            Confirm your new password
          </label>
          <FormInput
            {...confirmNewPassword}
            id='confirmNewPassword'
            placeholder='Confirm new password'
            required
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
