import './AdminProductCard.css';
import { NavLink } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle.js';
import { AdminDeleteModal } from '../AdminDeleteModal/AdminDeleteModal.jsx';
import { EditProduct } from '../EditProduct/EditProduct.jsx';
import { ProductsService } from '../../services/products.js';
import { Trash } from '../../icons/Trash.jsx';
import { EditIcon } from '../../icons/EditIcon.jsx';
import { normalizeString } from '../../utils/normalizeString.js';

function AdminProductCard ({ product }) {
  const deleteModal = useToggle();
  const editModal = useToggle();

  const normalizedCategory = normalizeString(product.category.name);
  const normalizedName = normalizeString(product.name);
  const productUrl = `${normalizedCategory}/${normalizedName}`;

  return (
    <>
      <article className='product-admin'>
        <section className='product-admin__img-section'>
          <NavLink
            className='product-admin__img-link'
            to={`/products/${productUrl}`}
          >
            <img src={product.image} alt={product.name} />
          </NavLink>
        </section>
        <div>
          <section className='product-admin__info'>
            <NavLink
              className='product-admin__name'
              to={`/products/${productUrl}`}
            >
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
            <button
              className='product-admin__btn'
              onClick={() => editModal.manualOn()}
            >
              <EditIcon />
            </button>
            <button
              className='product-admin__btn product-admin__btn--red'
              onClick={() => deleteModal.manualOn()}
            >
              <Trash />
            </button>
          </section>
        </div>
      </article>
      {
        deleteModal.isOn &&
          <AdminDeleteModal
            item={product}
            itemType='Product'
            modalView={deleteModal}
            service={ProductsService}
          />
      }
      {
        editModal.isOn &&
          <EditProduct
            product={product}
            modalView={editModal}
          />
      }
    </>
  );
}

export { AdminProductCard };
