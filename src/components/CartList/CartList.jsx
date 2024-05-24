import './CartList.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { CartItem } from '../CartItem/CartItem.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';

function CartList ({ cart, menu }) {
  const { user } = useContext(ProductsContext);
  const { addToCart, removeOne, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, product) => (
    sum + (product.price * product.quantity)
  ), 0);

  return (
    <div className='cart-menu__container'>
      <ul className='cart-menu__items'>
        {cart.map(product => (
          <CartItem
            key={product.id}
            product={product}
            handleClose={menu.manualOff}
            addToCart={() => addToCart(product)}
            removeOne={() => removeOne(product)}
            removeFromCart={() => removeFromCart(product)}
          />
        ))}
      </ul>
      <div className='cart-menu__footer'>
        <div className='footer__subtotal'>
          <span>Subtotal:</span>
          <span>$ {totalPrice}</span>
        </div>
        {
          user
            ? (
              <button className='footer__btn'>
                Checkout
              </button>
              )
            : (
              <NavLink to='/account'>
                <button
                  className='footer__btn'
                  onClick={() => menu.manualOff()}
                >
                  Login to checkout
                </button>
              </NavLink>
              )
        }
      </div>
    </div>
  );
}

export { CartList };
