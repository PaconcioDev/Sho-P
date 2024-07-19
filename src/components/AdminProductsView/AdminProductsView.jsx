import './AdminProductsView.css';
import { useContext } from 'react';
import { useToggle } from '../../hooks/useToggle.js';
import { useSearch } from '../../hooks/useSearch.js';
import { CreateProduct } from '../CreateProduct/CreateProduct.jsx';
import { AdminProductCard } from '../AdminProductCard/AdminProductCard.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';

function AdminProductsView ({ search }) {
  const { products } = useContext(ProductsContext);
  const createView = useToggle();

  const filteredProducts = useSearch({
    items: products,
    inputValue: search
  });

  return (
    <>
      <article
        className='products__create'
        onClick={() => createView.manualOn()}
      >
        Create New Product +
      </article>
      {
        createView.isOn && <CreateProduct view={createView} />
      }
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
