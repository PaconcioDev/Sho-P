import { baseUrl } from './baseUrl.js';
const url = `${baseUrl}/auth`;

class AuthService {
  static async login ({ email, password }) {
    const request = await fetch(`${url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    return request;
  }

  static async checkExpiredToken (token) {
    const request = await fetch(`${url}/check-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await request.json();
    return data;
  }

  static async sendPasswordEmail (email) {
    const request = await fetch(`${url}/recovery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await request.json();

    return data;
  }

  static async changePassword (token, id, currentPassword, newPassword) {
    const request = await fetch(`${url}/change-password/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, password: newPassword })
    });

    const data = await request.json();

    return data;
  }

  static async recoverPassword (token, newPassword) {
    const request = await fetch(`${url}/recover-password`, {
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
