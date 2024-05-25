import './Card.css';
import { NavLink } from 'react-router-dom';
import { normalizeString } from '../../utils/normalizeString';

// TODO: Name size
function Card ({ data }) {
  const normalizedCategory = normalizeString(data.category.name);
  const normalizedName = normalizeString(data.name);

  return (
    <article className='product-card'>
      <NavLink
        className='product-card__link'
        to={`/products/${normalizedCategory}/${normalizedName}`}
      >
        <section className='product-card__info'>
          <h3 className='product-card__name'>{data.name}</h3>
          <span className='product-card__price'>${data.price}</span>
        </section>
        <div className='product-card__image-overlay' />
        <img className='product-card__image' src={data.image} />
      </NavLink>
    </article>
  );
}

export { Card };
