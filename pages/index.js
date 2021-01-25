import Layout from '../src/components/layouts/Layout';
import client from '../src/apollo/ApolloClient';
import Hero from '../src/components/home/Hero';
import Categories from '../src/components/home/Categories';
import Products from '../src/components/home/Products';
import { PRODUCTS_QUERY, CATEGORIES_QUERY } from '../src/queries';


const Index = (props) => {
    const { products, categories } = props;
    console.log(products, categories)
    return (
        <Layout>
            <Hero />
            <Categories categories={categories}/>
            <Products products={products} />
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
