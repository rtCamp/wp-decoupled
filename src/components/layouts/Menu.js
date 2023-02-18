// External.
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

// Internal.
import { isUserValidated, logoutUser } from '../../utils/auth-functions';
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
    });

    return (
        <ul className="wpd-main-nav">
            <li className="wpd-main-nav__list">
                <Link className="wpd-main-nav__link" href="/login">
                    Login
                </Link>
            </li>
            <li className="wpd-main-nav__list">
                <Link className="wpd-main-nav__link" href="/register">
                    Register
                </Link>
            </li>
            {loggedIn ? (
                <li className="wpd-main-nav__list">
                    <Button className="wpd-main-nav__link" onClick={handleLogout}>
                        Logout
                    </Button>
                </li>
            ) : (
                ''
            )}
        </ul>
    );
};

export default Menu;
