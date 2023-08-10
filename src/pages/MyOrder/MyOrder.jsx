import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrderCard } from "../../components/OrderCard/OrderCard.jsx";
import "./MyOrder.css";

function MyOrder() {
  const { order } = useContext(ProductContext);

  return (
    <div>
      <h1>This is my MyOrder</h1>
      <section className="my-order-card-section px-4 space-y-4 mb-4 overflow-y-scroll">
        {order?.slice(-1)[0].products.map((product) => (
          <OrderCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export { MyOrder };
