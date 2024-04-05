const baseUrl = "http://localhost:3030/shop-api/v2/categories";

class CategoriesService {
  static async getAll() {
    const request = await fetch(baseUrl);
    const response = await request.json();
    return response;
  }
}

export { CategoriesService };
