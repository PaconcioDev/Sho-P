import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrderCard } from "../../components/OrderCard/OrderCard.jsx";
import "./MyOrder.css";

function MyOrder() {
  const { order } = useContext(ProductContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = order?.length - 1;

  return (
    <>
      <div className="flex items-center justify-center w-80 relative mb-6">
        <Link to={"/Sho-P/my-orders"} className="absolute left-0 top-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:stroke-purple-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="mb-5 text-2xl font-bold text-gray-50 bg-purple-400 p-2 rounded-lg">My Order</h1>
      </div>
      <section className="my-order-card-section px-4 space-y-4 mb-4 overflow-y-scroll w-96">
        {order?.[index]?.products.map((product) => (
          <OrderCard key={product.id} product={product} />
        ))}
      </section>
      <section className="w-96 ml-11 mt-4 mb-2">
        <span className="text-2xl font-semibold">Total:</span>
        <span className="ml-5 font-bold text-xl">${order?.[index]?.totalPrice}</span>
        <hr className="mt-1 mb-4 bg-purple-300 border-transparent" />
      </section>
    </>
  );
}

export { MyOrder };
