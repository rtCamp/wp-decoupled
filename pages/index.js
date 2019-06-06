import Layout from '../components/layouts/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import config from './../client.config';

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
									<Link href={`/product?id=${item.productId}`}><a className="product-view-link">View</a></Link>
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
	const query = `query {
						products {
						nodes {
							id
							productId
							averageRating
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

	const result = await fetch( `${config.graphqlUrl}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query,
		})
	} );

	const data = await result.json();

	return {
		products: data.data.products.nodes
	}
};
export default Index;

