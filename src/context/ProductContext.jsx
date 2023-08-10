import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  //* Shopping Cart - Count
  const [count, setCount] = useState(0);

  //* Shopping Cart - Add Products To Cart
  const [cartProducts, setCartProducts] = useState([]);
  
  const onAdd = (product) => {
    const productExists = cartProducts.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (!productExists) {
      product.quantity = 1;
      setCartProducts([...cartProducts, product]);
    } else {
      const productCart = cartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );
      productCart.quantity += 1;
      setCartProducts([...cartProducts])
    }
    setCount(count + 1);
  };

  //* Product Detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const toggleProductDetail = () =>
    setIsProductDetailOpen(!isProductDetailOpen);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //* Product Detail - Show Product
  const [productToShow, setProductToShow] = useState({});

  //* Checkout Side Menu - Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const toggleCheckoutSideMenu = () =>
    setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  return (
    <ProductContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        toggleProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        toggleCheckoutSideMenu,
        closeCheckoutSideMenu,
        onAdd,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
