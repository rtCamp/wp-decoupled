import Layout from '../components/layouts/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';


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
									<img className="product-image" src={item.images[0].src} alt={ item.name }/>
									<h5 className="product-name">{item.name}</h5>
									<p className="product-price">${item.price}</p>
									<Link href={`/product?id=${item.id}`}><a className="product-view-link">View</a></Link>
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
	const siteUrl = process.env.SITE_URL;
	const result = await fetch( `${siteUrl}/getProducts` );
	const data = await result.json();

	return {
		products: data
	}
};
export default Index;

