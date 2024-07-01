import './CreateCategory.css';
import { useContext, useEffect, useRef } from 'react';
import { FormInput } from '../FormInput/FormInput';
import { CancelIcon } from '../../icons/CancelIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { useFormInput } from '../../hooks/useFormInput';
import { CategoriesService } from '../../services/categories';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

function CreateCategory ({ view }) {
  const { user } = useContext(ProductsContext);
  const newCategory = useFormInput({ type: 'text' });

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!formRef || !formRef.current || formRef.current.contains(e.target)) return;
      view.manualOff();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef, view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await CategoriesService.create(
        user.token,
        capitalizeFirstLetter(newCategory.value)
      );
      if (data) {
        view.manualOff();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className='category__form'
      action='submit'
      method='post'
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <FormInput
        {...newCategory}
        placeholder='New Category...'
        required
      />
      <section className='category__btn-container'>
        <button
          className='category__btn'
          type='submit'
        >
          <CheckIcon />
        </button>
        <button
          className='category__btn category__btn--red'
          onClick={(e) => {
            e.preventDefault();
            view.manualOff();
          }}
        >
          <CancelIcon />
        </button>
      </section>
    </form>
  );
}

export { CreateCategory };
