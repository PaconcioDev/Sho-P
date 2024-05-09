import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { useToggle } from '../../hooks/useToggle.js';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { FormInput } from '../FormInput/FormInput.jsx';
import { Message } from '../Message/Message.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { PasswordBtn } from '../PasswordBtn/PasswordBtn.jsx';

function LoginForm ({ toggle }) {
  const { login } = useUser();
  const navigate = useNavigate();

  const { isOn: isPasswordOn, handleState: togglePassword } = useToggle();

  const email = useFormInput({ type: 'email' });
  const password = useFormInput({ type: !isPasswordOn ? 'password' : 'text' });

  const {
    message: loginMessage,
    onEvent: onLoginEvent
  } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email: email.value.toLowerCase(), password: password.value });

      if (data.error) {
        onLoginEvent(data.error);
        return;
      }

      navigate('/products/all');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3 className='login__subtitle'>LOGIN</h3>
      <p className='login__text'>
        If you already have an account, please log in.
      </p>
      <form className='login__form' onSubmit={handleSubmit}>
        <FormInput
          {...email}
          name='email'
          placeholder='Email'
          required
        />
        <PasswordBtn
          togglePassword={togglePassword}
          isPasswordOn={isPasswordOn}
        >
          <FormInput
            {...password}
            name='password'
            placeholder='Password'
            required
          />
        </PasswordBtn>
        {loginMessage.isActive && <Message isError>{loginMessage.info}</Message>}
        <SubmitBtn extraStyle={{ width: 'inherit' }}>SIGN IN</SubmitBtn>
        <a
          className='login__recover-password'
          onClick={() => {
            toggle();
            onLoginEvent();
          }}
        >
          Forgot your password?
        </a>
      </form>
    </>
  );
}

export { LoginForm };
