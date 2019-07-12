import Layout from "../components/layouts/Layout";
import AddToCartButton from "../components/cart/AddToCartButton";
import { withRouter } from 'next/router';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';

const Product = withRouter( props  => {

	const { product } = props;

	return (
		<Layout>
			{ product ? (
				<div>
					<h3 className="mt-5 mb-3 text-center">{product.name}</h3>
					<div className="products-wrapper">
						<div className="product-container" key={product.id}>
							<img className="product-image" src={product.image.sourceUrl} srcSet={product.image.srcSet} alt={ product.name }/>
							<h5 className="product-name">{product.name}</h5>
							<p className="product-price">{product.price}</p>
							<AddToCartButton product={ product } />
							<div className="product-description">{ product.description }</div>
						</div>
					</div>
				</div>
			) : '' }
		</Layout>

	)
} );

Product.getInitialProps = async function( context ) {

	let { query: { slug } } = context;
	const id = slug ? parseInt( slug.split('-').pop() ) : context.query.id;

	const PRODUCT_QUERY = gql`query Product( $id: Int! ) {
		productBy( productId: $id ) {
			name
			price
			slug
			description
			productId
			image {
				uri
				title
				srcSet
				sourceUrl
			}
		}
	}`;

	const res = await client.query({
		query: PRODUCT_QUERY,
		variables: { id }
	});

	return {
		product: res.data.productBy
	}
};

export default Product
