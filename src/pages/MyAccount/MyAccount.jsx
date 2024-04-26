import './MyAccount.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser.js';
import { UsersService } from '../../services/users';

function MyAccount () {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useUser();

  useEffect(
    () => {
      const fetchData = async () => {
        if (user) {
          const data = await UsersService.findOne({ id: user.id });
          setCurrentUser(data);
        }
      };

      fetchData();
    }, [user]);

  return (
    !currentUser
      ? <p>Loading...</p>
      : (
        <>
          <h1>My Account</h1>
          <section>
            <p>First Name: {currentUser.name}</p>
            <p>Last Name: {currentUser.lastName}</p>
            <p>Email: {currentUser.email}</p>
            {currentUser.phone && <p>Phone: {currentUser.phone}</p>}
          </section>
        </>
        )
  );
}

export { MyAccount };
