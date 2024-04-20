import './NavBar.css';
import { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle.js';
import { useUser } from '../../hooks/useUser.js';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { Hamburger } from '../Hamburger/Hamburger.jsx';
import { UserModal } from '../UserModal/UserModal.jsx';
import { SearchIcon } from '../../icons/SearchIcon.jsx';
import { UserIcon } from '../../icons/UserIcon.jsx';
import { UserFillIcon } from '../../icons/UserFillIcon.jsx';
import { CartIcon } from '../../icons/CartIcon.jsx';

function NavBar () {
  //* Search Bar
  const { setSearch } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setSearch(event.target.value.toLowerCase().trim());
      navigate('products/all');
      event.target.value = '';
    }
  };

  //* User Modal
  const modal = useToggle();
  const iconRef = useRef(null);

  //* User
  const { user, logout } = useUser();

  return (
    <header>
      <nav className='navbar'>
        <ul className='navbar__item-container'>
          <li className='navbar__item'>
            <Hamburger />
          </li>
          <li className='navbar__item navbar__item--space navbar__item--search'>
            <input
              className='navbar__input'
              type='text'
              placeholder='Search...'
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <SearchIcon />
          </li>
        </ul>
        <ul className='navbar__item-container'>
          <li className='navbar__item'>
            <NavLink
              onClick={() => setSearch('')}
              className='navbar__title'
              to='/products/all'
            >
              Sho-P
            </NavLink>
          </li>
        </ul>
        <ul className='navbar__item-container'>
          <li
            className='navbar__item'
            ref={iconRef}
            onClick={modal.handleState}
          >
            {
            !user
              ? (
                <UserIcon />
                )
              : (
                <UserFillIcon />
                )
            }
          </li>
          {
            modal.isOn &&
              <UserModal
                iconRef={iconRef}
                user={user}
                logout={logout}
                onSetModal={modal.handleState}
              />
          }
          <li className='navbar__item'>
            <CartIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { NavBar };
