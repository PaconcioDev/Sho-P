import './MyAccount.css';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { UsersService } from '../../services/users';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { Message } from '../../components/Message/Message.jsx';
import { Layout } from '../../components/Layout/Layout.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';

function MyAccount () {
  const { user } = useContext(ProductsContext);
  const [currentUser, setCurrentUser] = useState(null);

  const firstName = useFormInput({ type: 'text' });
  const lastName = useFormInput({ type: 'text' });
  const email = useFormInput({ type: 'email' });
  const phone = useFormInput({ type: 'text' });

  const {
    message: updateMessage,
    onEvent: onUpdateEvent
  } = useMessage();

  useEffect(
    () => async () => {
      const data = await UsersService.findOne({ id: user.id });
      setCurrentUser(data);
    }
    , []);

  useEffect(() => {
    if (currentUser) {
      firstName.onChange({ target: { value: currentUser.name } });
      lastName.onChange({ target: { value: currentUser.lastName } });
      email.onChange({ target: { value: currentUser.email } });
      phone.onChange({ target: { value: currentUser.phone } });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserInfo = {
      ...(firstName.value !== currentUser.name && { name: firstName.value }),
      ...(lastName.value !== currentUser.lastName && { lastName: lastName.value }),
      ...(email.value.toLowerCase() !== currentUser.email && { email: email.value }),
      ...(phone.value !== currentUser.phone && { phone: phone.value })
    };

    try {
      if (Object.keys(newUserInfo).length !== 0) {
        const data = await UsersService.update(currentUser.id, user.token, newUserInfo);

        if (data.error) {
          const errorMessage = data.error[0]?.message || data.error;
          onUpdateEvent(errorMessage);
          return;
        }

        onUpdateEvent(data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !currentUser
      ? <p>Loading...</p>
      : (
        <Layout title='My Account'>
          <FormBox>
            <h3 className='my-account__subtitle'>You can edit your information if you must to</h3>
            <form
              className='my-account__form'
              method='post'
              onSubmit={handleSubmit}
            >
              <section className='my-account__full-name'>
                <span className='my-account__input'>
                  <label htmlFor='firstName'>First Name:</label>
                  <FormInput
                    {...firstName}
                    id='firstName'
                    placeholder='First Name'
                    required
                  />
                </span>
                <span className='my-account__input'>
                  <label htmlFor='lastName'>Last Name:</label>
                  <FormInput
                    {...lastName}
                    id='lastName'
                    placeholder='Last name'
                    required
                  />
                </span>
              </section>
              <span className='my-account__input'>
                <label htmlFor='email'>Email:</label>
                <FormInput
                  {...email}
                  id='email'
                  placeholder='Email'
                  required
                />
              </span>
              <span className='my-account__input my-account__input--last'>
                <label htmlFor='phone'>Phone:</label>
                <FormInput
                  {...phone}
                  id='phone'
                  placeholder='Phone'
                  required={currentUser.phone !== ''}
                />
              </span>
              {
                (updateMessage.isActive && !updateMessage.info.name) &&
                  <Message isError>{updateMessage.info}</Message>
              }
              {
                (updateMessage.isActive && updateMessage.info.name) &&
                  <Message>Account Updated</Message>
              }
              <SubmitBtn
                text='SUBMIT'
                extraStyle={{
                  marginTop: '0', margin: '0.5rem auto'
                }}
              />
              <NavLink className='my-account__link' to='/account/change-password'>Change your password</NavLink>
            </form>
          </FormBox>
        </Layout>
        )
  );
}

export { MyAccount };
