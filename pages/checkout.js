import { useState } from 'react';
import Layout from '../components/layouts/Layout';
import Billing from "../components/checkout/Billing";
import YourOrder from "../components/checkout/YourOrder";
import PaymentModes from "../components/checkout/PaymentModes";

const Checkout = () => {

	const initialState = {
		firstName: '',
		lastName: '',
		companyName: '',
		country: '',
		streetAddressOne: '',
		streetAddressTwo: '',
		city: '',
		county: '',
		postCode: '',
		phone: '',
		email: '',
		createAccount: false,
		orderNotes: '',
		paymentMode: ''
	};

	const [ input, setInput ] = useState( initialState );

	const handleFormSubmit = ( event ) => {
		event.preventDefault();
	};

	const handleOnChange = ( event ) => {

		if ( 'createAccount' === event.target.name ) {
			const newState = { ...input, [event.target.name]: ! input.createAccount };
			setInput( newState );
		} else {
			const newState = { ...input, [event.target.name]: event.target.value };
			setInput( newState );
		}
		console.warn( 'input', input.createAccount );
	};

	return (
		<Layout>
			<div className="container">
				<h1 className="mt-5 mb-4">Checkout Page.</h1>
				<form onSubmit={ handleFormSubmit } className="wd-checkout-form">
					<div className="row">
						{/*Billing Details*/}
						<div className="col-lg-6 col-md-12">
							<h2 className="mb-4">Billing Details</h2>
							<Billing input={ input } handleOnChange={ handleOnChange }/>
						</div>
						{/* Order & Payments*/}
						<div className="col-lg-6 col-md-12">
						{/*	Order*/}
							<h2 className="mb-4">Your Order</h2>
							<YourOrder/>
							<PaymentModes input={ input } handleOnChange={ handleOnChange }/>
							<div className="wd-place-order-btn-wrap mt-5">
								<button className="btn wd-large-black-btn wd-place-order-btn" type="submit">
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

