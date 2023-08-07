import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { NavLink } from "react-router-dom";
import { NavItem } from "../NavItem/NavItem";

const NavBar = () => {
  const { count } = useContext(ProductContext);

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
        <li className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 fill-purple-400"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>

          <div>{count}</div>
        </li>
      </ul>
    </nav>
  );
};

export { NavBar };
