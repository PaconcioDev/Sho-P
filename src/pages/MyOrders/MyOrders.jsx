import './MyOrders.css';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { OrdersService } from '../../services/orders.js';
import { Layout } from '../../components/Layout/Layout.jsx';
import { CartIcon } from '../../icons/CartIcon.jsx';
import { ArrowIcon } from '../../icons/ArrowIcon.jsx';
import { NavLink } from 'react-router-dom';
import { CoinIcon } from '../../icons/CoinIcon.jsx';
import { CalendarIcon } from '../../icons/CalendarIcon.jsx';

function MyOrders () {
  const { user } = useContext(ProductsContext);
  const [orders, setOrders] = useState([]);

  useEffect(
    () => async () => {
      try {
        const userOrders = await OrdersService.findOrderByUserId({
          token: user.token,
          userId: user.id
        });
        setOrders(userOrders);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <Layout title='My Orders'>
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
    </Layout>
  );
}

export { MyOrders };
