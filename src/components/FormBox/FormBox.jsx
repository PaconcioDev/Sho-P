import './FormBox.css';

function FormBox ({ children }) {
  return (
    <article className='box'>
      {children}
    </article>
  );
}

export { FormBox };
