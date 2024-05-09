function DeleteAccountWarning ({ onHandleClick }) {
  return (
    <>

      <p className='modal__text'>
        Attention, before proceeding please take in count that by deleting your password you will lose access to your order history, your current orders and any other data associated to your account. When you delete your account you will be unable to retrieve or restore it, if you are sure that you want to delete your account click the button down below.
      </p>
      <div className='security__btn-container'>
        <button
          className='security__btn'
          onClick={onHandleClick}
        >
          I'M SURE
        </button>

      </div>
    </>
  );
}

export { DeleteAccountWarning };
