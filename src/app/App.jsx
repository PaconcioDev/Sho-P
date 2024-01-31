import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes.jsx";
import { NavBar } from "../components/NavBar/NavBar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export { App };
