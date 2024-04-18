import './RecoverPassword.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.js';
import { Message } from '../../components/Message/Message.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { FormInput } from '../../components/FormInput/FormInput.jsx';

// TODO : useFormInput useMessage
function RecoverPassword () {
  const { token } = useParams();
  const navigate = useNavigate();

  //* On Chage
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  //* On Submit
  const [message, setMessage] = useState({ isActive: false, data: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      setMessage({ isActive: true, data: 'Passwords not matching' });
      return;
    }

    try {
      const data = await AuthService.changePassword(token, newPassword);

      if (data.error) {
        if (data.error[0].message) {
          setMessage({ isActive: true, data: data.error[0].message });
        } else {
          setMessage({ isActive: true, data: 'Your link has expired' });
        }
      } else {
        navigate('/account');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='recover__title'>
        Recover Your Password
      </h2>
      <main className='recover'>
        <FormBox>
          <form className='recover__form' onSubmit={handleSubmit}>
            <h3 className='recover__text'>Enter a new password</h3>
            <label htmlFor='recoverPassword'>Password</label>
            <FormInput
              id='recoverPassword'
              name='newPassword'
              type='password'
              placeholder='New Password'
              onChange={handleChange}
              required
            />
            <label htmlFor='passwordConfirmation'>Confirm Password</label>
            <FormInput
              id='passwordConfirmation'
              name='confirmPassword'
              type='password'
              placeholder='New Password'
              onChange={handleChange}
              required
            />
            {message.isActive ? (<Message isError>{message.data}</Message>) : ''}
            <button className='recover__btn' type='submit'>SUBMIT</button>
          </form>
        </FormBox>
      </main>
    </>
  );
}

export { RecoverPassword };
