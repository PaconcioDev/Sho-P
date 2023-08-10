import { useRoutes, BrowserRouter } from "react-router-dom";
import { ProductProvider } from "../context/ProductContext.jsx";
import { Home } from "../pages/home/Home.jsx";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { MyOrders } from "../pages/MyOrders/MyOrders.jsx";
import { MyOrder } from "../pages/MyOrder/MyOrder.jsx";
import { MyAccount } from "../pages/MyAccount/MyAccount.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { SignIn } from "../pages/SignIn/SignIn.jsx";
import { Layout } from "../components/Layout/Layout.jsx";
import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <NavBar />
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
