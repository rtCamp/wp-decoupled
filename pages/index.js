import Layout from '../src/components/layouts/Layout';
import Link from 'next/link';
import client from '../src/apollo/ApolloClient';
import AddToCartButton from '../src/components/cart/AddToCartButton';
import Hero from '../src/components/home/Hero';
import Image from '../src/components/Image';
import { PRODUCTS_QUERY } from '../src/queries';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

const NewProducts = ({ products }) => {

    return (
        <>
            <NextSeo
                title="wp-decoupled seo title"
                description="wp-decoupled products description here."
                // @TODO The SEO data are dynamic, should later come from WordPress.
            />
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
                                        <Link href={`/product/${item?.slug}`}>
                                            <a>
                                                <span className="product-link">
                                                    <Image
                                                        src={item?.image?.sourceUrl}
                                                        alt={item?.image?.altText || item?.name}
                                                    />
                                                    <h5 className="product-name">{item?.name}</h5>
                                                    <p className="product-price">{item?.price}</p>
                                                </span>
                                            </a>
                                        </Link>
                                        <AddToCartButton product={item} />
                                    </div>
                                ) : (
                                    null
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    null
                )}
            </div>
        </>
    );
};

NewProducts.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            databaseId: PropTypes.integer,
            averageRating: PropTypes.integer,
            description: PropTypes.integer,
            id: PropTypes.string,
            image: PropTypes.object,
            name: PropTypes.integer,
            price: PropTypes.integer,
            slug: PropTypes.integer,
        })
    ),
}

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
};

export default Index;
