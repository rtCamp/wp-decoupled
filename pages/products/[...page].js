import Products from '../../src/components/products';
import { getProductPageStaticProps } from '../../src/reusable-static-props';

const ProductsPage = ({ products }) => {
    return <Products products={products} />;
};

export const getStaticProps = getProductPageStaticProps;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export default ProductsPage;
