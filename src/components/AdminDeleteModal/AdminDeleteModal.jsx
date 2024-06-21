import './AdminDeleteModal.css';
import { useContext } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { ProductsContext } from '../../context/ProductsContext.jsx';

function AdminDeleteModal ({ item, itemType, modalView, service }) {
  const { user } = useContext(ProductsContext);

  const handleDelete = async () => {
    try {
      const data = await service.delete(
        item.id,
        user.token
      );
      if (data.message) {
        modalView.manualOff();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onClose={() => {
      modalView.manualOff();
    }}
    >
      <h3>Delete {itemType}</h3>
      <p>Are you sure that you want to delelte
        <strong> {item.name}?</strong>
      </p>
      <button
        className='delete__btn'
        onClick={handleDelete}
      >
        I'm sure
      </button>
    </Modal>
  );
}

export { AdminDeleteModal };
