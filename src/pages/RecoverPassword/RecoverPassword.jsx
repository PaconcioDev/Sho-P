import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.js';

function RecoverPassword () {
  const { token } = useParams();
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submiting');
    const { newPassword, confirmPassword } = passwordForm;
    if (newPassword !== confirmPassword) {
      // TODO: Error message maby turn the login one into a component
      console.log(newPassword === confirmPassword);
      return;
    }

    try {
      const data = await AuthService.changePassword(token, newPassword);

      if (data.error) {
        console.log(data.error[0].message);
        // TODO: Error message maby turn the login one into a component
      } else {
        console.log(data);
        navigate('/account');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Recover Your Password
      </h2>
      <p>Enter a new password</p>
      <label htmlFor='recoverPassword'>Password</label>
      <input id='recoverPassword' name='newPassword' type='password' onChange={handleChange} required />
      <label htmlFor='passwordConfirmation'>Confirm Password</label>
      <input id='passwordConfirmation' name='confirmPassword' type='password' onChange={handleChange} required />
      <button type='submit'>SUBMIT</button>
    </form>
  );
}

export { RecoverPassword };
