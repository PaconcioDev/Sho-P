const baseUrl = 'http://localhost:3030/shop-api/v2/users';

class UsersService {
  static async create ({ name, lastName, email, password, phone }) {
    const request = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        lastName,
        email,
        password,
        phone
      })
    });

    const data = await request.json();

    return data;
  }
}

export { UsersService };
