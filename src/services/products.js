const baseUrl = 'http://localhost:3030/shop-api/v2/products';

class ProductsService {
  static async getAll () {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
  }

  static async create (token, input) {
    const request = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });

    const response = await request.json(input);
    return response;
  }

  static async update (id, token, input) {
    const request = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    const response = await request.json();
    return response;
  }

  static async delete (id, token) {
    const request = await fetch(`${baseUrl}/delete/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = await request.json();
    return response;
  }
}

export { ProductsService };
