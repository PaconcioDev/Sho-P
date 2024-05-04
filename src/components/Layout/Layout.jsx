import './Layout.css';

function Layout ({ children, title }) {
  return (
    <>
      <main className='layout__main'>
        <h2 className='layout__title'>{title}</h2>
        {children}
      </main>
    </>
  );
}

export { Layout };
