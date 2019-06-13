import Layout from '../components/layouts/Layout';
import Link from 'next/link';
import client from '../components/ApolloClient';
import gql from 'graphql-tag';
const img = require("../static/hero.jpg");

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

const Hero = () => (
	<div className="wp-block-cover alignfull hero text-center mb-5">
		<div className="wp-block-cover__inner-container">
			<h1 >Welcome</h1>
				<p className="has-text-color">Welcome to the WP Decoupled Demo page.</p>
				<p className="has-text-color">This is a frontend for a WooCommerce Store created with Next.js and WPGraphQL.</p>
		</div>
	</div>
);

const Categories = () => {
	return (
		<>
			<h2 className="text-center mb-4">Shop by Category</h2>
			<div className="woocommerce container">
				<ul className="products row mx-auto">
				<li className="product-category product first col-md-4">
					<Link as={`/`} href={`/`}><a className="">
						<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories.jpg" alt="Accessories" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories.jpg 801w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />		
						<h2 className="woocommerce-loop-category__title">
							Accessories <mark className="count">(4)</mark>		
						</h2>
					</a></Link>
				</li>
				<li className="product-category product col-md-4">
					<Link as={`/`} href={`/`}><a className="">
						<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies.jpg" alt="Hoodies" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies.jpg 800w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />		
						<h2 className="woocommerce-loop-category__title">
							Hoodies <mark className="count">(4)</mark>		
						</h2>
					</a></Link>
					</li>
				<li className="product-category product last col-md-4">
					<Link as={`/`} href={`/`}><a className="">
						<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts.jpg" alt="Tshirts" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts.jpg 801w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />		
						<h2 className="woocommerce-loop-category__title">
							Tshirts <mark className="count">(4)</mark>		
						</h2>
						</a></Link>
					</li>
				</ul>
			</div>
		</>
	);
}

const Index = ( props ) => {

	const { products } = props;

	return (
		<Layout>
			<Hero />
			<Categories />
			{ products.length ? (

				<div className="mt-2">
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

