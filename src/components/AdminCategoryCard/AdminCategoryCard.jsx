import './AdminCategoryCard.css';
import { useEffect, useState } from 'react';
import { useToggle } from '../../hooks/useToggle.js';
import { EditIcon } from '../../icons/EditIcon.jsx';
import { Trash } from '../../icons/Trash.jsx';
import { AdminDeleteModal } from '../AdminDeleteModal/AdminDeleteModal.jsx';
import { CategoriesService } from '../../services/categories.js';

function AdminCategoryCard ({ category }) {
  const [hasProducts, setHasProducts] = useState(null);
  const deleteModal = useToggle();

  useEffect(() => async () => {
    const productsInCategory = await CategoriesService.findProducts({
      id: category.id
    });
    setHasProducts(productsInCategory);
  }, []);

  return (
    <article className='category__container'>
      <section>
        <span>{category.name}</span>
      </section>
      <section>
        <button className='category__btn'>
          <EditIcon />
        </button>
        {
          hasProducts?.length <= 0 &&
            <button
              className='category__btn category__btn--red'
              onClick={() => deleteModal.manualOn()}
            >
              <Trash />
            </button>
        }
      </section>
      {
        deleteModal.isOn &&
          <AdminDeleteModal
            item={category}
            itemType='Category'
            modalView={deleteModal}
            service={CategoriesService}
          />
      }
    </article>
  );
}

export { AdminCategoryCard };
