import { useState, useContext } from 'react';
import Billing from "./Billing";
import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import { AppContext } from "../context/AppContext";
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import client from "../ApolloClient";
import { ApolloProvider, Mutation } from "react-apollo";
import { isUserValidated } from "../../utils/auth-functions";
import gql from 'graphql-tag';
import isEmpty from "../../validator/isEmpty";
import Router from "next/dist/client/router";

/**
 * Create Order user Mutation query
 */
const CREATE_ORDER = gql`
  mutation CreateOrder( $customerId: Int! $lineItems: [LineItemInput]! ) {
	  createOrder(input: {
	    clientMutationId: "myid",
	    customerId: $customerId
	    lineItems: $lineItems
	  }) {
	    order {
	      currency
	      orderId
	    }
	  }
  }
`;

const CheckoutForm = () => {

	const [ cart ] = useContext( AppContext );

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
		paymentMode: '',
		errors: null
	};

	const [ input, setInput ] = useState( initialState );

	/*
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleFormSubmit = async ( event, createOrder ) => {

		if ( process.browser ) {

			event.preventDefault();

			const userValidated = isUserValidated();

			// Step:1 If user is not logged in, send him to login page.
			if ( isEmpty( userValidated ) ) {
				Router.push( '/login' );
			}

			// Step:2 User is logged in, do form validation.
			// const result = validateAndSanitizeCheckoutForm( input );
			//
			// if ( ! result.isValid ) {
			// 	setInput( { ...input,  errors: result.errors } );
			// }

			const customerId = userValidated.user.userId;



			if ( cart.products.length ) {

			}

			// Step: 3 Create Order
			await createOrder( { variables: { customerId, lineItems } } )
				.then( response => console.warn( 'response', response ) )
				.catch( err => console.warn( 'error', err.graphQLErrors[ 0 ].message ) );

		}
	};

	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleOnChange = ( event ) => {

		if ( 'createAccount' === event.target.name ) {
			const newState = { ...input, [event.target.name]: ! input.createAccount };
			setInput( newState );
		} else {
			const newState = { ...input, [event.target.name]: event.target.value };
			setInput( newState );
		}
	};


	return (
		<ApolloProvider client={ client }>
			<Mutation mutation={ CREATE_ORDER }>
				{ ( createOrder, { loading, error } ) => (
					cart ? (
						<form onSubmit={ ( event ) => handleFormSubmit( event, createOrder ) } className="wd-checkout-form">
							<div className="row">
								{/*Billing Details*/ }
								<div className="col-lg-6 col-md-12">
									<h2 className="mb-4">Billing Details</h2>
									<Billing input={ input } handleOnChange={ handleOnChange }/>
								</div>
								{/* Order & Payments*/ }
								<div className="col-lg-6 col-md-12">
									{/*	Order*/ }
									<h2 className="mb-4">Your Order</h2>
									<YourOrder cart={ cart }/>

									{/*Payment*/ }
									<PaymentModes input={ input } handleOnChange={ handleOnChange }/>
									<div className="wd-place-order-btn-wrap mt-5">
										<button className="btn wd-large-black-btn wd-place-order-btn" type="submit">
											Place Order
										</button>
									</div>
								</div>
							</div>
						</form>
					) : ''
				)

				}
			</Mutation>
		</ApolloProvider>
	);
};

export default CheckoutForm;
