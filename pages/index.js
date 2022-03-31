import Layout from '../src/components/layouts/Layout';
import client from '../src/apollo/ApolloClient';
import Hero from '../src/components/home/Hero';
import { PRODUCTS_QUERY } from '../src/queries';
import Product from '../src/components/product';

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
                                <Product key={item.id} item={item} />
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
