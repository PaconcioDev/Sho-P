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
    }

    return data;
  };

  const logout = () => {
    window.localStorage.removeItem('loggedShopUser');
    setUser(null);
  };

  return { login, logout };
}

export { useUser };
