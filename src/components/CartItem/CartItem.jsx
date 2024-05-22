import './CartItem.css';
import { NavLink } from 'react-router-dom';
import { Trash } from '../../icons/Trash.jsx';

function CartItem () {
  return (
    <>
      <hr className='item__hr' />
      <li className='item'>
        <section className='item__img-section'>
          <NavLink className='item__img-link'>
            <img src='https://fastly.picsum.photos/id/187/640/480.jpg?hmac=IKSzu7B1lxSQ8sKURlYOh-xEx2_2BseZnALC7ACvpbU' />
          </NavLink>
        </section>
        <section className='item__info-section'>
          <div className='item__top-info'>
            <NavLink className='item__name'>
              <span>Name</span>
            </NavLink>
            <button className='item__delete'>
              <Trash />
            </button>
          </div>
          <div className='item__price'>
            <span>$ 55.00</span>
          </div>
          <div className='item__category'>
            <strong>Category: </strong>
            <span className='category__name'>Clothes</span>
          </div>
          <div className='item__bottom-info'>
            <div className='item__quantity-container'>
              <button className='item__btn'>-</button>
              <span className='item__quantity'>1</span>
              <button className='item__btn'>+</button>
            </div>
            <span className='item__total-price'>$ 100.00</span>
          </div>
        </section>
      </li>

    </>
  );
}

export { CartItem };
