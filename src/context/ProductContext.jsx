import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  
  const toggleProductDetail = () => {
    setIsProductDetailOpen(!isProductDetailOpen)
  }

  const closeProductDetail = () => {
    setIsProductDetailOpen(false)
  }

  return (
    <ProductContext.Provider value={{
      count,
      setCount, 
      isProductDetailOpen,
      toggleProductDetail,
      closeProductDetail
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
