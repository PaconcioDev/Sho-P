import './EditProduct.css';
import { useContext, useState } from 'react';
import { useFormInput } from '../../hooks/useFormInput.js';
import { Modal } from '../Modal/Modal.jsx';
import { FormInput } from '../FormInput/FormInput.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { Message } from '../Message/Message.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { ProductsService } from '../../services/products.js';
import { ImagesService } from '../../services/images.js';
import { useMessage } from '../../hooks/useMessage.js';

function EditProduct ({ product, modalView }) {
  const { categories, user } = useContext(ProductsContext);

  const name = useFormInput({
    type: 'text',
    initialState: product.name
  });
  const price = useFormInput({
    type: 'number',
    initialState: product.price
  });

  const { message, onEvent } = useMessage();

  const [descriptionValue, setDescriptionValue] = useState(product.description);
  const [categoryValue, setCategoryValue] = useState(product.category.id);
  const [imagePreview, setImagePreview] = useState(product.image);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = product.image;
    if (file) {
      try {
        const deletedImage = await ImagesService.deletePrevious(user.token, product.id);
        if (!deletedImage) return;

        const data = await ImagesService.upload(user.token, product.id, file);
        if (data.message) {
          onEvent(data.message);
          setTimeout(() => {
            onEvent();
          }, 3500);
          return;
        }
        uploadedImageUrl = data;
      } catch (error) {
        console.error(error);
      }
    }

    const newProduct = {
      name: name.value,
      description: descriptionValue,
      category_id: parseInt(categoryValue, 10),
      price: parseInt(price.value, 10),
      image: uploadedImageUrl
    };

    try {
      const data = await ProductsService.update(product.id, user.token, newProduct);
      if (data.error) {
        const errorMessage = data.error[0]?.message || data.error;
        onEvent(errorMessage);
        setTimeout(() => {
          onEvent();
        }, 3500);
        return;
      }

      onEvent(data);
      setTimeout(() => {
        onEvent();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      onClose={() => modalView.manualOff()}
    >
      <h3 className='edit-product__title'>Edit Product</h3>
      <form
        className='edit-product__form'
        action='submit'
        method='patch'
        onSubmit={handleSubmit}
      >
        <div className='edit-product__sections'>
          <section className='edit-product__img'>
            <input
              className='edit-product__overlay edit-product__overlay--front'
              type='file'
              name='image'
              onChange={handleChange}
            />
            <div className='edit-product__overlay'>
              <div>+</div>
            </div>
            <img src={imagePreview} alt={product.name} />
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
                defaultValue={product.description}
                onChange={(e) => {
                  setDescriptionValue(e.target.value);
                }}
              />
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
                onChange={(e) => {
                  setCategoryValue(e.target.value);
                }}
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
            {
              (message.isActive && !message.info.name) &&
                <Message isError>{message.info}</Message>
            }
            {
              (message.isActive && message.info.name) &&
                <Message>Product updated successfully</Message>
            }
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
