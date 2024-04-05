const baseUrl = "http://localhost:3030/shop-api/v2/auth";

//TODO: Register
class AuthService {
  static async login(input) {
    const request = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    return request;
  }
}

export { AuthService };
