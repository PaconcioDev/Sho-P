import './PasswordBtn.css';
import { EyeSlashIcon } from '../../icons/EyeSlashIcon.jsx';
import { EyeIcon } from '../../icons/EyeIcon.jsx';

function PasswordBtn ({ togglePassword, isPasswordOn, topPosition, rightPosition }) {
  return (
    <div
      style={{ top: topPosition, right: rightPosition }}
      className='password-btn'
      onClick={() => togglePassword()}
    >
      {
        isPasswordOn
          ? <EyeSlashIcon />
          : <EyeIcon />
      }
    </div>
  );
}

export { PasswordBtn };
