import './MyAccount.css';
import { useContext, useEffect, useState } from 'react';
import { UsersService } from '../../services/users';
import { ProductsContext } from '../../context/ProductsContext.jsx';
import { Layout } from '../../components/Layout/Layout.jsx';
import { FormBox } from '../../components/FormBox/FormBox.jsx';
import { AccountInfo } from '../../components/AccountInfo/AccountInfo.jsx';
import { AccountSecurity } from '../../components/AccountSecurity/AccountSecurity.jsx';

function MyAccount () {
  const { user } = useContext(ProductsContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () => async () => {
      const data = await UsersService.findOne({ id: user.id });
      setCurrentUser(data);
    }
    , []);

  return (
    !currentUser
      ? <p>Loading...</p>
      : (
        <Layout title='My Account'>
          <section className='my-account__box-container'>
            <FormBox>
              <AccountInfo currentUser={currentUser} user={user} />
            </FormBox>
            <FormBox>
              <AccountSecurity />
            </FormBox>
          </section>
        </Layout>
        )
  );
}

export { MyAccount };
