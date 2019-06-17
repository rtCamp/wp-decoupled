import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import Billing from "../components/checkout/Billing";

const Checkout = () => {

	return (
		<Layout>
			<div className="container">
				<h1 className="mt-5 mb-4">Checkout Page.</h1>
				<div className="row">
					{/*Billing Details*/}
					<div className="col-lg-6 col-md-12">
						<h2 className="mb-4">Billing Details</h2>
						<Billing/>
					</div>
					{/* Order & Payments*/}
					<div className="col-lg-6 col-md-12">
					{/*	Order*/}
					{/*Payment*/}
					</div>
				</div>
			</div>
		</Layout>
	)
};

export default Checkout;

