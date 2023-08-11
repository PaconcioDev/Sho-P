import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { OrdersCard } from "../../components/OrdersCard/OrdersCard.jsx";

function MyOrders() {
  const { order } = useContext(ProductContext);

  return (
    <>
      <div className="flex items-center justify-center w-80 relative">
        <h1 className="mb-5 text-2xl font-bold text-gray-50 bg-purple-400 p-2 rounded-lg">My Orders</h1>
      </div>
      {order.map((order, index) => (
        <OrdersCard
          key={index}
          index={index}
          totalPrice={order.totalPrice}
          totalProducts={order.totalProducts}
        />
      ))}
    </>
  );
}

export { MyOrders };
