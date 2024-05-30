import './Order.css';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout.jsx';
import { OrdersService } from '../../services/orders';
import { OrderItem } from '../../components/OrderItem/OrderItem.jsx';
import { ArrowIcon } from '../../icons/ArrowIcon.jsx';

function Order () {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  useEffect(
    () => async () => {
      try {
        const order = await OrdersService.findOrderById({ orderId });
        setOrderItems(order.orderItems);
        setOrder(order);
      } catch (error) {
        console.error(error);
      }
    },
    [orderId]
  );

  return (
    <Layout>
      <div className='order__container'>
        <section className='order__header'>
          <NavLink
            className='order__btn'
            to='/my-orders'
          >
            <ArrowIcon />
          </NavLink>
          <strong className='order__date'>{order.date}</strong>
        </section>
        <section>
          <ul className='order__list'>
            {orderItems.map(item => (
              <OrderItem key={item.productId} product={item} />
            ))}
          </ul>
        </section>
        <section className='order__footer'>
          <span>Total: </span>
          <span>$ {order.total}</span>
        </section>
      </div>
    </Layout>
  );
}

export { Order };
