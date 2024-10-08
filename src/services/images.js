const url = `${import.meta.env.VITE_BASE_URL}/images`;

class ImagesService {
  static async cloudinaryUpload (token, file) {
    const formData = new FormData();
    formData.append('image', file);

    const request = await fetch(`${url}/cloudinary`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const response = request.json();
    return response;
  }

  static async upload (token, publicId, imageUrl, productId) {
    const request = await fetch(`${url}/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ publicId, imageUrl })
    });

    const response = request.json();
    return response;
  }

  static async deleteCurrent (token, imageId) {
    const request = await fetch(`${url}/delete/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = request.json();
    return response;
  }

  static async deletePrevious (token, productId) {
    const request = await fetch(`${url}/${productId}`, {
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
