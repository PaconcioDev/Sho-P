const baseUrl = 'http://localhost:3030/shop-api/v2/products';

class ProductsService {
  static async getAll () {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
  }

  static async delete (id, token) {
    console.log(id);
    console.log(token);
    const request = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = await request.json();
    return response;
  }
}

export { ProductsService };
