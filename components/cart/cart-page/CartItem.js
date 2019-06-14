import { useState } from 'react';

const CartItem = ( { item, handleRemoveProductClick } ) => {

	const [ productCount, setProductCount ] = useState( item.qty );

	const handleQtyChange = ( event ) => {
		setProductCount( event.target.value );
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
			<td className="wd-cart-element">{ item.price.toFixed(2) }</td>

			{/* Qty Input */}
			<td className="wd-cart-element">
				<input
					type="number"
					min="0"
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
