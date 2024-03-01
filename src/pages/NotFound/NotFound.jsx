import "./NotFound.css";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found__container">
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__text">The page you requested does not exist.</p>
      <NavLink className={"not-found__btn"} to={"/products/all"}>
        Continue Shopping
      </NavLink>
    </div>
  );
}

export { NotFound };
