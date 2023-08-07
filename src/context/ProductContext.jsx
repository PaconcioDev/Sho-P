import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  //* Shopping Cart - Count
  const [count, setCount] = useState(0);

  //* Product Detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const toggleProductDetail = () => setIsProductDetailOpen(!isProductDetailOpen);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //* Product Detail - Show Product
  const [productToShow, setProductToShow] = useState({})

  return (
    <ProductContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        toggleProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
