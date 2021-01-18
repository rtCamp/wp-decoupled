import Layout from '../src/components/layouts/Layout';
import Link from 'next/link';
import client from '../src/apollo/ApolloClient';
import AddToCartButton from '../src/components/cart/AddToCartButton';
import Hero from '../src/components/home/Hero';
import NextImage from '../src/components/image';
import { SubHeading, Paragraph } from '../src/components/typography';

import { PRODUCTS_QUERY } from '../src/queries';

const NewProducts = ({ products }) => {
    return (
        <div className="container mt-5">
            <SubHeading className="text-center mb-5">
                Products
            </SubHeading>
            {products.length ? (
                <div className="mt-2">
                    <div className="products-wrapper row">
                        {products.map((item) =>
                            // @TODO Need to add support for Group product.
                            undefined !== item && 'GroupProduct' !== item.__typename ? (
                                <div className="product-container col-md-3 mb-5" key={item.id}>
                                    {/* @TODO need to get rid of using databseId here. */}
                                    <Link href={`/product/${item.slug}`}>
                                        <a>
                                            <NextImage
                                                className="product-image"
                                                src={item.image.sourceUrl}
                                                alt={item.name}
                                                width="240"
                                                height="240"
                                            />
                                            <h5 className="product-name">{item.name}</h5>
                                            <Paragraph className="product-price">{item.price}</Paragraph>
                                        </a>
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
};

export default Index;
