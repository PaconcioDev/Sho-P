import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { closeProductDetail, productToShow } = useContext(ProductContext);

  return (
    <aside className="product-detail flex flex-col border border-gray-300 rounded-l-lg bg-gray-50 z-10">
      <div className="pr-4 pt-4 absolute right-0 top-0">
        <button onClick={() => closeProductDetail()}>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 hover:fill-purple-600 bg-gray-300 bg-opacity-50 rounded-full"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <figure>
        <img
          className="w-full h-auto rounded-lg"
          src={productToShow.image}
          alt={productToShow.name}
        />
        <figcaption className="flex flex-col p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-900 font-bold text-2xl w-1/2">
              {productToShow.name}
            </span>
            <span className="text-gray-900 font-semibold text-xl bg-purple-400 p-2 rounded-lg shadow-lg">
              ${productToShow.price}
            </span>
          </div>
          <span className="text-gray-900 font-light">
            {productToShow.description}
          </span>
        </figcaption>
      </figure>
    </aside>
  );
};

export { ProductDetail };
