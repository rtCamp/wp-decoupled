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
 * @param newQty New qty of the product (optional)
 * @return {*[]}
 */
export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded, newQty = false ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingProductsInCart, product.productId );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];

		// If have new qty of the product available, set that else add the qtyToBeAdded
		updatedProduct.qty = ( newQty ) ? newQty : ( updatedProduct.qty + qtyToBeAdded );
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
 * @param product
 * @param qtyToBeAdded
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = ( existingCart, product, qtyToBeAdded ) => {

	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded );

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
 * @param productId
 * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
 */
const isProductInCart = ( existingProductsInCart, productId ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( productId === item.productId ) {
			return item;
		}
	};

	// This new array will only contain the product which is matched.
	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};

/**
 * Remove Item from the cart.
 *
 * @param productId
 * @return {any | string} Updated cart
 */
export const removeItemFromCart = ( productId ) => {
	let existingCart = localStorage.getItem( 'wpd-cart' );
	existingCart = JSON.parse( existingCart );

	// If there is only one item in the cart, delete the cart
	if ( 1 === existingCart.products.length ) {
		localStorage.removeItem( 'wpd-cart' );
		return null;
	}

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingCart.products, productId );

	// If product to be removed exits
	if ( -1 < productExitsIndex ) {
		const productTobeRemoved = existingCart.products[ productExitsIndex ];
		const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
		const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;

		// Remove that product from the array and update the total price and total quantity of the cart
		let updatedCart = existingCart;
			updatedCart.products.splice( productExitsIndex, 1 );
			updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
			updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

		localStorage.setItem( 'wpd-cart', JSON.stringify( updatedCart ) );
		return updatedCart;
	} else {
		return existingCart;
	}
};
