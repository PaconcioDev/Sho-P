import { createContext, useState, useEffect } from "react";
import { API_URL } from "../api/apiUrl";

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState({
    name: "all",
  });

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categoryFilter, setCategoryFilter, categories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext, CategoriesProvider };
