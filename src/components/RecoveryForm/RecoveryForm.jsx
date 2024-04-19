import { useFormInput } from '../../hooks/useFormInput';
import { useMessage } from '../../hooks/useMessage';
import { AuthService } from '../../services/auth';
import { FormInput } from '../FormInput/FormInput';
import { Message } from '../Message/Message';

function RecoveryForm ({ toggle }) {
  const {
    message: recoverMessage,
    onEvent: onRecoverEvent
  } = useMessage();

  const email = useFormInput({ type: 'email' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AuthService.sendPasswordEmail(email.value.toLowerCase());

      if (data.error) {
        onRecoverEvent(data.error);
        return;
      }

      onRecoverEvent(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3 className='login__subtitle'>Recover your password</h3>
      <p className='login__text'>
        We will send you an email to recover your password.
      </p>
      <form className='login__form' onSubmit={handleSubmit}>
        {
          (recoverMessage.isActive && !recoverMessage.info.message) &&
            <Message isError>{recoverMessage.info}</Message>
        }
        {
          (recoverMessage.isActive && recoverMessage.info.message) &&
            <Message>{recoverMessage.info.message}</Message>
        }
        <FormInput
          {...email}
          placeholder='Email'
          required
        />
        <button className='login__button' type='submit'>
          SUBMIT
        </button>
        <a
          className='login__recover-password'
          onClick={() => {
            toggle();
            onRecoverEvent();
          }}
        >
          Cancel
        </a>
      </form>
    </>
  );
}

export { RecoveryForm };