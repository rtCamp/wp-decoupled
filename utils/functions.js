/**
 * Create a new product object
 *
 * @param product
 * @param productPrice
 * @param qty
 * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
 */
export const createNewProduct = ( product, productPrice, qty ) => {
	return  {
		productId: product.productId,
		image: product.image,
		name: product.name,
		price: productPrice,
		qty,
		totalPrice: productPrice * qty
	};
};

/**
 * Add first product
 * @param product
 */
export const addFirstProduct = ( product ) => {

	let productPrice = getIntVal( product.price );
	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: productPrice
	};

	const newProduct = createNewProduct( product, productPrice, 1 );
	newCart.products.push( newProduct );
	localStorage.setItem( 'wpd-cart', JSON.stringify( newCart ) );
};

/**
 * Update the product if it exists else,
 * add the new product to existing cart,
 *
 * @param existingProductsInCart
 * @param product
 * @param qtyToBeAdded
 * @return {*[]}
 */
export const addNewProduct = ( existingProductsInCart, product, qtyToBeAdded ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingProductsInCart, product );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];
		updatedProduct.qty += qtyToBeAdded;
		updatedProduct.totalPrice = updatedProduct.price * updatedProduct.qty;

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let productPrice = getIntVal( product.price );
		const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
		existingProductsInCart.push( newProduct );
		return existingProductsInCart;
	}
};

/**
 * Returns index of the product if it exists
 *
 * @param existingProductsInCart
 * @param product
 * @return {number | *} Index Returns -1 if product does not exist in the array, index no otherwise
 */
const isProductInCart = ( existingProductsInCart, product ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( product.productId === item.productId ) {
			return item;
		}
	};

	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};

// Extracts and returns integer from a string.
export const getIntVal = ( string ) => {
	let intValue = string.match( /\d+/, 'i' )[0];
	return ( null !== intValue ) ? parseInt( intValue ) : '';
};
