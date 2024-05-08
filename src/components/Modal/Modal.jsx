import './Modal.css';

function Modal ({ onClose, children }) {
  return (
    <div className='modal__backdrop' onClick={onClose}>
      <aside className='modal'>
        {children}
      </aside>
    </div>
  );
}

export { Modal };
