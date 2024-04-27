import './MyAccount.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser.js';
import { useFormInput } from '../../hooks/useFormInput.js';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { UsersService } from '../../services/users';

// TODO : Fix initial value and complete submit
function MyAccount () {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useUser();

  useEffect(
    () => {
      const fetchData = async () => {
        if (user) {
          const data = await UsersService.findOne({ id: user.id });
          setCurrentUser(data);
        }
      };

      fetchData();
    }, [user]);

  const firstName = useFormInput({ type: 'text' });
  const lastName = useFormInput({ type: 'text' });
  const email = useFormInput({ type: 'email' });
  const phone = useFormInput({ type: 'text' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserInfo = {
      name: firstName.value,
      lastName: lastName.value,
      email: email.value.toLowerCase(),
      phone: phone.value
    };

    try {
      const data = await UsersService.update(currentUser.id, user.token, newUserInfo);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !currentUser
      ? <p>Loading...</p>
      : (
        <main className='my-account'>
          <h2 className='my-account__title'>My Account</h2>
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
                    value={currentUser.name}
                    placeholder='First Name'
                  />
                </span>
                <span className='my-account__input'>
                  <label htmlFor='lastName'>Last Name:</label>
                  <FormInput
                    {...lastName}
                    id='lastName'
                    value={currentUser.lastName}
                    placeholder='Last name'
                  />
                </span>
              </section>
              <span className='my-account__input'>
                <label htmlFor='email'>Email:</label>
                <FormInput
                  {...email}
                  id='email'
                  value={currentUser.email}
                  placeholder='Email'
                  required
                />
              </span>
              <span className='my-account__input'>
                <label>Password:</label>
                <p>********</p>
              </span>
              <span className='my-account__input'>
                <label htmlFor='phone'>Phone:</label>
                <FormInput
                  {...phone}
                  id='phone'
                  value={currentUser.phone}
                  placeholder='Phone'
                />
              </span>
              <button className='my-account__btn' type='submit'>SUBMIT</button>
            </form>
          </FormBox>
        </main>
        )
  );
}

export { MyAccount };
