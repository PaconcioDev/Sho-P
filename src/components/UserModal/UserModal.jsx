import "./UserModal.css";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";

function UserModal() {
  const { user, setUser } = useContext(ProductsContext);

  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = (event) => {
    event.stopPropagation();
    setModal(!modal);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedShopUser");
    toggleModal();
  };

  // TODO: 1 State on NavBar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // TODO:1 console.log("added");

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // TODO:1 console.log("removed");
    };
  }, []);

  // TODO: REFACTOR ALL OF THIS
  return (
    <div ref={modalRef}>
      <button className="user-modal__button--toggle" onClick={toggleModal}>
        {!user ? (
          <svg
            className="user-modal__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        ) : (
          <svg
            className="user-modal__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        )}
      </button>
      <aside
        className={`user-modal ${modal ? "user-modal--active" : ""}`}
        ref={modalRef}
      >
        {!user ? (
          <>
            <NavLink
              className={"user-modal__link"}
              onClick={toggleModal}
              to={"/account/login"}
            >
              LOGIN
            </NavLink>
            <span className="user-modal__text">
              NEW USER?{" "}
              <NavLink onClick={toggleModal} to={"/account/register"}>
                REGISTER HERE
              </NavLink>
            </span>
          </>
        ) : (
          <>
            <NavLink
              className={"user-modal__link user-modal__link--account"}
              onClick={toggleModal}
              to={"/account/my-account"}
            >
              MY ACCOUNT
            </NavLink>
            <button className="user-modal__logout" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </aside>
    </div>
  );
}

export { UserModal };
