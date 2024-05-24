import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

function useCart () {
  const cart = useContext(CartContext);

  if (cart === undefined) throw new Error('useCart must be used winthin a CartProvider');

  return cart;
}

export { useCart };
