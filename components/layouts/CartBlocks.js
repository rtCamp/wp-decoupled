import { useContext } from 'react';
import { AppContext } from "../context/AppContext";

const CartBlocks = () => {

	const [ cart, setCart ] = useContext( AppContext );

	return (
		<div>
			{ ( null !== cart ) ? (
				<table className="table table-hover">
					<thead>
					<tr>
						<th scope="col"/>
						<th scope="col"/>
						<th scope="col">Product</th>
						<th scope="col">Price</th>
						<th scope="col">Quantity</th>
						<th scope="col">Total</th>
					</tr>
					</thead>
					<tbody>
					{ cart.products.map( item => (
						<tr className="table-active" key={item.productId}>
							<th>X</th>
							<td><img width="50" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/> </td>
							<td>{ item.name }</td>
							<td>{ item.price }</td>
							<td>{ item.qty }</td>
							<td>{ item.totalPrice }</td>
						</tr>
					) )
					}
					</tbody>
				</table>
			) : ''}
		</div>
	);
};

export default CartBlocks;
