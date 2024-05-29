import { createContext, useReducer } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cartReducer.js';

const CartContext = createContext();

function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  });

  const removeOne = product => dispatch({
    type: 'REMOVE_ONE',
    payload: product
  });

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  });

  const cleanCart = () => dispatch({ type: 'CLEAN_CART' });

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeOne,
      removeFromCart,
      cleanCart
    }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
