import { NavLink } from "react-router-dom";
import "./NavItem.css"

const NavItem = ({children, to}) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) => (isActive ? "navbar__item navbar__item-active navbar__item-hover" : "navbar__item navbar__item-hover")}
    >
      {children}
    </NavLink>
  )
}

export {NavItem}; 