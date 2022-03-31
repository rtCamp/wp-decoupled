import Products from '../../src/components/products';
import Layout from '../../src/components/layouts/Layout';
import { getProductPageStaticProps } from '../../src/reusable-static-props';

const ProductsPage = ({ products, pageInfo }) => {
    return (
        <Layout>
            <Products paginationInfo={pageInfo} products={products} />
        </Layout>
    );
};

export const getStaticProps = getProductPageStaticProps;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export default ProductsPage;
