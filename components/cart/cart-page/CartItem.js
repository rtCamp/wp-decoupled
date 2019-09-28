import { useState } from 'react';
import { updateCart } from "../../../utils/cart-functions";

const CartItem = ( { item, handleRemoveProductClick, setCart } ) => {

	const [ productCount, setProductCount ] = useState( item.qty );

	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = ( event ) => {

		if ( process.browser ) {

			const newQty = event.target.value;

			// Set the new qty in State
			setProductCount( newQty );

			let existingCart = localStorage.getItem( 'wpd-cart' );
			existingCart = JSON.parse( existingCart );

			// Update the cart in localStorage.
			const updatedCart = updateCart( existingCart, item, false, newQty );

			// Update the cart in global context
			setCart( updatedCart );

		}
	};

	return (
		<tr className="wd-cart-item" key={item.productId}>
			<th className="wd-cart-element wd-cart-el-close">
				<span className="wd-cart-close-icon" onClick={ ( event ) => handleRemoveProductClick( event, item.productId )  }>
					<i className="fas fa-times-circle"/>
				</span>
			</th>
			<td className="wd-cart-element">
				<img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td>
			<td className="wd-cart-element">{ item.name }</td>
			<td className="wd-cart-element">${ item.price.toFixed(2) }</td>

			{/* Qty Input */}
			<td className="wd-cart-element">
				<input
					type="number"
					min="1"
					className="wd-cart-qty-input"
					value={ productCount }
					onChange={ handleQtyChange }
				/>
			</td>
			<td className="wd-cart-element">{ item.totalPrice.toFixed(2) }</td>
		</tr>
	)
};

export default CartItem;
