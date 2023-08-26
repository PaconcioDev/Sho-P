import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ProductContext } from "../context/ProductContext.jsx";
import { Home } from "../pages/home/Home.jsx";
import { MyOrders } from "../pages/MyOrders/MyOrders.jsx";
import { MyOrder } from "../pages/MyOrder/MyOrder.jsx";
import { MyAccount } from "../pages/MyAccount/MyAccount.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { SignIn } from "../pages/SignIn/SignIn.jsx";

const AppRoutes = () => {
  const { signOut } = useContext(ProductContext);
  const parsedSignOut = JSON.parse(localStorage.getItem("sign-out"))
  const isSignOut = signOut || parsedSignOut

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-orders", element: !isSignOut ? <MyOrders /> : <Navigate replace to={"/sign-in"}/> },
    { path: "/my-order", element: !isSignOut ? <MyOrder /> : <Navigate replace to={"/sign-in"}/> },
    { path: "/my-orders/last", element: !isSignOut ? <MyOrder /> : <Navigate replace to={"/sign-in"}/> },
    { path: "/my-orders/:id", element: !isSignOut ? <MyOrder /> : <Navigate replace to={"/sign-in"}/> },
    { path: "/my-account", element: !isSignOut ? <MyAccount /> : <Navigate replace to={"/sign-in"}/> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

export { AppRoutes };
