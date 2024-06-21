import './AdminProductsView.css';
import { useContext } from 'react';
import { AdminProductCard } from '../AdminProductCard/AdminProductCard.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { SearchIcon } from '../../icons/SearchIcon.jsx';

function AdminProductsView () {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <div className='products__search-container'>
        <input className='products__search' type='text' placeholder='Search...' />
        <SearchIcon />
      </div>
      <article className='products__create'>
        Create New Product +
      </article>
      <div className='products__view'>
        {products?.map(product =>
          <AdminProductCard
            product={product}
            key={product.id}
          />)}
      </div>
    </>
  );
}

export { AdminProductsView };
