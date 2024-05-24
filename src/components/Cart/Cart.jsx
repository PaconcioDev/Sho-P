import './Cart.css';
import { useToggle } from '../../hooks/useToggle.js';
import { useCart } from '../../hooks/useCart.js';
import { CartIcon } from '../../icons/CartIcon.jsx';
import { CloseIcon } from '../../icons/CloseIcon';
import { CartEmptyView } from '../CartEmptyView/CartEmptyView.jsx';
import { CartList } from '../CartList/CartList.jsx';

function Cart () {
  const menu = useToggle();
  const { cart } = useCart();

  const totalProducts = cart.reduce((sum, product) => (
    sum + product.quantity
  ), 0);

  return (
    <>
      <button
        className='cart-menu__btn'
        onClick={menu.handleState}
      >
        <CartIcon />
        {
        totalProducts !== 0 &&
          <div className='cart-menu__quantity'>
            {totalProducts < 10 ? totalProducts : '9+'}
          </div>
        }
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
        {
          cart.length > 0
            ? (
              <CartList cart={cart} menu={menu} />
              )
            : <CartEmptyView menu={menu} />
        }
      </aside>
    </>
  );
}

export { Cart };
