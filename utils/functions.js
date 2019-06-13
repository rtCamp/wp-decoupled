/**
 * Extracts and returns float value from a string.
 *
 * @param string
 * @return {any}
 */
export const getFloatVal = ( string ) => {
	let floatValue = string.match( /[+-]?\d+(\.\d+)?/g )[0];
	return ( null !== floatValue ) ? parseFloat( parseFloat( floatValue ).toFixed( 2 ) ) : '';
};

/**
 * Create a new product object.
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
		totalPrice: parseFloat( ( productPrice * qty ).toFixed( 2 ) )
	};
};

/**
 * Add first product.
 *
 * @param product
 * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
 */
export const addFirstProduct = ( product ) => {

	let productPrice = getFloatVal( product.price );
	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: parseFloat( productPrice.toFixed( 2 ) )
	};

	const newProduct = createNewProduct( product, productPrice, 1 );
	newCart.products.push( newProduct );

	localStorage.setItem( 'wpd-cart', JSON.stringify( newCart ) );

	return newCart;
};

/**
 * Get updated products array
 * Update the product if it exists else,
 * add the new product to existing cart,
 *
 * @param existingProductsInCart
 * @param product
 * @param qtyToBeAdded
 * @return {*[]}
 */
export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingProductsInCart, product );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];
		updatedProduct.qty += qtyToBeAdded;
		updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let productPrice = getFloatVal( product.price );
		const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
		existingProductsInCart.push( newProduct );
		return existingProductsInCart;
	}
};

/**
 * Updates the existing cart with new item.
 *
 * @param existingCart
 * @param updatedProducts
 * @param product
 * @param qtyToBeAdded
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = ( existingCart, updatedProducts, product, qtyToBeAdded ) => {
	let totalPrice = ( existingCart.totalProductsPrice + ( getFloatVal( product.price ) * qtyToBeAdded ) ).toFixed( 2 )
	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: ( existingCart.totalProductsCount + qtyToBeAdded ),
		totalProductsPrice: parseFloat( totalPrice )
	};
	localStorage.setItem( 'wpd-cart', JSON.stringify( updatedCart ) );

	return updatedCart;
};

/**
 * Returns index of the product if it exists.
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
