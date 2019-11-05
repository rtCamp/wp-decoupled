import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { removeItemFromCart } from '../../../utils/cart-functions';
import CartItem from "./CartItem";

const CartBlocks = () => {


	const [ cart, setCart ] = useContext( AppContext );

	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = ( event, productId ) => {

		const updatedCart = removeItemFromCart( productId );
		setCart( updatedCart );
	};

	return (
		<div>
			{ cart ? (
				<div className="wd-cart-wrapper container">
					<h1 className="wd-cart-heading mt-5">Cart</h1>
					<table className="table table-hover">
						<thead>
						<tr className="wd-cart-head-container">
							<th className="wd-cart-heading-el" scope="col"/>
							<th className="wd-cart-heading-el" scope="col"/>
							<th className="wd-cart-heading-el" scope="col">Product</th>
							<th className="wd-cart-heading-el" scope="col">Price</th>
							<th className="wd-cart-heading-el" scope="col">Quantity</th>
							<th className="wd-cart-heading-el" scope="col">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CartItem
									key={ item.productId }
									item={ item }
									handleRemoveProductClick={ handleRemoveProductClick }
									setCart={ setCart }
								/>
							) )
						) }
						</tbody>
					</table>

					{/*Cart Total*/ }
					<div className="row wd-cart-total-container">
						<div className="col-6">
							<h2>Cart Totals</h2>
							<table className="table table-hover">
								<tbody>
								<tr className="table-light">
									<td className="wd-cart-element-total">Subtotal</td>
									<td className="wd-cart-element-amt">${ cart.totalProductsPrice.toFixed( 2 ) }</td>
								</tr>
								<tr className="table-light">
									<td className="wd-cart-element-total">Total</td>
									<td className="wd-cart-element-amt">${ cart.totalProductsPrice.toFixed( 2 ) }</td>
								</tr>
								</tbody>
							</table>
							<Link href="/checkout">
								<button className="btn wd-large-black-btn">
									<span className="wd-cart-checkout-txt">Proceed to Checkout</span>
									<i className="fas fa-long-arrow-alt-right"/>
								</button>
							</Link>
						</div>
					</div>
				</div>
			) : '' }
		</div>

	);
};

export default CartBlocks;
