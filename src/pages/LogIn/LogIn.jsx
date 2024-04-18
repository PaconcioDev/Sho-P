import './LogIn.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { AuthService } from '../../services/auth';
import { Message } from '../../components/Message/Message.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { FormInput } from '../../components/FormInput/FormInput.jsx';

// TODO : useFormInput useMessage AND REFACTOR ASAP
function LogIn () {
  //* Login page
  const [showPassword, setShowPassword] = useState(false);
  const [isUser, setIsUser] = useState({ isUser: true, message: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    const formatPassword = value.trim();
    setPassword(formatPassword);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const formatEmail = value.trim();
    setEmail(formatEmail);
  };

  //* Login action
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });

      if (data.error) {
        setIsUser({ isUser: false, message: data.error });
      } else {
        setIsUser({ isUser: true, message: '' });

        navigate('/products/all');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //* Password recovery
  const [passwordRecover, setPasswordRecover] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState({ email: '' });

  const handleRecoverEmailChange = (e) => {
    const { value } = e.target;
    const formatEmail = value.toLowerCase().trim();
    setRecoverEmail({ email: formatEmail });
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    try {
      const data = await AuthService.sendPasswordEmail(recoverEmail);

      if (data.error) {
        setIsUser({ isUser: false, message: data.error });
      } else {
        setIsUser({ isUser: true, message: data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='login__title'>My Account</h2>
      <main className='login'>
        <section className='login__box-container'>
          <FormBox>
            <h3 className='login__subtitle'>
              {!passwordRecover ? 'LOGIN' : 'Recover your password'}
            </h3>
            <p className='login__text'>
              {
                !passwordRecover
                  ? 'If you already have an account, please log in.'
                  : 'We will send you an email to recover your password'
              }
            </p>
            {!passwordRecover
              ? (
                <form className='login__form' onSubmit={handleLogin}>
                  <FormInput
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={handleEmailChange}
                    required
                  />
                  <FormInput
                    name='password'
                    type={!showPassword ? 'password' : 'text'}
                    placeholder='Password'
                    onChange={handlePasswordChange}
                    required
                  />
                  <div
                    className='login__password-button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {
                    showPassword
                      ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 16 16'
                        >
                          <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z' />
                          <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0' />
                        </svg>
                        )
                      : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 16 16'
                        >
                          <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z' />
                          <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829' />
                          <path d='M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z' />
                        </svg>
                        )
                  }
                  </div>
                  {isUser.isUser === false && (
                    <Message isError>{isUser.message}</Message>
                  )}
                  <button className='login__button' type='submit'>
                    SIGN IN
                  </button>
                  <p>
                    <a
                      className='login__recover-password'
                      onClick={() => {
                        setPasswordRecover(true);
                        setIsUser({ isUser: true, message: '' });
                      }}
                    >
                      Forgot your password?
                    </a>
                  </p>
                </form>
                )
              : (
                <form
                  className='login__form recover__form'
                  onSubmit={handleRecover}
                >
                  {(isUser.isUser === false) &&
                    (
                      <Message isError>
                        {isUser.message}
                      </Message>
                    )}
                  {(isUser.isUser === true && isUser.message) && (
                    <Message isError={false}>
                      {isUser.message}
                    </Message>
                  )}
                  <FormInput
                    type='email'
                    placeholder='Email'
                    onChange={handleRecoverEmailChange}
                    required
                  />
                  <button
                    className='login__button'
                    type='submit'
                  >
                    SUBMIT
                  </button>
                  <a
                    className='login__recover-password'
                    onClick={() => {
                      setPasswordRecover(false);
                      setIsUser({ isUser: true, message: '' });
                    }}
                  >
                    Cancel
                  </a>
                </form>
                )}
          </FormBox>
          <FormBox>
            <h3 className='login__subtitle'>NEW CUSTOMER?</h3>
            <p className='login__text'>
              Registering for this site allows you to purchase items and to
              access to your orders and your order status. Creating an account
              only takes a few minutes.
            </p>
            <NavLink
              className='login__button login__button--link'
              to='/account/register'
            >
              CREATE AN ACCOUNT
            </NavLink>
          </FormBox>
        </section>
      </main>
    </>
  );
}

export { LogIn };
