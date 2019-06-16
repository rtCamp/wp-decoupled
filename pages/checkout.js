import Layout from '../components/layouts/Layout';
import Link from 'next/link';

const Checkout = () => {

	return (
		<Layout>
			<div className="container">
				<h2 className="mt-5">Checkout Page.</h2>
				<h3>Page under construction. Come back soon...</h3>
				<Link href="/"><button className="btn btn-primary">Back to Home</button></Link>
			</div>
		</Layout>
	)
};

export default Checkout;

