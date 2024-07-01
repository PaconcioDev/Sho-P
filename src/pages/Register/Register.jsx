import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { useToggle } from '../../hooks/useToggle.js';
import { UsersService } from '../../services/users.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { Message } from '../../components/Message/Message.jsx';
import { Layout } from '../../components/Layout/Layout.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';
import { PasswordBtn } from '../../components/PasswordBtn/PasswordBtn.jsx';

function Register () {
  const { message, onEvent } = useMessage();
  const navigate = useNavigate();

  const { isOn: isPasswordOn, handleState: togglePassword } = useToggle();

  const [roleValue, setRoleValue] = useState('customer');
  const firstName = useFormInput({ type: 'text' });
  const lastName = useFormInput({ type: 'text' });
  const email = useFormInput({ type: 'email' });
  const password = useFormInput({ type: !isPasswordOn ? 'password' : 'text' });
  const phone = useFormInput({ type: 'text' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      role: roleValue,
      name: firstName.value,
      lastName: lastName.value,
      email: email.value.toLowerCase(),
      password: password.value
    };

    if (phone.value !== '') {
      userData.phone = phone.value;
    }

    try {
      const data = await UsersService.create(userData);

      if (data.error) {
        const errorMessage = data.error[0]?.message || data.error;
        onEvent(errorMessage);
        setTimeout(() => {
          onEvent();
        }, 2000);
        return;
      }

      onEvent(data);
      setTimeout(() => {
        onEvent();
        navigate('/account/login');
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title='Create an Account'>
      <FormBox>
        <form
          id='registerForm'
          className='register__form'
          method='post'
          onSubmit={handleSubmit}
        >
          <h3 className='register__subtitle'>Required</h3>
          <section className='register__section'>
            <select
              className='register__select'
              form='registerForm'
              onChange={(e) => {
                setRoleValue(e.target.value);
              }}
              defaultValue='Select Role...'
              required
            >
              <option disabled>Select Role...</option>
              <option value='customer'>Customer</option>
              <option value='admin'>Admin</option>
            </select>
            <FormInput
              {...firstName}
              placeholder='First Name'
              required
            />
            <FormInput
              {...lastName}
              placeholder='Last name'
              required
            />
            <FormInput
              {...email}
              placeholder='Email'
              required
            />
            <PasswordBtn
              togglePassword={togglePassword}
              isPasswordOn={isPasswordOn}
            >
              <FormInput
                {...password}
                placeholder='Password'
                required
              />
            </PasswordBtn>
          </section>
          <hr className='register__hr' />
          <h3 className='register__subtitle'>Optional</h3>
          <section className='register__section'>
            <FormInput
              {...phone}
              placeholder='Phone'
            />
            {
              (message.isActive && !message.info.name) &&
                <Message isError>{message.info}</Message>
            }
            {
              (message.isActive && message.info.name) &&
                <Message>Account Created</Message>
            }
            <SubmitBtn>REGISTER</SubmitBtn>
          </section>
        </form>
      </FormBox>
    </Layout>
  );
}

export { Register };
