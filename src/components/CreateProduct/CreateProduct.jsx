import './CreateProduct.css';
import { useContext, useState } from 'react';
import { useMessage } from '../../hooks/useMessage.js';
import { useFormInput } from '../../hooks/useFormInput.js';
import { FormInput } from '../FormInput/FormInput.jsx';
import { Modal } from '../Modal/Modal.jsx';
import { Message } from '../Message/Message.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { ImagesService } from '../../services/images.js';
import { ProductsService } from '../../services/products.js';

function CreateProduct ({ view }) {
  const { user, categories } = useContext(ProductsContext);
  const { onEvent, message } = useMessage();

  const [categoryValue, setCategoryValye] = useState(null);
  const name = useFormInput({ type: 'text', trim: false });
  const description = useFormInput({ type: 'text', trim: false });
  const price = useFormInput({ type: 'number' });

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl;
    let imageId;
    if (
      !file ||
      !name ||
      !description ||
      !price ||
      !categoryValue
    ) return;

    try {
      const { public_id: publicId, url } = await ImagesService.cloudinaryUpload(user.token, file);

      imageId = publicId;
      imageUrl = url;
    } catch (error) {
      console.error(error);
    }

    const newProduct = {
      name: name.value.trim(),
      description: description.value.trim(),
      category_id: parseInt(categoryValue, 10),
      price: parseInt(price.value, 10),
      image: imageUrl
    };

    try {
      const product = await ProductsService.create(user.token, newProduct);

      if (product.error) {
        await ImagesService.deleteCurrent(user.token, imageId);

        const errorMessage = product.error[0]?.message || product.error;
        onEvent(errorMessage);

        setTimeout(() => {
          onEvent();
        }, 3500);
        return;
      }
      const data = await ImagesService.upload(user.token, imageId, imageUrl, product.id);

      if (data.error) {
        onEvent(data.error);
        setTimeout(() => {
          onEvent();
        }, 3500);
        return;
      }

      onEvent(product);
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
      onClose={() => view.manualOff()}
    >
      <h3 className='create-product__title'>Create Product</h3>
      <form
        className='create-product__form'
        action='submit'
        method='post'
        onSubmit={handleSubmit}
      >
        <div className='create-product__sections'>
          <section className='create-product__img'>
            <input
              className='create-product__overlay create-product__overlay--front'
              type='file'
              name='image'
              required
              onChange={handleChange}
            />
            <div className='create-product__overlay'>
              <div>+</div>
            </div>
            <img src={imagePreview} />
          </section>
          <section className='create-product__info'>
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
                className='create-product__description'
                id='productDescription'
                placeholder='Describe your product here...'
                {...description}
                required
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
            <span className='create-product__container'>
              <label htmlFor='productCategory'>Category</label>
              <select
                className='create-product__category'
                id='productCategory'
                onChange={(e) => {
                  setCategoryValye(e.target.value);
                }}
                defaultValue=''
                required
              >
                <option disabled value=''>Select category...</option>
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
                <Message>Product created successfully!</Message>
            }
          </section>
        </div>
        <div className='create-product__btn'>
          <SubmitBtn>DONE</SubmitBtn>
        </div>
      </form>
    </Modal>
  );
}

export { CreateProduct };
