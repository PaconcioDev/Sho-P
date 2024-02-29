import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";
import { NotFound } from "../components/NotFound/NotFound.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products/:categoryParam", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

export { AppRoutes };
