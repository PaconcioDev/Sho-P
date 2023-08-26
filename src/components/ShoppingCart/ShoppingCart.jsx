import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

const ShoppingCart = () => {
  const { count, toggleCheckoutSideMenu, closeProductDetail } =
    useContext(ProductContext);

  return (
    <button
      className="flex items-center gap-2 relative"
      onClick={() => {
        toggleCheckoutSideMenu();
        closeProductDetail();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <div className="w-5 h-5 text-xs font-semibold text-gray-50 flex justify-center items-center absolute bottom-2.5 left-6 rounded-full bg-purple-400">{count > 9 ? "+9" : count}</div>
    </button>
  );
};

export { ShoppingCart };
