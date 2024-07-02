import './EditProduct.css';
import { useContext } from 'react';
import { useFormInput } from '../../hooks/useFormInput.js';
import { Modal } from '../Modal/Modal.jsx';
import { FormInput } from '../FormInput/FormInput.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';

function EditProduct ({ product, modalView }) {
  const { categories } = useContext(ProductsContext);

  const name = useFormInput({
    type: 'text',
    initialState: product.name
  });
  const price = useFormInput({
    type: 'number',
    initialState: product.price
  });

  return (
    <Modal
      onClose={() => modalView.manualOff()}
    >
      <h3>Edit Product</h3>
      <form
        className='edit-product__form'
        action='submit'
        method='patch'
      >
        <div className='edit-product__sections'>
          <section className='edit-product__img'>
            <div className='edit-product__overlay'>
              <div>+</div>
            </div>
            <img src={product.image} alt={product.name} />
          </section>
          <section className='edit-product__info'>
            <span>
              <label htmlFor='productName'>Name</label>
              <FormInput
                placeholder='Product Name'
                id='productName'
                {...name}
                required
              />
            </span>
            <span>
              <label htmlFor='productDescription'>Description</label>
              <textarea
                className='edit-product__description'
                id='productDescription'
              >{product.description}
              </textarea>
            </span>
            <span>
              <label htmlFor='productPrice'>Price</label>
              <FormInput
                placeholder='Product Price'
                id='productPrice'
                {...price}
                required
              />
            </span>
            <span className='edit-product__container'>
              <label htmlFor='productCategory'>Category</label>
              <select
                className='edit-product__category'
                id='productCategory'
                defaultValue={product.category.id}
              >
                {categories.map(category =>
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )}
              </select>
            </span>
          </section>
        </div>
        <div className='edit-product__btn'>
          <SubmitBtn>DONE</SubmitBtn>
        </div>
      </form>
    </Modal>
  );
}

export { EditProduct };
