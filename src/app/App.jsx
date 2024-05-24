import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop.jsx';
import { Footer } from '../components/Footer/Footer.jsx';
import { CartProvider } from '../context/CartContext.jsx';

const App = () => {
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
