const CheckoutCartItem = ( { item } ) => {
	return (
		<tr className="wd-cart-item" key={ item.productId }>
			<td className="wd-cart-element">
				<img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td>
			<td className="wd-cart-element">{ item.name }</td>
			<td className="wd-cart-element">${ item.totalPrice.toFixed(2) }</td>
		</tr>
	)
};

export default CheckoutCartItem;
