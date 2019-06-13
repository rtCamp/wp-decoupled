import { useContext } from 'react';
import { AppContext } from "./context/AppContext";
import { addFirstProduct, getUpdatedProducts, updateCart } from "../utils/functions";

const AddToCartButton = ( props ) => {

	const { product } = props;
	const [ state, setState ] = useContext( AppContext );

	/**
	 * Handles adding items to the cart
	 */
	const handleAddToCartClick = () => {

		// If component is rendered client side.
		if ( process.browser ) {
			let existingCart = localStorage.getItem( 'wpd-cart' );

			// If cart has item(s) already, update existing or add new item.
			if ( existingCart ) {

				existingCart = JSON.parse( existingCart );

				const qtyToBeAdded = 1;

				const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded );

				const updatedCart = updateCart( existingCart, updatedProducts, product, qtyToBeAdded );

				setState( updatedCart );

			} else {
				/**
				 * If No Items in the cart, create an empty array and add one
				 * @type {Array}
				 */
				const newCart = addFirstProduct( product );
				setState( newCart );
			}
		}
	};
	console.warn( 'state', state );

	return(
		<React.Fragment>
			<button onClick={ handleAddToCartClick } className="btn btn-secondary">Add to cart</button>
		</React.Fragment>
	)
};

export default AddToCartButton;
