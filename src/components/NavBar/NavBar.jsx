import { NavLink } from "react-router-dom";
import { NavItem } from "../NavItem/NavItem";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-4 px-8 text-sm font-light top-0 shadow-xl bg-gray-100">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg text-purple-500">
          <NavLink to="/">Sho-P</NavLink>
        </li>
        <li>
          <NavItem to={"/"}>All</NavItem>
        </li>
        <li>
          <NavItem to={"/clothes"}>Clothes</NavItem>
        </li>
        <li>
          <NavItem to={"/electronics"}>Electronics</NavItem>
        </li>
        <li>
          <NavItem to={"./furnitures"}>Furnitures</NavItem>
        </li>
        <li>
          <NavItem to={"/toys"}>Toys</NavItem>
        </li>
        <li>
          <NavItem to={"/others"}>Others</NavItem>
        </li>
      </ul>
      <ul className="flex items-center gap-4">
        <li className="text-gray-400">paco@example.com</li>
        <li>
          <NavItem to={"/my-orders"}>My Orders</NavItem>
        </li>
        <li>
          <NavItem to={"/my-account"}>My Account</NavItem>
        </li>
        <li>
          <NavItem to={"/sign-in"}>Sign In</NavItem>
        </li>
        <li>🛒0</li>
      </ul>
    </nav>
  );
};

export { NavBar };
