import { Item } from '../Item/Item.jsx';

function OrderItem ({ product }) {
  return (
    <article className='order-item__container'>
      <Item
        product={product}
      />
    </article>
  );
}

export { OrderItem };
