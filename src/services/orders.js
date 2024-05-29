const baseUrl = 'http://localhost:3030/shop-api/v2/orders';

class OrdersService {
  static async findOrderById ({ orderId }) {
    const request = await fetch(`${baseUrl}/order/${orderId}`);

    const response = await request.json();
    return response;
  }

  static async create ({ token, userId, orderItems, total }) {
    const request = await fetch(`${baseUrl}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        orderItems,
        total
      })
    });

    const response = await request.json();
    return response;
  }
}

export { OrdersService };
