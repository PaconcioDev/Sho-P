import './CartList.css';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { CartItem } from '../CartItem/CartItem.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { OrdersService } from '../../services/orders.js';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';

function CartList ({ cart, menu }) {
  const { user } = useContext(ProductsContext);
  const { addToCart, removeOne, removeFromCart, cleanCart } = useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, product) => (
    sum + (product.price * product.quantity)
  ), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await OrdersService.create({
        token: user.token,
        userId: user.id,
        orderItems: cart,
        total: totalPrice
      });

      if (request.error) return;

      navigate(`/my-orders/order/${request.id}`);
      cleanCart();
      menu.manualOff();
    } catch (error) {
      console.error(error);
    }
  };

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
              <SubmitBtn
                type='button'
                extraStyle={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1rem',
                  fontSize: '1.25rem'
                }}
                handleClick={handleSubmit}
              >
                Checkout
              </SubmitBtn>
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
