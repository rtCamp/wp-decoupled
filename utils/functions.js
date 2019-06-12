/**
 * Add first product
 * @param product
 */
export const addFirstProduct = ( product ) => {
	let newCart = {
		products: [],
		totalProductsCount: 1,
	};

	let productPrice = product.price.match( /\d+/, 'i' )[0];
	productPrice = null !== productPrice ? parseInt( productPrice ) : '';

	const newProduct = {
		productId: product.productId,
		image: product.image,
		name: product.name,
		price: productPrice,
		qty: 1,
		totalPrice: productPrice
	};
	newCart.products.push( newProduct );
	localStorage.setItem( 'wpd-cart', JSON.stringify( newCart ) );
};
