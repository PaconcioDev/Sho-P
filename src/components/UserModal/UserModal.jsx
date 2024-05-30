import './UserModal.css';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function UserModal ({ iconRef, user, logout, onSetModal }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) &&
        (iconRef.current && !iconRef.current.contains(event.target))
      ) {
        onSetModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside
      className='user-modal'
      ref={modalRef}
    >
      {!user
        ? (
          <>
            <NavLink
              className='user-modal__link'
              onClick={onSetModal}
              to='/account/login'
            >
              LOGIN
            </NavLink>
            <span className='user-modal__text'>
              NEW USER?{' '}
              <NavLink onClick={onSetModal} to='/account/register'>
                REGISTER HERE
              </NavLink>
            </span>
          </>
          )
        : (
          <>
            <NavLink
              className='user-modal__link user-modal__link--account'
              onClick={onSetModal}
              to='/account/my-account'
            >
              MY ACCOUNT
            </NavLink>
            <button
              className='user-modal__logout'
              onClick={() => {
                logout();
                onSetModal();
              }}
            >
              LOGOUT
            </button>
            <NavLink
              className='user-modal__link user-modal__link--orders'
              onClick={onSetModal}
              to='/my-orders'
            >
              MY ORDERS
            </NavLink>
          </>
          )}
    </aside>
  );
}

export { UserModal };
