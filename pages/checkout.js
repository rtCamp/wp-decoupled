import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import Billing from "../components/checkout/Billing";
import YourOrder from "../components/checkout/YourOrder";
import PaymentModes from "../components/checkout/PaymentModes";

const Checkout = () => {

	return (
		<Layout>
			<div className="container">
				<h1 className="mt-5 mb-4">Checkout Page.</h1>
				<form className="wd-checkout-form">
					<div className="row">
						{/*Billing Details*/}
						<div className="col-lg-6 col-md-12">
							<h2 className="mb-4">Billing Details</h2>
							<Billing/>
						</div>
						{/* Order & Payments*/}
						<div className="col-lg-6 col-md-12">
						{/*	Order*/}
							<h2 className="mb-4">Your Order</h2>
							<YourOrder/>
							<PaymentModes/>
							<div className="wd-place-order-btn-wrap mt-5">
								<button className="wd-large-black-btn wd-place-order-btn" type="submit">
									Place Order
								</button>
							</div>
						{/*Payment*/}
						</div>
					</div>
				</form>
			</div>
		</Layout>
	)
};

export default Checkout;

