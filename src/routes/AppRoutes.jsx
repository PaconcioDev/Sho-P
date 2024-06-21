import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home/Home.jsx';
import { NotFound } from '../pages/NotFound/NotFound.jsx';
import { ProductDetail } from '../pages/ProductDetail/ProductDetail.jsx';
import { LogIn } from '../pages/LogIn/LogIn.jsx';
import { MyAccount } from '../pages/MyAccount/MyAccount.jsx';
import { Register } from '../pages/Register/Register.jsx';
import { RecoverPassword } from '../pages/RecoverPassword/RecoverPassword.jsx';
import { ChangePassword } from '../pages/ChangePassword/ChangePassword.jsx';
import { ProductsContext } from '../context/ProductsContext.jsx';
import { Order } from '../pages/Order/Order.jsx';
import { MyOrders } from '../pages/MyOrders/MyOrders.jsx';
import { AdminTools } from '../pages/AdminTools/AdminTools.jsx';

const AppRoutes = () => {
  const { user } = useContext(ProductsContext);

  const routes = useRoutes([
    { path: '/', element: <Navigate replace to='/products/all' /> },
    { path: '/products', element: <Navigate replace to='/products/all' /> },
    { path: '/products/:categoryParam', element: <Home /> },
    {
      path: '/products/:categoryParam/:productName',
      element: <ProductDetail />
    },
    {
      path: '/account',
      element: <Navigate replace to='/account/login' />
    },
    {
      path: '/account/login',
      element: !user
        ? (
          <LogIn />
          )
        : (
          <Navigate replace to='/account/my-account' />
          )
    },
    {
      path: '/account/register',
      element: !user
        ? (
          <Register />
          )
        : (
          <Navigate replace to='/account/my-account' />
          )
    },
    {
      path: '/account/my-account',
      element: !user
        ? (
          <Navigate replace to='/account/login' />
          )
        : (
          <MyAccount />
          )
    },
    { path: '/account/recovery/:token', element: <RecoverPassword /> },
    {
      path: '/account/change-password',
      element: !user
        ? (
          <Navigate replace to='/account/login' />
          )
        : (
          <ChangePassword />
          )
    },
    {
      path: '/my-orders/order/:id',
      element: !user
        ? (
          <Navigate replace to='/account' />
          )
        : (
          <Order />
          )
    },
    {
      path: '/my-orders',
      element: !user
        ? (
          <Navigate replace to='/account' />
          )
        : (
          <MyOrders />
          )
    },
    {
      path: '/admin-tools',
      element: user?.role !== 'admin'
        ? (
          <NotFound />
          )
        : (
          <AdminTools />
          )
    },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

export { AppRoutes };
