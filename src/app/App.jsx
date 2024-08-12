import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import { useUser } from '../hooks/useUser.js';
import { ProductsContext } from '../context/ProductsContext.jsx';

const App = () => {
  const { user } = useContext(ProductsContext);
  const { checkExpiredToken, logout } = useUser();

  useEffect(() => {
    if (user !== null) {
      const checkToken = async () => {
        const isExpired = await checkExpiredToken();
        if (isExpired.value) logout();
      };

      checkToken();

      const intervalId = setInterval(() => {
        checkToken();
      }, 1000 * 60 * 60);

      return () => clearInterval(intervalId);
    }
  }, [user]);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};

export { App };
