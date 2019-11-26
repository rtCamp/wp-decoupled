import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';
import AddToCartButton from "../components/cart/AddToCartButton";
import Hero from "../components/home/Hero";


const SimpleProductFragment = gql`
   fragment SimplePr on SimpleProduct {
        price
      }
`;

/**
 * GraphQL products query.
 */
const PRODUCTS_QUERY = gql`query GET_ALL_PRODUCT {
					products(first: 50) {
						nodes {
							id
							productId
							averageRating
							slug
							description
							image {
								uri
								title
								srcSet
								sourceUrl
							}
							name
							...SimplePr
						}
					}
					
				}
				${SimpleProductFragment}
				`;

// const NewProducts = ({ products }) => {
//
// 	console.warn( products );
//
// 	return (
// 		<div className="container mt-5">
// 			<h2 className="text-center mb-5">Products</h2>
// 			{ products.length ? (
// 				<div className="mt-2">
// 					<div className="products-wrapper row">
// 						{
// 							products.map( item => {
// 								if ( item.price ) {
// 									return (
// 										<div className="product-container col-md-3 mb-5" key={item.id}>
// 											<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?slug=${item.slug}-${item.productId}`}>
// 												<a>
// 											<span className="product-link">
// 												<img className="product-image" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={ item.name }/>
// 												<h5 className="product-name">{item.name}</h5>
// 												<p className="product-price">{item.price}</p>
// 											</span>
// 												</a>
// 											</Link>
// 											<AddToCartButton product={ item } />
// 										</div>
// 									)
// 								}
// 							} )
// 						}
// 					</div>
// 				</div>
// 			) : '' }
// 		</div>
// 	);
// };

const NewProducts = ({ products }) => {

	console.warn( products );

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-5">Products</h2>
			{ products.length ? (
				<div className="mt-2">
					<div className="products-wrapper row">
						{
							products.map( item => {
									return (
										<div className="product-container col-md-3 mb-5" key={item.id}>
											<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?slug=${item.slug}-${item.productId}`}>
												<a>
											<span className="product-link">
												<img className="product-image" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={ item.name }/>
												<h5 className="product-name">{item.name}</h5>
												<p className="product-price">$30</p>
											</span>
												</a>
											</Link>
											<AddToCartButton product={ item } />
										</div>
									)
							} )
						}
					</div>
				</div>
			) : '' }
		</div>
	);
};

const Index = ( props ) => {

	const { products } = props;
	console.warn( products );

	return (
		<Layout>
			<Hero/>
			{/*<Categories/>*/}
			{/*<NewProducts products={ products } />*/}
		</Layout>
	);
};

Index.getInitialProps = async () => {

	const result = await client.query({
		query: PRODUCTS_QUERY
	});

	return {
		products: result.data
	}
};

export default Index;
