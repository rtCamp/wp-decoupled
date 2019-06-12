import { addFirstProduct } from "../utils/functions";

const AddToCartButton = ( props ) => {

	const { product } = props;

	/**
	 * Handles adding items to the cart
	 */
	const handleAddToCartClick = () => {

		// If component is rendered client side.
		if ( process.browser ) {
			let existingCart = localStorage.getItem( 'wpd-cart' );
			if ( existingCart ) {
				existingCart = JSON.parse( existingCart );
				console.warn( 'existingCart', existingCart );

			} else {
				/**
				 * If No Items in the cart, create an empty array and add one
				 * @type {Array}
				 */
				addFirstProduct( product );
			}
		}
	};

	return(
		<React.Fragment>
			<button onClick={ handleAddToCartClick } className="btn btn-secondary">Add to cart</button>
		</React.Fragment>
	)
};

export default AddToCartButton;
