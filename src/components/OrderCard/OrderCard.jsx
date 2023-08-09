import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

const OrderCard = ({ product, handleDelete }) => {
  const { onAdd } = useContext(ProductContext);

  return (
    <article className="flex justify-evenly items-center">
      <section className="w-full h-full flex items-center gap-2">
        <button
          className="mr-1 w-10 h-10 rounded-md hover:bg-red-400 hover:transition-all hover:duration-500 hover:ease-in-out"
          onClick={() => handleDelete(product.id, product.quantity)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 p-2 hover:stroke-gray-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <figure className="w-20 h-20 border border-transparent shadow-xl">
          <img
            className="h-full w-full rounded-lg object-cover"
            src={product.image}
            alt={product.title}
          />
        </figure>
        <div className="flex flex-col w-2/3 h-20 justify-around">
          <p className="text-sm font-medium mb-2 w-3/4 line-clamp-2">
            {product.title}
          </p>
          <p className="text-sm font-semibold bg-purple-400 rounded-md py-1 px-2 text-gray-50 w-fit">
            ${(product.price * product.quantity).toFixed(2)}
          </p>
        </div>
      </section>
      <section className="flex items-center gap-4 mr-2">
        {product.quantity > 1 && (
          <button 
            className="h-7 w-7 rounded-lg hover:bg-red-400 hover:text-gray-50"
            //TODO: onClick={() => onRemove()}
          >
            -
          </button>
        )}
        <p className="text-lg font-medium">{product.quantity}</p>
        <button
          className="h-7 w-7 rounded-lg hover:bg-green-300 hover:text-gray-50"
          onClick={() => onAdd(product)}
        >
          +
        </button>
      </section>
    </article>
  );
};

export { OrderCard };
