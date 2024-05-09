import './Modal.css';

function Modal ({ onClose, children }) {
  return (
    <div className='modal__backdrop' onClick={onClose}>
      <aside className='modal' onClick={(e) => e.stopPropagation()}>
        {children}
      </aside>
    </div>
  );
}

export { Modal };
