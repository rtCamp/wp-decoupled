// External.
import Link from 'next/link';

// Internal.
import client from '../src/apollo/ApolloClient';
import AddToCartButton from '../src/components/cart/AddToCartButton';
import Hero from '../src/components/home/Hero';
import Image from '../src/components/Image';
import Layout from '../src/components/layouts/Layout';
import { PRODUCTS_QUERY } from '../src/queries';

const NewProducts = ({ products }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5">Products</h2>
            {products.length ? (
                <div className="mt-2">
                    <div className="products-wrapper row">
                        {products.map((item) =>
                            // @TODO Need to add support for Group product.
                            undefined !== item && 'GroupProduct' !== item.__typename ? (
                                <div className="product-container col-md-3 mb-5" key={item.id}>
                                    {/* @TODO need to get rid of using databseId here. */}
                                    <Link href={`/product/${item.slug}`}>
                                        <span className="product-link">
                                            <Image
                                                src={item?.image?.sourceUrl}
                                                alt={item?.image?.altText || item?.name}
                                            />
                                            <h5 className="product-name">{item.name}</h5>
                                            <p className="product-price">{item.price}</p>
                                        </span>
                                    </Link>
                                    <AddToCartButton product={item} />
                                </div>
                            ) : (
                                ''
                            )
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

const Index = (props) => {
    const { products } = props;

    return (
        <Layout>
            <Hero />
            {/*<Categories/>*/}
            <NewProducts products={products} />
        </Layout>
    );
};

export async function getStaticProps() {
    const { data } = await client.query({
        query: PRODUCTS_QUERY
    });
    return {
        props: {
            products: data.products.nodes
        },
        revalidate: 1
    };
}

export default Index;
