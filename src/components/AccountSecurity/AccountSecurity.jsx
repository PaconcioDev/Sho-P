import './AccountSecurity.css';
import { NavLink } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle.js';
import { Modal } from '../Modal/Modal.jsx';

function AccountSecurity () {
  const modal = useToggle();

  return (
    <>
      <h3 className='security__subtitle'>Account Security</h3>
      <p>Use this options with caution, if not you could lose access to your account permanently. Deleting your account or changing your password is a thing only YOU should be able to do.</p>
      <div className='security__btn-container'>
        <NavLink className='security__link' to='/account/change-password'>CHANGE PASSWORD</NavLink>
        <NavLink className='security__link' onClick={modal.handleState}>DELETE ACCOUNT</NavLink>
        {
          modal.isOn &&
            <Modal
              onClose={modal.handleState}
            >
              MODAL
            </Modal>
        }
      </div>
    </>
  );
}

export { AccountSecurity };
