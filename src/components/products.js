import Layout from './layouts/Layout';
import Product from '../components/product';

const Products = ({ products }) => {
    return (
        <Layout>
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
        </Layout>
    );
};

export default Products;
