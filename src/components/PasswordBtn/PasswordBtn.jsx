import './PasswordBtn.css';
import { EyeSlashIcon } from '../../icons/EyeSlashIcon.jsx';
import { EyeIcon } from '../../icons/EyeIcon.jsx';

function PasswordBtn ({ togglePassword, isPasswordOn, children }) {
  return (
    <div className='password__container'>
      {children}
      <div
        className='password__btn'
        onClick={() => togglePassword()}
      >
        {
        isPasswordOn
          ? <EyeSlashIcon />
          : <EyeIcon />
      }
      </div>
    </div>
  );
}

export { PasswordBtn };
