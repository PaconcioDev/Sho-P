const baseUrl = 'https://shop-api.up.railway.app/images';

class ImagesService {
  static async cloudinaryUpload (token, file) {
    const formData = new FormData();
    formData.append('image', file);

    const request = await fetch(`${baseUrl}/cloudinary`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const response = request.json();
    return response;
  }

  static async upload (token, publicId, url, productId) {
    const request = await fetch(`${baseUrl}/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ publicId, url })
    });

    const response = request.json();
    return response;
  }

  static async deleteCurrent (token, imageId) {
    const request = await fetch(`${baseUrl}/delete/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = request.json();
    return response;
  }

  static async deletePrevious (token, productId) {
    const request = await fetch(`${baseUrl}/${productId}`, {
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
