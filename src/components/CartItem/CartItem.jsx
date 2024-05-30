import { Item } from '../Item/Item.jsx';

function CartItem ({
  product,
  handleClose,
  addToCart,
  removeOne,
  removeFromCart
}) {
  return (
    <Item
      product={product}
      handleClose={handleClose}
      addToCart={addToCart}
      removeOne={removeOne}
      removeFromCart={removeFromCart}
      showControls
    />
  );
}

export { CartItem };
