import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.js';

function useUser () {
  const [user, setUser] = useState(null);

  const login = async ({ formData }) => {
    const res = await AuthService.login(formData);
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
    window.location.reload();
  };

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedShopUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
    }
  }, []);

  return { user, login, logout };
}

export { useUser };
