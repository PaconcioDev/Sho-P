import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { ProductDetail } from "../pages/ProductDetail/ProductDetail.jsx";
import { LogIn } from "../pages/LogIn/LogIn.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products", element: <Navigate replace to={"/products/all"} /> },
    { path: "/products/:categoryParam", element: <Home /> },
    {
      path: "/products/:categoryParam/:productName",
      element: <ProductDetail />,
    },
    { path: "/account/login", element: <LogIn /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

export { AppRoutes };
