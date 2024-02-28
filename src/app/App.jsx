import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes.jsx";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { CategoriesProvider } from "../context/CategoriesContext.jsx";

const App = () => {
  return (
    <CategoriesProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </CategoriesProvider>
  );
};

export { App };
