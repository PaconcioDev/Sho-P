import './Hamburger.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle.js';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { normalizeString } from '../../utils/normalizeString.js';
import { ListIcon } from '../../icons/ListIcon.jsx';
import { CloseIcon } from '../../icons/CloseIcon.jsx';

function Hamburger () {
  const menu = useToggle();
  const { setCategoryFilter, categories } = useContext(ProductsContext);

  const handleCategory = category => {
    const newCategoryName = normalizeString(category.name);
    setCategoryFilter({
      name: newCategoryName
    });
  };

  const renderCategories = () => {
    if (categories?.length > 0) {
      return categories.map(category => (
        <li key={category.id} className='hamburger-menu__item'>
          <NavLink
            to={`/products/${normalizeString(category.name)}`}
            onClick={() => {
              handleCategory(category);
              menu.handleState();
            }}
          >
            {category.name}
          </NavLink>
          <hr className='hamburger-menu__underline' />
        </li>
      ));
    }
  };

  return (
    <>
      <button
        className='hamburger-menu__button'
        onClick={menu.handleState}
      >
        <ListIcon />
      </button>
      <div
        className={`hamburger-menu__backdrop ${menu.isOn ? 'hamburger-menu__backdrop--active' : ''}`}
        onClick={() => menu.manualOff()}
      />
      <aside
        className={`hamburger-menu__section ${menu.isOn ? 'hamburger-menu__section--active' : ''}`}
      >
        <button
          className='hamburger-menu__button hamburger-menu__button--close'
          onClick={menu.handleState}
        >
          <CloseIcon />
        </button>
        <h2 className='hamburger-menu__title'>Categories</h2>
        <ul className='hamburger-menu__list'>{renderCategories()}</ul>
      </aside>
    </>
  );
}

export { Hamburger };
