import Layout from "../components/layouts/Layout";
import Link from 'next/link';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const Product = withRouter( props  => {

	const { product } = props;

	return (
		<Layout>
			{ product ? (
				<div>
					<h3>{product.name}</h3>
					<div className="products-wrapper">
						<div className="product-container" key={product.id}>
							<img className="product-image" src={product.images[0].src} alt={ product.name }/>
							<h5 className="product-name">{product.name}</h5>
							<p className="product-price">${product.price}</p>
							<Link href={`/product?id=${product.id}`}><a className="product-view-link">Buy</a></Link>
						</div>
					</div>
				</div>
			) : '' }
		</Layout>

	)
} );

Product.getInitialProps = async function( context ) {
	const siteUrl = process.env.SITE_URL;
	const productId = context.query.id;
	const res = await fetch(`http://localhost:3000/getProduct/${productId}`);
	const data = await res.json();

	return {
		product: data
	}
};

export default Product
