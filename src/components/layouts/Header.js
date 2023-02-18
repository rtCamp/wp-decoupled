// External.
import Router from 'next/router';
import NProgress from 'nprogress';

// Internal.
import Nav from './Nav';

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const Header = () => <Nav />;

export default Header;
