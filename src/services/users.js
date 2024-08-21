const url = `${import.meta.env.VITE_BASE_URL}/users`;

class UsersService {
  static async create ({ role, name, lastName, email, password, phone }) {
    const request = await fetch(`${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role,
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

  static async findOne ({ id }) {
    const request = await fetch(`${url}/${id}`);
    const data = await request.json();

    return data;
  }

  static async update (id, token, input) {
    const request = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });

    const data = await request.json();

    return data;
  }

  static async delete (id, token, password) {
    const request = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    });

    const data = request.json();

    return data;
  }
}

export { UsersService };
