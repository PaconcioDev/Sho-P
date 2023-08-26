import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { ProductProvider, initializeLocalStorage } from "../context/ProductContext.jsx";
import { Layout } from "../components/Layout/Layout.jsx";
import { AppRoutes } from "../routes/AppRoutes.jsx";
import "./App.css";

const App = () => {
  initializeLocalStorage()

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
