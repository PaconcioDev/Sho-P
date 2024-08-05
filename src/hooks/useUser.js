import { useContext } from 'react';
import { AuthService } from '../services/auth.js';
import { ProductsContext } from '../context/ProductsContext.jsx';

function useUser () {
  const { setUser } = useContext(ProductsContext);

  const login = async ({ email, password }) => {
    const res = await AuthService.login({ email, password });
    const data = await res.json();

    if (!data.error) {
      window.localStorage.setItem('loggedShopUser', JSON.stringify(data));
      setUser(data);

      const loggedTime = new Date().toISOString();
      window.localStorage.setItem('loggedTime', loggedTime);
    }

    return data;
  };

  const logout = () => {
    window.localStorage.removeItem('loggedShopUser');
    window.localStorage.removeItem('loggedTime');
    setUser(null);
  };

  const checkSession = () => {
    const loggedTime = window.localStorage.getItem('loggedTime');
    if (!loggedTime) return;

    const currentDate = new Date();
    const loginDate = new Date(loggedTime);
    const timeDiff = Math.abs(currentDate - loginDate);
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (daysDiff > 7) {
      logout();
      window.localStorage.removeItem('loggedTime');
    }
  };

  return { login, logout, checkSession };
}

export { useUser };
