import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout.jsx';
import { OrdersService } from '../../services/orders';
import { normalizeString } from '../../utils/normalizeString.js';

function Order () {
  const { id: orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(
    () => async () => {
      try {
        const order = await OrdersService.findOrderById({ orderId });
        console.log(order.orderItems);
        setOrderItems(order.orderItems);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  console.log(orderItems);

  return (
    <Layout title='Title'>
      <ul>
        {orderItems.map(item => (
          <li key={item.id}>
            <NavLink
              className='item__img-link'
              to={`/products/${normalizeString(item.category.name)}/${normalizeString(item.name)}`}
            >
              <img src={item.image} alt={item.name} />
            </NavLink>
            <span>{item.name}</span>
            <span>$ {item.price}</span>
            <strong>Category: </strong>
            <span>{item.category.name}</span>
            <span>{item.quantity}</span>
            <span>$ {item.quantity * item.price}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export { Order };
