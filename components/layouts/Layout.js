import '../../styles/sass/styles.scss';
import '../../styles/vendor/bootstrap.min.css';
import Head from 'next/head';
import Header from "./Header";
import Footer from "./Footer";

const Layout = ( props ) => (
	<div>
		<Head>
			<title>WP Decoupled</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
		</Head>
		<Header/>
		<div className="wd-content">
			{props.children}
		</div>
		<Footer/>
	</div>
);

export default Layout;
