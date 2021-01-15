import Layout from '../../src/components/layouts/Layout';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import client from '../../src/apollo/ApolloClient';
import { 
    PRODUCT_QUERY,
    PRODUCT_SLUGS 
} from '../../src/queries';

const Product = (props) => {
    const {
        data: { product }
    } = props;

    return (
        <Layout>
            {product ? (
                <div className="mx-auto mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                className="product-image"
                                src={product?.image?.sourceUrl}
                                srcSet={product?.image?.srcSet}
                                alt={product?.name}
                            />
                        </div>
                        <div className="col-md-6">
                            <h1 className="product_title entry-title">{product?.name}</h1>
                            <p className="price">
                                <span className="woocommerce-Price-amount amount">
                                    {product?.price}
                                </span>
                            </p>
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                    <div className="product-container" key={product?.id}>
                        <div
                            className="product-description"
                            dangerouslySetInnerHTML={{ __html: product?.description }}
                        />
                    </div>
                </div>
            ) : (
                ''
            )}
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    let { slug } = params;

    const { data } = await client.query({
        query: PRODUCT_QUERY,
        variables: { slug }
    });

    return {
        props: {
            data: {
                product: data?.product
            }
        }
    };
}

export async function getStaticPaths() {

    const { data } = await client.query({
        query: PRODUCT_SLUGS
    });

    const pathsData = [];

    data.products.edges.map((product) => {
        pathsData.push({ params: { slug: `${product.node.slug}` } });
    });

    return {
        paths: pathsData,
        fallback: false
    };
}

export default Product;
