import "./LogIn.css";

function LogIn() {
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
            <form className="login__form">
              <input className="login__input" type="email" placeholder="Email" />
              <input className="login__input" type="password" placeholder="Password" />
              <button className="login__button" type="submit">SIGN IN</button>
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
            <button className="login__button">CREATE AN ACCOUNT</button>
          </article>
        </section>
      </main>
    </>
  );
}

export { LogIn };
