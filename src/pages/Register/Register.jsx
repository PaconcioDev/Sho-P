import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { UsersService } from '../../services/users.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { Message } from '../../components/Message/Message.jsx';

function Register () {
  const { onEvent, message } = useMessage();
  const navigate = useNavigate();

  const firstName = useFormInput({ type: 'text' });
  const lastName = useFormInput({ type: 'text' });
  const email = useFormInput({ type: 'email' });
  const password = useFormInput({ type: 'password' });
  const phone = useFormInput({ type: 'text' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
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
        const errorMessage = data.error[0].message || data.error;
        onEvent(errorMessage);
        return;
      }

      onEvent(data);
      setTimeout(() => {
        navigate('/account/login');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className='register'>
        <h2 className='register__title'>Create an Account</h2>
        <FormBox>
          <form
            className='register__form'
            method='post'
            onSubmit={handleSubmit}
          >
            <h3 className='register__subtitle'>Required</h3>
            <section className='register__section'>
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
              <FormInput
                {...password}
                placeholder='Password'
                required
              />
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
              <button className='register__btn' type='submit'>SUBMIT</button>
            </section>
          </form>
        </FormBox>
      </main>
    </>
  );
}

export { Register };
