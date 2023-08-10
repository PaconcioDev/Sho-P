import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrderCard } from "../../components/OrderCard/OrderCard.jsx";
import "./MyOrder.css";

function MyOrder() {
  const { order } = useContext(ProductContext);

  return (
    <>
      <div className="flex items-center justify-center w-80 relative mb-6">
        <Link to={"/my-orders"} className="absolute left-0">
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
        <h1>My Order</h1>
      </div>
      <section className="my-order-card-section px-4 space-y-4 mb-4 overflow-y-scroll">
        {order?.slice(-1)[0].products.map((product) => (
          <OrderCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

export { MyOrder };
