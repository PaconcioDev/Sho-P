import { useEffect, useState } from "react";
import "./Hamburger.css";

function Hamburger() {
  const [menu, setMenu] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/shop-api/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const renderCategories = () => {
    if (categories?.length > 0) {
      return categories.map((category) => (
        <li key={category.id} className="hamburger-menu__item">
          <a href="#">{category.name}</a>
          <hr className="hamburger-menu__underline" />
        </li>
      ));
    }
  };

  return (
    <>
      <button
        className="hamburger-menu__button"
        onClick={toggleMenu}
        type="checkbox"
      >
        <svg
          className="hamburger-menu__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>
      <section
        className={`hamburger-menu__section ${
          menu ? "hamburger-menu__section--active" : ""
        }`}
      >
        <button
          className="hamburger-menu__button hamburger-menu__button--close"
          onClick={toggleMenu}
        >
          <svg
            className="hamburger-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <ul className="hamburger-menu__list">{renderCategories()}</ul>
      </section>
      <div
        className="hamburger-menu__background-overlay"
        onClick={toggleMenu}
      ></div>
    </>
  );
}

export { Hamburger };
