import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { closeProductDetail } = useContext(ProductContext);

  return (
    <aside className="product-detail flex flex-col border border-gray-800 rounded-l-lg bg-gray-50 z-10">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl">Detail</h2>
        <button onClick={() => closeProductDetail()}>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 hover:fill-purple-700"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export { ProductDetail };
