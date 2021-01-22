import Layout from '../src/components/layouts/Layout';
import Link from 'next/link';
import client from '../src/apollo/ApolloClient';
import AddToCartButton from '../src/components/cart/AddToCartButton';
import Hero from '../src/components/home/Hero';
import Categories from '../src/components/home/Categories';
import { PRODUCTS_QUERY, CATEGORIES_QUERY } from '../src/queries';

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
                                        <a>
                                            <span className="product-link">
                                                <img
                                                    className="product-image"
                                                    src={item.image.sourceUrl}
                                                    srcSet={item.image.srcSet}
                                                    alt={item.name}
                                                />
                                                <h5 className="product-name">{item.name}</h5>
                                                <p className="product-price">{item.price}</p>
                                            </span>
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
    const { products, categories } = props;
    console.log(products, categories)
    return (
        <Layout>
            <Hero />
            <Categories categories={categories}/>
            <NewProducts products={products} />
        </Layout>
    );
};

export async function getStaticProps() {
    const { data: products_data } = await client.query({
        query: PRODUCTS_QUERY
    });

    const { data: categories_data } = await client.query({
        query: CATEGORIES_QUERY
    });
    console.log(products_data, categories_data);
    return {
        props: {
            products: products_data.products.nodes,
            categories: categories_data.productCategories.nodes
        },
        revalidate: 1
    };
};

export default Index;
