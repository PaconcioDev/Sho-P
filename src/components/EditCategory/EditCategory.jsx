import './EditCategory.css';
import { useContext } from 'react';
import { useFormInput } from '../../hooks/useFormInput.js';
import { useMessage } from '../../hooks/useMessage.js';
import { Modal } from '../Modal/Modal.jsx';
import { FormInput } from '../FormInput/FormInput.jsx';
import { SubmitBtn } from '../SubmitBtn/SubmitBtn.jsx';
import { Message } from '../Message/Message.jsx';
import { CategoriesService } from '../../services/categories.js';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

function EditCategory ({ category, modalView }) {
  const { user } = useContext(ProductsContext);

  const name = useFormInput({
    type: 'text',
    initialState: category.name
  });

  const { message, onEvent } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await CategoriesService.update(category.id, user.token, capitalizeFirstLetter(name.value));
      if (data.error) {
        const errorMessage = data.error[0]?.message || data.error;
        onEvent(errorMessage);
        setTimeout(() => {
          onEvent();
        }, 5000);
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onClose={() => modalView.manualOff()}>
      <h3>Edit category name</h3>
      <form
        action='submit'
        method='patch'
        onSubmit={handleSubmit}
      >
        <FormInput
          {...name}
        />
        {
          message.isActive &&
            <div className='edit-category__message-container'>
              <Message isError>{message.info}</Message>
            </div>
        }
        <div className='btn__container'>
          <SubmitBtn>
            DONE
          </SubmitBtn>
        </div>
      </form>
    </Modal>
  );
}

export { EditCategory };
