import { addFirstProduct, addNewProduct, getIntVal } from "../utils/functions";

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

				const qtyToBeAdded = 1;

				const updatedProducts = addNewProduct( existingCart.products , product, qtyToBeAdded );

				const updatedCart = {
					products: updatedProducts,
					totalProductsCount: ( existingCart.totalProductsCount + qtyToBeAdded ),
					totalProductsPrice: existingCart.totalProductsPrice + ( getIntVal( product.price ) * qtyToBeAdded )
				};

				localStorage.setItem( 'wpd-cart', JSON.stringify( updatedCart ) );

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
