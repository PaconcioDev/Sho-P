import './AdminTools.css';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout.jsx';
import { AdminProductsView } from '../../components/AdminProductsView/AdminProductsView.jsx';
import { AdminCategoriesView } from '../../components/AdminCategoriesView/AdminCategoriesView.jsx';
import { useToggle } from '../../hooks/useToggle.js';
import { ProductIcon } from '../../icons/ProductIcon.jsx';
import { CategoryIcon } from '../../icons/CategoryIcon.jsx';
import { SearchIcon } from '../../icons/SearchIcon.jsx';

function AdminTools () {
  const productsView = useToggle(
    window.localStorage.getItem('productView') === null
      ? true
      : window.localStorage.getItem('productView') === 'true'
  );
  const categoriesView = useToggle(
    window.localStorage.getItem('categoryView') === 'true'
  );

  useEffect(() => {
    window.localStorage.setItem('productView', productsView.isOn);
  }, [productsView.isOn]);

  useEffect(() => {
    window.localStorage.setItem('categoryView', categoriesView.isOn);
  }, [categoriesView.isOn]);

  useEffect(() => {
    return () => {
      window.localStorage.removeItem('categoryView');
      window.localStorage.removeItem('productView');
    };
  }, []);

  const [search, setSearch] = useState('');

  return (
    <Layout title='Admin Tools'>
      <div className='tools__container'>
        <aside className='tools__options'>
          <ul className='tools__list'>
            <li className={`tools__item ${productsView.isOn ? 'tools__item--selected' : ''}`}>
              <button
                className='tools__btn'
                onClick={() => {
                  categoriesView.manualOff();
                  productsView.manualOn();
                }}
              >
                <ProductIcon />
                <span className='tools__name'>Products</span>
              </button>
            </li>
            <li className={`tools__item ${categoriesView.isOn ? 'tools__item--selected' : ''}`}>
              <button
                className='tools__btn'
                onClick={() => {
                  productsView.manualOff();
                  categoriesView.manualOn();
                }}
              >
                <CategoryIcon />
                <span className='tools__name'>Categories</span>
              </button>
            </li>
          </ul>
        </aside>
        <section className='tools__option-view'>
          <div className='tools__search-container'>
            <input
              className='tools__search'
              placeholder='Search...'
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon />
          </div>
          {productsView.isOn && (
            <AdminProductsView
              search={search}
            />
          )}
          {categoriesView.isOn && (
            <AdminCategoriesView
              search={search}
            />
          )}
        </section>
      </div>
    </Layout>
  );
}

export { AdminTools };
