import { Fragment } from 'react';
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ( { cart } ) => {

	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="table table-hover">
						<thead>
						<tr className="wd-cart-head-container">
							<th className="wd-cart-heading-el" scope="col"/>
							<th className="wd-cart-heading-el" scope="col">Product</th>
							<th className="wd-cart-heading-el" scope="col">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CheckoutCartItem key={ item.productId } item={ item } />
							) )
						) }
						{/*Total*/}
						<tr className="">
							<td className=""/>
							<td className="wd-checkout-total">Subtotal</td>
							<td className="wd-checkout-total">${ cart.totalProductsPrice.toFixed(2) }</td>
						</tr>
						<tr className="">
							<td className=""/>
							<td className="wd-checkout-total">Total</td>
							<td className="wd-checkout-total">${ cart.totalProductsPrice.toFixed(2) }</td>
						</tr>
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
