import { createContext, useState, useEffect } from 'react';
import { ProductsService } from '../services/products.js';
import { CategoriesService } from '../services/categories.js';

const ProductsContext = createContext();

function ProductsProvider ({ children }) {
  //* Products
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  //* Categories
  const [categories, setCategories] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState({
    name: 'all'
  });

  //* User
  const [user, setUser] = useState(() => {
    const loggedUserJson = window.localStorage.getItem('loggedShopUser');
    return loggedUserJson ? JSON.parse(loggedUserJson) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsArr = await ProductsService.getAll();
        const categoriesArr = await CategoriesService.getAll();
        setProducts(productsArr);
        setCategories(categoriesArr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        search,
        setSearch,
        categoryFilter,
        setCategoryFilter,
        categories,
        user,
        setUser
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
