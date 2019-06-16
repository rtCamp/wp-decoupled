import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';
import AddToCartButton from "../components/cart/AddToCartButton";

/**
 * GraphQL products query
 */
const PRODUCTS_QUERY = gql`query {
					products {
						nodes {
							id
							productId
							averageRating
							slug
							image {
								uri
								title
								srcSet
								sourceUrl
							}
							name
							price
						}
					}
				}`;

const Index = ( props ) => {

	const { products } = props;

	return (
		<Layout>
			<div className="wp-block-cover alignfull hero">
				<div className="wp-block-cover__inner-container">
					<h1 >Welcome</h1>
						<p className="has-text-color">This is your homepage which is what most visitors will see when they first visit your shop.</p>
						<p className="has-text-color">You can change this text by editing the “Welcome” page via the “Pages” menu in your dashboard.</p>
				</div>
			</div>
			{ products.length ? (
				<div>
					<h3 className="text-center">Products</h3>
					<div className="products-wrapper">
						{
							products.map( item => (
								<div className="product-container" key={item.id}>
									<img className="product-image" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={ item.name }/>
									<h5 className="product-name">{item.name}</h5>
									<p className="product-price">${item.price}</p>
									<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?slug=${item.slug}-${item.productId}`}><a className="product-view-link">View</a></Link>
									<AddToCartButton product={ item } />
								</div>
							) )
						}
					</div>
				</div>
					) : '' }
				</Layout>
			);
};

Index.getInitialProps = async () => {

	const result = await client.query({
		query: PRODUCTS_QUERY
	});

	return {
		products: result.data.products.nodes,
	}
};
export default Index;

