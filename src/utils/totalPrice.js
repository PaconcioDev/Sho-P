const totalPrice = (products) => {
  const total =  products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  return total.toFixed(2)
};

export { totalPrice };