import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { NavLink } from "react-router-dom";
import { NavItem } from "../NavItem/NavItem";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart.jsx";

const NavBar = () => {
  const { signOut, setSignOut, account } = useContext(ProductContext);

  const signOutInLocalStorage = localStorage.getItem("sign-out");
  const parserdSignOutInLocalStorage = JSON.parse(signOutInLocalStorage);
  const isUserSignOut = signOut || parserdSignOutInLocalStorage;

  const accountInLocalStorage = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountInLocalStorage);

  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = account
    ? Object.keys(account).length === 0
    : true;
  const hasAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    localStorage.setItem("sign-out", JSON.stringify(true));
    setSignOut(true);
  };

  const renderView = () => {
    if (!hasAnAccount && isUserSignOut) {
      return (
        <li>
          <NavItem to={"/Sho-P/sign-in"} onClick={() => handleSignOut()}>
            Sign In
          </NavItem>
        </li>
      );
    } else {
      return (
        <>
          <li className="text-gray-400">{parsedAccount?.email}</li>
          <li>
            <NavItem to={"/Sho-P/my-orders"}>My Orders</NavItem>
          </li>
          <li>
            <NavItem to={"/Sho-p/my-account"}>My Account</NavItem>
          </li>
          <li>
            <NavItem to={"/Sho-P/sign-in"}>Sign Out</NavItem>
          </li>
          <li>
            <ShoppingCart />
          </li>
        </>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-4 px-8 text-sm font-light top-0 shadow-xl bg-gray-100">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg text-purple-500">
          <NavLink to="/Sho-P">Sho-P</NavLink>
        </li>
        <li>
          <NavItem to={"/Sho-P"}>All</NavItem>
        </li>
        <li>
          <NavItem to={"/Sho-P/clothes"}>Clothes</NavItem>
        </li>
        <li>
          <NavItem to={"/Sho-P/electronics"}>Electronics</NavItem>
        </li>
        <li>
          <NavItem to={"/Sho-P/furnitures"}>Furnitures</NavItem>
        </li>
        <li>
          <NavItem to={"/Sho-P/toys"}>Toys</NavItem>
        </li>
        <li>
          <NavItem to={"/Sho-P/others"}>Others</NavItem>
        </li>
      </ul>
      <ul className="flex items-center gap-4">{renderView()}</ul>
    </nav>
  );
};

export { NavBar };
