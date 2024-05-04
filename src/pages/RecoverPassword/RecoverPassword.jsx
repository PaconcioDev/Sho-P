import './RecoverPassword.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessage } from '../../hooks/useMessage.js';
import { useFormInput } from '../../hooks/useFormInput.js';
import { AuthService } from '../../services/auth.js';
import { Message } from '../../components/Message/Message.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Layout } from '../../components/Layout/Layout.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';

// TODO : see password
function RecoverPassword () {
  const { token } = useParams();
  const navigate = useNavigate();

  //* On Chage
  const newPassword = useFormInput({ type: 'password' });
  const confirmPassword = useFormInput({ type: 'password' });

  //* On Submit
  const { message, onEvent } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.value !== confirmPassword.value) {
      onEvent('Passwords not matching');
      return;
    }

    try {
      const data = await AuthService.recoverPassword(token, newPassword.value);

      if (data.error) {
        const errorMessage = data.error[0]?.message || 'Your link has expired';
        onEvent(errorMessage);
        return;
      }

      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title='Recover your password'>
      <FormBox>
        <form className='recover__form' onSubmit={handleSubmit}>
          <h3 className='recover__text'>Enter a new password</h3>
          <label htmlFor='recoverPassword'>Password</label>
          <FormInput
            {...newPassword}
            id='recoverPassword'
            name='newPassword'
            placeholder='New Password'
            required
          />
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <FormInput
            {...confirmPassword}
            id='passwordConfirmation'
            name='confirmPassword'
            placeholder='Confirm Password'
            required
          />
          {message.isActive && <Message isError>{message.info}</Message>}
          <SubmitBtn text='SUBMIT' extraStyle={{ alignSelf: 'center' }} />
        </form>
      </FormBox>
    </Layout>
  );
}

export { RecoverPassword };
