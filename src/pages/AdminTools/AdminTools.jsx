import './AdminTools.css';
import { Layout } from '../../components/Layout/Layout.jsx';
import { AdminProductView } from '../../components/AdminProductsView/AdminProductsView.jsx';
import { ProductIcon } from '../../icons/ProductIcon.jsx';
import { CategoryIcon } from '../../icons/CategoryIcon.jsx';

function AdminTools () {
  return (
    <Layout title='Admin Tools'>
      <div className='tools__container'>
        <aside className='tools__options'>
          <ul className='tools__list'>
            <li className='tools__item'>
              <button className='tools__btn'>
                <ProductIcon />
                <span className='tools__name'>Products</span>
              </button>
            </li>
            <li className='tools__item'>
              <button className='tools__btn'>
                <CategoryIcon />
                <span className='tools__name'>Categories</span>
              </button>
            </li>
          </ul>
        </aside>
        <section className='tools__option-view'>
          <AdminProductView />
        </section>
      </div>
    </Layout>
  );
}

export { AdminTools };
