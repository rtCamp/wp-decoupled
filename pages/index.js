import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';

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
									<Link as={`/product/${item.slug}-${item.productId}`} href={`/product?id=${item.productId}`}><a className="product-view-link">View</a></Link>
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
		products: result.data.products.nodes
	}
};
export default Index;

