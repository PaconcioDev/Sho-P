import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/Home/Home.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Navigate replace to={"/Sho-P"} /> },
    { path: "/Sho-P", element: <Home /> },
  ]);

  return routes;
};

export { AppRoutes };
