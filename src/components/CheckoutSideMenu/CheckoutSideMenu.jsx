import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrderCard } from "../OrderCard/OrderCard.jsx";
import "./CheckoutSideMenu.css";

const CheckoutSideMenu = () => {
  const { closeCheckoutSideMenu, cartProducts, setCartProducts, count, setCount } =
    useContext(ProductContext);

  const handleDelete = (id, quantity) => {
    const filteredProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    setCartProducts(filteredProducts);
    setCount(count - quantity)
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
        {cartProducts.map((product, index) => {
          return (
            <OrderCard
              key={`${product.id}_${index}`}
              product={product}
              handleDelete={handleDelete}
            />
          );
        })}
      </section>
    </aside>
  );
};

export { CheckoutSideMenu };
