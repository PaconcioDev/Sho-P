import "./LogIn.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/apiUrl";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isUser, setIsUser] = useState({ isUser: true, message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setIsUser({ isUser: false, message: error });
      } else {
        setIsUser({ isUser: true, message: "" });
        navigate("/products/all");
      }
    } catch (error) {
      console.error(error.error);
    }
  };

  return (
    <>
      <h2 className="login__title">My Account</h2>
      <main className="login">
        <section className="login__box-container">
          <article className="login__box">
            <h3 className="login__subtitle">LOGIN</h3>
            <p className="login__text">
              If you already have an account, please log in.
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
              <input
                className="login__input"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="login__input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {isUser.isUser === false && <span className="login__failed">{isUser.message}</span>}
              <button className="login__button" type="submit">
                SIGN IN
              </button>
              <p className="login__recover-password">Forgot your password?</p>
            </form>
          </article>
          <article className="login__box">
            <h3 className="login__subtitle">NEW CUSTOMER?</h3>
            <p className="login__text">
              Registering for this site allows you to purchase items and to
              access to your orders and your order status. Creating an account
              only takes a few minutes.
            </p>
            <NavLink
              className={"login__button login__button--link"}
              to={"/account/register"}
            >
              CREATE AN ACCOUNT
            </NavLink>
          </article>
        </section>
      </main>
    </>
  );
}

export { LogIn };
