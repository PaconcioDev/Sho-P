import './LogIn.css';
import { NavLink } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle.js';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { LoginForm } from '../../components/LoginForm/LoginForm.jsx';
import { RecoveryForm } from '../../components/RecoveryForm/RecoveryForm.jsx';

function LogIn () {
  const { isOn: isRecoveryOn, handleState: toggleRecovery } = useToggle();

  return (
    <>
      <h2 className='login__title'>My Account</h2>
      <main className='login'>
        <section className='login__box-container'>
          <FormBox>
            {!isRecoveryOn
              ? (
                <LoginForm toggle={toggleRecovery} />
                )
              : (
                <RecoveryForm toggle={toggleRecovery} />
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
