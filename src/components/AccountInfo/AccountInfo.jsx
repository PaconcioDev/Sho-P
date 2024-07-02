import './AccountInfo.css';
import { useEffect } from 'react';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Message } from '../../components/Message/Message.jsx';
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn.jsx';
import { UsersService } from '../../services/users.js';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

function AccountInfo ({ currentUser, user }) {
  const firstName = useFormInput({ type: 'text' });
  const lastName = useFormInput({ type: 'text' });
  const email = useFormInput({ type: 'email' });
  const phone = useFormInput({ type: 'text' });

  const {
    message: updateMessage,
    onEvent: onUpdateEvent
  } = useMessage();

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
      ...(capitalizeFirstLetter(firstName.value) !== currentUser.name && { name: capitalizeFirstLetter(firstName.value) }),
      ...(capitalizeFirstLetter(lastName.value) !== currentUser.lastName && { lastName: capitalizeFirstLetter(lastName.value) }),
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
        }, 700);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3 className='my-account__subtitle'>Account Information</h3>
      <p>You can edit your information if you must to.</p>
      <form
        className='my-account__form'
        method='post'
        onSubmit={handleSubmit}
      >
        <span className='my-account__input'>
          <label htmlFor='role'>Role:</label>
          <FormInput
            id='role'
            value={capitalizeFirstLetter(currentUser.role)}
            disabled
          />
        </span>
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
          extraStyle={{
            marginTop: '0', margin: '0.5rem auto'
          }}
        >
          SUBMIT
        </SubmitBtn>
      </form>
    </>
  );
}

export { AccountInfo };
