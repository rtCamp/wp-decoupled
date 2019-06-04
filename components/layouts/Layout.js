import '../../styles/sass/styles.scss';
import '../../styles/vendor/bootstrap.min.css';
import Head from 'next/head';
import Header from "./Header";

const Layout = ( props ) => (
	<div>
		<Head>
			<title>WP Decouple</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<Header/>
		{props.children}
	</div>
);

export default Layout;
