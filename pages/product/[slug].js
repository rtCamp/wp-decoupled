import gql from 'graphql-tag';

import Layout from '../../components/layouts/Layout';
import AddToCartButton from '../../components/cart/AddToCartButton';
import client from '../../components/ApolloClient';

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
    console.log('slug', slug);
    const id = slug ? parseInt(slug.split('-').pop()) : context.query.id;
    console.log('id', id);

    const PRODUCT_QUERY = gql`
        query Product($id: ID!) {
            product(id: $id, idType: DATABASE_ID) {
                id
                databaseId
                averageRating
                slug
                description
                image {
                    uri
                    title
                    srcSet
                    sourceUrl
                }
                name
                ... on SimpleProduct {
                    price
                    id
                }
                ... on VariableProduct {
                    price
                    id
                }
                ... on ExternalProduct {
                    price
                    id
                }
                ... on GroupProduct {
                    products {
                        nodes {
                            ... on SimpleProduct {
                                price
                            }
                        }
                    }
                    id
                }
            }
        }
    `;

    const { data } = await client.query({
        query: PRODUCT_QUERY,
        variables: { id }
    });
    console.log('data', data);
    return {
        props: {
            data: {
                product: data?.product
            }
        }
    };
}

export async function getStaticPaths() {
    const GET_PRODUCT_SLUGS = gql`
        query GET_PRODUCT_SLUGS {
            products: products {
                edges {
                    node {
                        id
                        databaseId
                        name
                        slug
                    }
                }
            }
        }
    `;

    const { data } = await client.query({
        query: GET_PRODUCT_SLUGS
    });

    const pathsData = [];

    console.warn('pathsData', pathsData);

    data.products.edges.map((product) => {
        pathsData.push({ params: { slug: `${product.node.slug}-${product.node.databaseId}` } });
    });

    return {
        paths: pathsData,
        fallback: false
    };
}

export default Product;
