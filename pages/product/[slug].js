import Layout from '../../src/components/layouts/Layout';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import client from '../../src/apollo/ApolloClient';
import Image from '../../src/components/Image';
import SocialShare from '../../src/components/social-share/SocialShare';

import { 
    PRODUCT_QUERY,
    PRODUCT_SLUGS 
} from '../../src/queries';

import { useRouter } from 'next/router'




const Product = ({data}) => {

    const { product } = data || {}

    const router = useRouter();


    const path = router.asPath; // url path: starts with backslash (/) 

    return (
        <Layout>
            {product ? (
                <div className="mx-auto mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <Image
                                src={product?.image?.sourceUrl}
                                alt={product?.image?.altText || product?.name}
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
                         <SocialShare path={path} />
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
        fallback: true
    };
}

export default Product;
