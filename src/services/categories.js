import { baseUrl } from './baseUrl.js';
const url = `${baseUrl}/categories`;

class CategoriesService {
  static async getAll () {
    const request = await fetch(url);
    const response = await request.json();
    return response;
  }

  static async findProducts ({ id }) {
    const request = await fetch(`${url}/${id}/products`);
    const response = await request.json();
    return response;
  }

  static async create (token, input) {
    const request = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: input })
    });
    const response = await request.json();
    return response;
  }

  static async update (id, token, name) {
    const request = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });
    const response = await request.json();
    return response;
  }

  static async delete (id, token) {
    const request = await fetch(`${url}/delete/${id}`, {
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
