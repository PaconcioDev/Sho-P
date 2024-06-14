import './AdminProductCard.css';
import { NavLink } from 'react-router-dom';
import { Trash } from '../../icons/Trash.jsx';
import { EditIcon } from '../../icons/EditIcon.jsx';

function AdminProductCard ({ product }) {
  return (
    <article className='product-admin'>
      <section className='product-admin__img-section'>
        <NavLink className='product-admin__img-link'>
          <img src={product.image} alt={product.name} />
        </NavLink>
      </section>
      <div>
        <section className='product-admin__info'>
          <NavLink className='product-admin__name'>
            <span>{product.name}</span>
          </NavLink>
          <div className='product-admin__category'>
            <span>{product.category.name}</span>
          </div>
          <div className='product-admin__price'>
            <span>$ {product.price}</span>
          </div>
        </section>
        <section className='product-admin__btn-section'>
          <button className='product-admin__btn'>
            <EditIcon />
          </button>
          <button className='product-admin__btn'>
            <Trash />
          </button>
        </section>
      </div>
    </article>
  );
}

export { AdminProductCard };
