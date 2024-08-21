import './AdminCategoriesView.css';
import { useContext } from 'react';
import { useToggle } from '../../hooks/useToggle.js';
import { useSearch } from '../../hooks/useSearch.js';
import { AdminCategoryCard } from '../AdminCategoryCard/AdminCategoryCard.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { CreateCategory } from '../CreateCategory/CreateCategory.jsx';
import { Message } from '../Message/Message.jsx';
import { useMessage } from '../../hooks/useMessage.js';

function AdminCategoriesView ({ search }) {
  const { categories } = useContext(ProductsContext);
  const createView = useToggle();

  const { message, onEvent } = useMessage();

  const filteredCategories = useSearch({
    items: categories,
    inputValue: search
  });

  return (
    <>
      {
        !createView.isOn
          ? (
            <article
              className='categories__create'
              onClick={() => createView.manualOn()}
            >
              Create New Category +
            </article>
            )
          : <CreateCategory view={createView} setMessage={onEvent} />
      }
      {
        message.isActive &&
          <div className='categories__message-container'>
            <Message isError>{message.info}</Message>
          </div>
      }
      <div className='categories__view'>
        {filteredCategories?.map(category =>
          <AdminCategoryCard
            key={category.id}
            category={category}
          />)}
      </div>
    </>
  );
}

export { AdminCategoriesView };
