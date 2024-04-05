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

  useEffect(
    () => async () => {
      const productsArr = await ProductsService.getAll();
      const categoriesArr = await CategoriesService.getAll();
      setProducts(productsArr);
      setCategories(categoriesArr);
    },
    []
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        search,
        setSearch,
        categoryFilter,
        setCategoryFilter,
        categories
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
