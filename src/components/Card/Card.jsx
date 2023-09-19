import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

const Card = ({ data }) => {
  const {
    toggleProductDetail,
    setProductToShow,
    closeCheckoutSideMenu,
    onAdd,
  } = useContext(ProductContext);

  return (
    <article
      className="bg-gray-50 cursor-pointer w-56 h-60 rounded-lg shadow-lg"
      onClick={() => {
        toggleProductDetail();
        closeCheckoutSideMenu();
        setProductToShow(data);
      }}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="m-2 px-3 py-0.5 absolute bottom-0 left-0 bg-white/60 rounded-lg text-gray-900 text-sm capitalize">
          {data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={data.image}
          alt={data.name}
        />
        <button
          className="m-2 p-1 absolute top-0 right-0 flex justify-center items-center bg-gray-50 w-6 h-6 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(data);
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </figure>
      <p className="flex justify-between items-center px-4">
        <span className="text-sm font-light mr-2 truncate">{data.name}</span>
        <span className="text-lg font-bold">${data.price}</span>
      </p>
    </article>
  );
};


export { Card };
