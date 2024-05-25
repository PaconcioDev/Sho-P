import './CartItem.css';
import { NavLink } from 'react-router-dom';
import { Trash } from '../../icons/Trash.jsx';
import { normalizeString } from '../../utils/normalizeString.js';

function CartItem ({ product, handleClose, addToCart, removeOne, removeFromCart }) {
  const normalizedCategory = normalizeString(product.category.name);
  const normalizedName = normalizeString(product.name);
  const productUrl = `${normalizedCategory}/${normalizedName}`;

  return (
    <>
      <hr className='item__hr' />
      <li className='item'>
        <section className='item__img-section'>
          <NavLink
            className='item__img-link'
            to={`/products/${productUrl}`}
            onClick={handleClose}
          >
            <img src={product.image} />
          </NavLink>
        </section>
        <section className='item__info-section'>
          <div className='item__top-info'>
            <NavLink
              className='item__name'
              to={`/products/${productUrl}`}
              onClick={handleClose}
            >
              <span>{product.name}</span>
            </NavLink>
            <button className='item__delete' onClick={removeFromCart}>
              <Trash />
            </button>
          </div>
          <div className='item__price'>
            <span>$ {product.price}</span>
          </div>
          <div className='item__category'>
            <strong>Category: </strong>
            <span className='category__name'>{product.category.name}</span>
          </div>
          <div className='item__bottom-info'>
            <div className='item__quantity-container'>
              <button className='item__btn' onClick={removeOne}>-</button>
              <div className='item__quantity'>{product.quantity}</div>
              <button className='item__btn' onClick={addToCart}>+</button>
            </div>
            <span className='item__total-price'>
              $ {product.quantity * product.price}
            </span>
          </div>
        </section>
      </li>

    </>
  );
}

export { CartItem };
