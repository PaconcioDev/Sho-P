import { useContext } from 'react';
import { AuthService } from '../services/auth.js';
import { ProductsContext } from '../context/ProductsContext.jsx';

function useUser () {
  const { user, setUser } = useContext(ProductsContext);

  const login = async ({ email, password }) => {
    const res = await AuthService.login({ email, password });
    const data = await res.json();

    if (!data.error) {
      window.localStorage.setItem('loggedShopUser', JSON.stringify(data));
      setUser(data);
    }

    return data;
  };

  const logout = () => {
    window.localStorage.removeItem('loggedShopUser');
    window.localStorage.removeItem('loggedTime');
    setUser(null);
  };

  const checkExpiredToken = async () => {
    try {
      const isExpired = await AuthService.checkExpiredToken(user.token);
      return isExpired;
    } catch (error) {
      console.error(error);
    }
  };

  return { login, logout, checkExpiredToken };
}

export { useUser };
