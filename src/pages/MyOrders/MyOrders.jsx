import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrdersCard } from "../../components/OrdersCard/OrdersCard.jsx";

function MyOrders() {
  const { order } = useContext(ProductContext);

  return (
    <>
      <div className="flex items-center justify-center w-80 relative">
        <h1>My Orders</h1>
      </div>
      {order.map((order, index) => {
        <Link key={index} to={`/my-orders/${order.id}`}>
          <OrdersCard
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts}
          />
          ;
        </Link>;
      })}
    </>
  );
}

export { MyOrders };
