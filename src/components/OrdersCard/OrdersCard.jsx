const OrdersCard = ({ totalPrice, totalProducts }) => {
  return (
    <article className="flex justify-between items-center mb-3 border border-gray-700">
      <p>
        <span>01.02.23</span>
        <span>{totalProducts}</span>
        <span>{totalPrice}</span>
      </p>
    </article>
  );
};

export { OrdersCard };
