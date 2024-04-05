import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { ProductsProvider } from '../context/ProductsContext.jsx';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop.jsx';

const App = () => {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ProductsProvider>
  );
};

export { App };
