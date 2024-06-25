const baseUrl = 'http://localhost:3030/shop-api/v2/categories';

class CategoriesService {
  static async getAll () {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
  }

  static async findProducts ({ id }) {
    const request = await fetch(`${baseUrl}/${id}/products`);
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

export { CategoriesService };
