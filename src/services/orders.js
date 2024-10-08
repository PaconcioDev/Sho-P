const url = `${import.meta.env.VITE_BASE_URL}/orders`;

class OrdersService {
  static async findOrderById ({ orderId }) {
    const request = await fetch(`${url}/order/${orderId}`);

    const response = await request.json();
    return response;
  }

  static async findOrderByUserId ({ token, userId }) {
    const request = await fetch(`${url}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const response = await request.json();
    return response;
  }

  static async create ({ token, userId, orderItems, total }) {
    const request = await fetch(`${url}/${userId}`, {
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
