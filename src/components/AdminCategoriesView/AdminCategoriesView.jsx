import './AdminCategoriesView.css';
import { useContext } from 'react';
import { AdminCategoryCard } from '../AdminCategoryCard/AdminCategoryCard.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { SearchIcon } from '../../icons/SearchIcon.jsx';

function AdminCategoriesView () {
  const { categories } = useContext(ProductsContext);

  return (
    <>
      <div className='categories__search-container'>
        <input className='categories__search' type='text' placeholder='Search...' />
        <SearchIcon />
      </div>
      <article className='categories__create'>
        Create New Category +
      </article>
      <div className='categories__view'>
        {categories?.map(category =>
          <AdminCategoryCard
            key={category.id}
            category={category}
          />)}
      </div>
    </>
  );
}

export { AdminCategoriesView };
