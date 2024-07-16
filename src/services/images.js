const baseUrl = 'http://localhost:3030/shop-api/v2/images';

class ImagesService {
  static async upload (token, productId, file) {
    const formData = new FormData();
    formData.append('image', file);

    const request = await fetch(`${baseUrl}/${productId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const response = request.json();
    return response;
  }

  static async deletePrevious (token, imageId) {
    const request = await fetch(`${baseUrl}/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = request.json();
    return response;
  }
}

export { ImagesService };
