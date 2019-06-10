import Layout from "../components/layouts/Layout";
import Link from 'next/link';
import { withRouter } from 'next/router';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';

const Product = withRouter( props  => {

	const { product } = props;

	return (
		<Layout>
			{ product ? (
				<div>
					<h3>{product.name}</h3>
					<div className="products-wrapper">
						<div className="product-container" key={product.id}>
							<img className="product-image" src={product.image.sourceUrl} srcSet={product.image.srcSet} alt={ product.name }/>
							<h5 className="product-name">{product.name}</h5>
							<p className="product-price">${product.price}</p>
							<Link as={ `/product/${product.slug}` } href={`/product?id=${product.productId}`}><a className="product-view-link">Buy</a></Link>
						</div>
					</div>
				</div>
			) : '' }
		</Layout>

	)
} );

Product.getInitialProps = async function( context ) {

	const PRODUCT_QUERY = gql`query Product( $id: Int! ) {
		productBy( productId: $id ) {
			name
			price
			slug
			productId
			image {
				uri
				title
				srcSet
				sourceUrl
			}
		}
	}`;

	const { id } = context.query;

	const res = await client.query({
		query: PRODUCT_QUERY,
		variables: { id }
	});

	return {
		product: res.data.productBy
	}
};

export default Product
