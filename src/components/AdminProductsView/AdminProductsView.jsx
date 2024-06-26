import './AdminProductsView.css';
import { useContext } from 'react';
import { useSearch } from '../../hooks/useSearch.js';
import { AdminProductCard } from '../AdminProductCard/AdminProductCard.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';

function AdminProductsView ({ search }) {
  const { products } = useContext(ProductsContext);
  const filteredProducts = useSearch({
    items: products,
    inputValue: search
  });

  return (
    <>
      <article className='products__create'>
        Create New Product +
      </article>
      <div className='products__view'>
        {filteredProducts?.map(product =>
          <AdminProductCard
            product={product}
            key={product.id}
          />)}
      </div>
    </>
  );
}

export { AdminProductsView };
