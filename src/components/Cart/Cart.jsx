import './Cart.css';
import { useToggle } from '../../hooks/useToggle.js';
import { CartItem } from '../CartItem/CartItem.jsx';
import { CartIcon } from '../../icons/CartIcon.jsx';
import { CloseIcon } from '../../icons/CloseIcon';

// TODO: Scroll, total and all real functions
function Cart () {
  const menu = useToggle();

  return (
    <>
      <button
        className='cart-menu__btn'
        onClick={menu.handleState}
      >
        <CartIcon />
      </button>
      <div
        className={`cart-menu__backdrop ${menu.isOn ? 'cart-menu__backdrop--active' : ''}`}
        onClick={() => menu.manualOff()}
      />
      <aside
        className={`cart-menu ${menu.isOn ? 'cart-menu--active' : ''}`}
      >
        <div className='cart-menu__header'>
          <h2 className='cart-menu__header-title'>Cart</h2>
          <button
            className='cart-menu__btn cart-menu__btn--close'
            onClick={() => menu.manualOff()}
          >
            <CloseIcon />
          </button>
        </div>
        <ul className='cart-menu__items'>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </ul>
      </aside>
    </>
  );
}

export { Cart };
