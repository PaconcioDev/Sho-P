const baseUrl = 'http://localhost:3030/shop-api/v2/auth';

// TODO: Register
class AuthService {
  static async login ({ email, password }) {
    const request = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    return request;
  }

  static async sendPasswordEmail (email) {
    const request = await fetch(`${baseUrl}/recovery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await request.json();

    return data;
  }

  static async changePassword (token, newPassword) {
    const request = await fetch(`${baseUrl}/recover-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ password: newPassword })
    });

    const data = await request.json();

    return data;
  }
}

export { AuthService };
