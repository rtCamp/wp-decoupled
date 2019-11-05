import Layout from "../components/layouts/Layout";
import AddToCartButton from "../components/cart/AddToCartButton";
import { AppProvider } from "../components/context/AppContext";
import { withRouter } from 'next/router';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';

const Product = withRouter(props => {

	const { product } = props;

	return (
		<Layout>
			{product ? (
				<div className="mx-auto mt-5">
					<div className="row">
						<div className="col-md-6">
							<img className="product-image" src={product.image.sourceUrl} srcSet={product.image.srcSet} alt={product.name} />
						</div>
						<div className="col-md-6">
						<h1 className="product_title entry-title">{product.name}</h1>
						<p className="price"><span className="woocommerce-Price-amount amount">{product.price}</span></p>
							<AddToCartButton product={product} />
						</div>
					</div>
					<div className="product-container" key={product.id}>
						<div className="product-description">{product.description}</div>
					</div>
				</div>
			) : ''}
		</Layout>

	)
});

Product.getInitialProps = async function (context) {
	let { query: { slug } } = context;
	const id = slug ? parseInt(slug.split('-').pop()) : context.query.id;

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
