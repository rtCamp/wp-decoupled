import Link from 'next/link';
import CartIcon from '../cart/CartIcon';
import Menu from './Menu';
import isEmpty from '../../validator/isEmpty';
import { isUserValidated, logoutUser } from '../../utils/auth-functions';
import React, { useEffect, useState } from 'react';

const Nav = ({items}) => {
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
        <nav className="wd-navbar navbar navbar-expand-lg navbar-dark bg-primary">
            <Link href="/">
                <a className="navbar-brand">WP Decoupled</a>
            </Link>
            {/* @TODO Need to add support for login and registration api for latest version of wp-graphql-woocommerce plugin */}
            <Menu items={items}/>
            <ul className="wpd-main-nav">
                {loggedIn ? (
                    <li className="wpd-main-nav__list">
                        <Link href={menu?.path}>
                            <a className="wpd-main-nav__link" onClick={handleLogout}>
                                Logout
                            </a>
                        </Link>
                    </li>
                ) : (
                    <React.Fragment>
                        <li className="wpd-main-nav__list">
                            <Link href="/login">
                                <a className="wpd-main-nav__link">Login</a>
                            </Link>
                        </li>
                        <li className="wpd-main-nav__list">
                            <Link href="/register">
                                <a className="wpd-main-nav__link">Register</a>
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"></button>
            <div className="collapse navbar-collapse" id="navbarColor01"></div>
            <div className="cart">
                <CartIcon />
            </div>
        </nav>
    );
};

export default Nav;
