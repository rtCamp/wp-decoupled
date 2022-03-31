import Layout from '../src/components/layouts/Layout';
import Hero from '../src/components/home/Hero';
import { getProductPageStaticProps } from '../src/reusable-static-props';
import Products from '../src/components/products';
import Link from 'next/link';

const Index = ({ products }) => {
    return (
        <Layout>
            <Hero />
            {/*<Categories/>*/}
            <Products paginationInfo={false} products={products} />

            <div className="wd-shop-button">
                <Link href={'/products'}>
                    <a className="btn btn-primary">All Products</a>
                </Link>
            </div>
        </Layout>
    );
};

export const getStaticProps = getProductPageStaticProps;

export default Index;
