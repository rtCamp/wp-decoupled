import Link from 'next/link';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { Component } from 'react';

/**
 * GraphQL products query
 */
const PRODUCTS_QUERY = gql`query {
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

class Products extends Component {

	state = {
		products: [],
	};

	componentDidMount() {
		this.getProducts();
	};

	getProducts = async () => {
		const { client } = this.props;
		const result = await client.query({
			query: PRODUCTS_QUERY,
		});
		const products = result.data.products.nodes;

		this.setState({ products });
	};

	render() {

		const { products } = this.state;

		return (
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
		);
	}
}

export default compose(
	withApollo
)(Products);
