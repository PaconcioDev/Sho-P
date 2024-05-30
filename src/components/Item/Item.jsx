import './Item.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trash } from '../../icons/Trash.jsx';
import { normalizeString } from '../../utils/normalizeString.js';

function Item ({
  product,
  handleClose,
  addToCart,
  removeOne,
  removeFromCart,
  showControls
}) {
  const normalizedCategory = normalizeString(product.category.name);
  const normalizedName = normalizeString(product.name);
  const productUrl = `${normalizedCategory}/${normalizedName}`;

  return (
    <>
      {showControls && <hr className='item__hr' />}
      <li className={`item ${!showControls ? 'item--border' : ''}`}>
        <section className='item__img-section'>
          <NavLink
            className='item__img-link'
            to={`/products/${productUrl}`}
            onClick={handleClose}
          >
            <img src={product.image} alt={product.name} />
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
            {showControls && (
              <button className='item__delete' onClick={removeFromCart}>
                <Trash />
              </button>
            )}
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
              <button
                className={`item__btn ${
                !showControls
                  ? 'item__btn--invisible'
                  : ''
              }`}
                onClick={removeOne}
              >
                -
              </button>
              <div className={`item__quantity ${
                !showControls
                  ? 'item__quantity--small'
                  : ''
              }`}
              >
                {product.quantity}
              </div>
              <button
                className={`item__btn ${
                !showControls
                  ? 'item__btn--invisible'
                  : ''
              }`}
                onClick={addToCart}
              >
                +
              </button>
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

export { Item };
