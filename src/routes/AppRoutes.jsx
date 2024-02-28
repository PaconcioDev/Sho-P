import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products/:categoryParam", element: <Home /> },
  ]);

  return routes;
};

export { AppRoutes };
