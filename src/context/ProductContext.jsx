import { createContext, useState, useEffect } from "react";
import { API_URL } from "../api";

const ProductContext = createContext();

const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account");
  const signOutInLocalStorage = localStorage.getItem("sign-out");
  let parsedAccount;
  let parsedSignOut;

  if (!accountInLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false));
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
};

const ProductProvider = ({ children }) => {
  //* My Account
  const [account, setAccount] = useState({});

  //* Sign Out
  const [signOut, setSignOut] = useState(true);

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
      setCartProducts([...cartProducts]);
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

  //* Shopping Cart - Order
  const [order, setOrder] = useState([]);

  //* Get Products
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  //* Search Products
  const [search, setSearch] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  const filterItems = (items, search) => {
    return items?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    if (search) {
      setFilteredItems(filterItems(items, search));
    } 
  }, [items, search]);

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
        order,
        setOrder,
        items,
        setItems,
        search,
        setSearch,
        filteredItems,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductProvider, initializeLocalStorage };
