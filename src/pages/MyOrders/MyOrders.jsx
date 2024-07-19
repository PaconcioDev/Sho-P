import './MyOrders.css';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { OrdersService } from '../../services/orders.js';
import { Layout } from '../../components/Layout/Layout.jsx';
import { CartIcon } from '../../icons/CartIcon.jsx';
import { ArrowIcon } from '../../icons/ArrowIcon.jsx';
import { CoinIcon } from '../../icons/CoinIcon.jsx';
import { CalendarIcon } from '../../icons/CalendarIcon.jsx';

function MyOrders () {
  const { user } = useContext(ProductsContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userOrders = await OrdersService.findOrderByUserId({
          token: user.token,
          userId: user.id
        });
        setOrders(userOrders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserOrders();
  }, [user.token, user.id]);

  return (
    <Layout title='My Orders'>
      {
        orders.length > 0
          ? (
            <ul className='orders__list'>
              {orders.map(order => (
                <li key={order.id} className='orders__item'>
                  <section className='orders__section orders__section--first'>
                    <CartIcon />
                    <span className='orders__quantity'>
                      <strong>{order.orderItems.length}</strong> products
                    </span>
                  </section>
                  <section className='orders__section orders__section--second'>
                    <CoinIcon />
                    <span className='orders__price'>$ {order.total}</span>
                  </section>
                  <section className='orders__section orders__section--third'>
                    <CalendarIcon />
                    <span className='orders__date'>{order.date}</span>
                    <NavLink
                      className='orders__btn'
                      to={`/my-orders/order/${order.id}`}
                    >
                      <ArrowIcon />
                    </NavLink>
                  </section>
                </li>
              ))}
            </ul>
            )
          : (
            <div className='empty-orders__container'>
              <span className='empty-orders__text'>
                It looks like you haven't ordered anything yet, add products to your cart and do the checkout!!
              </span>
              <NavLink
                className='empty-orders__link'
                to='/products'
              >
                Go Shopping
              </NavLink>
            </div>
            )
      }
    </Layout>
  );
}

export { MyOrders };
