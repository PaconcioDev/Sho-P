import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const Card = ({ data }) => {
  const { count, setCount } = useContext(ShoppingCartContext);

  return (
    <article className="bg-gray-50 cursor-pointer w-56 h-60 rounded-lg shadow-lg">
      <figure className="relative mb-2 w-full h-4/5">
        <span className="m-2 px-3 py-0.5 absolute bottom-0 left-0 bg-white/60 rounded-lg text-gray-900 text-sm capitalize">
          {data.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={data.image}
          alt={data.title}
        />
        <button
          className="m-2 p-1 absolute top-0 right-0 flex justify-center items-center bg-gray-50 w-6 h-6 rounded-full"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </figure>
      <p className="flex justify-between items-center px-4">
        <span className="text-sm font-light mr-2 truncate">{data.title}</span>
        <span className="text-lg font-bold">${data.price}</span>
      </p>
    </article>
  );
};

export { Card };
