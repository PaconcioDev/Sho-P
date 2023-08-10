import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrderCard } from "../OrderCard/OrderCard.jsx";
import { totalPrice } from "../../utils/totalPrice.js";
import "./CheckoutSideMenu.css";

const CheckoutSideMenu = () => {
  const {
    closeCheckoutSideMenu,
    cartProducts,
    setCartProducts,
    count,
    setCount,
    order,
    setOrder,
  } = useContext(ProductContext);

  const handleDelete = (id, quantity) => {
    const filteredProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    setCartProducts(filteredProducts);
    setCount(count - quantity);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.02.23",
      products: cartProducts,
      totalProducts: count,
      totalPrice: totalPrice(cartProducts),
    };
    setOrder([...order, orderToAdd]);
    setCartProducts([])
    setCount(0);
    closeCheckoutSideMenu()
  };

  return (
    <aside className="checkout-side-menu flex flex-col border border-gray-300 rounded-l-lg bg-gray-50 z-10">
      <section className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <button onClick={() => closeCheckoutSideMenu()}>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 hover:fill-purple-600"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </section>
      <section className="order-card-section px-4 space-y-4 mb-4 overflow-y-scroll ">
        {cartProducts.map((product) => {
          return (
            <OrderCard
              key={product.id}
              product={product}
              handleDelete={handleDelete}
            />
          );
        })}
      </section>
      {cartProducts.length >= 1 && (
        <section className="px-20 mt-4 mb-2">
          <span className="text-2xl font-semibold">Total:</span>
          <span className="ml-5 font-bold text-xl">
            ${totalPrice(cartProducts)}
          </span>
          <hr className="mt-1 mb-4 bg-purple-300 border-transparent" />
          <Link to="/my-orders/last">
            <button
              onClick={() => handleCheckout()}
              className="w-full py-3 rounded-md font-semibold text-lg bg-purple-400 text-gray-50"
            >
              Checkout
            </button>
          </Link>
        </section>
      )}
    </aside>
  );
};

export { CheckoutSideMenu };
