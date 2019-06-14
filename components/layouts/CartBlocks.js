import { useContext } from 'react';
import { AppContext } from "../context/AppContext";

const CartBlocks = () => {

	const [ cart, setCart ] = useContext( AppContext );

	const handleRemoveProductClick = () => {

	};

	return (
		<div>
			{ ( null !== cart ) ? (
				<div className="wd-cart-wrapper container">
					<h1 className="wd-cart-heading">Cart</h1>
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
						{ cart.products.map( item => (
							<tr className="wd-cart-item" key={item.productId}>
								<th className="wd-cart-element wd-cart-el-close">
								<span className="wd-cart-close-icon" onClick={ handleRemoveProductClick }>
									<i className="fas fa-times-circle"/>
								</span>
								</th>
								<td className="wd-cart-element"><img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/> </td>
								<td className="wd-cart-element">{ item.name }</td>
								<td className="wd-cart-element">{ item.price.toFixed(2) }</td>
								<td className="wd-cart-element">{ item.qty }</td>
								<td className="wd-cart-element">{ item.totalPrice.toFixed(2) }</td>
							</tr>
						) )
						}
						</tbody>
					</table>

					{/*Cart Total*/}
					<div className="row wd-cart-total-container">
						<div className="col-6">
							<h2>Cart Totals</h2>
							<table className="table table-hover">
								<tbody>
								<tr className="table-light">
									<td className="wd-cart-element-total">Subtotal</td>
									<td className="wd-cart-element-amt">{ cart.totalProductsPrice.toFixed(2) }</td>
								</tr>
								<tr className="table-light">
									<td className="wd-cart-element-total">Total</td>
									<td className="wd-cart-element-amt">{ cart.totalProductsPrice.toFixed(2) }</td>
								</tr>
								</tbody>
							</table>
							<button className="btn wd-cart-checkout-btn">
								<span className="wd-cart-checkout-txt">Proceed to Checkout</span>
								<i className="fas fa-long-arrow-alt-right"/>
							</button>
						</div>
					</div>
				</div>
			) : ''}
		</div>

	);
};

export default CartBlocks;
