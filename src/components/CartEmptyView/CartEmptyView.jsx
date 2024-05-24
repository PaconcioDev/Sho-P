import './CartEmptyView.css';
import { NavLink } from 'react-router-dom';

function CartEmptyView ({ menu }) {
  return (
    <div
      className='cart-menu__empty'
    >
      <p className='empty__text'>There's nothing in your cart! Go and put some nice things in it!</p>
      <NavLink
        className='footer__btn footer__btn--empty-cart'
        to='/products'
        onClick={() => menu.manualOff()}
      >
        Continue shopping
      </NavLink>
    </div>
  );
}

export { CartEmptyView };
