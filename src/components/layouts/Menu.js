import Link from 'next/link';
import { isUserValidated, logoutUser } from '../../utils/auth-functions';
import { useEffect, useState } from 'react';
import isEmpty from '../../validator/isEmpty';

const Menu = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    if (process.browser) {
      logoutUser('/login');
    }
  };

  useEffect(() => {
    if (process.browser) {
      const userValidated = isUserValidated();

      // If user is not validated, then logout button should be shown.
      if (!isEmpty(userValidated)) {
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <ul className="wpd-main-nav">
      <li className="wpd-main-nav__list">
        <Link href="/login" className="wpd-main-nav__link">
          Login
        </Link>
      </li>
      <li className="wpd-main-nav__list">
        <Link href="/register" className="wpd-main-nav__link">
          Register
        </Link>
      </li>
      {loggedIn ? (
        <li className="wpd-main-nav__list">
          <a className="wpd-main-nav__link" onClick={handleLogout}>
            Logout
          </a>
        </li>
      ) : null}
    </ul>
  );
};

export default Menu;
