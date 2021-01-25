import Layout from '../../src/components/layouts/Layout';
import client from '../../src/apollo/ApolloClient';
import { 
    CATEGORY_QUERY,
    CATEGORY_SLUGS
} from '../../src/queries';
import Products from '../../src/components/home/Products';

const Category = ({data}) => {

    const { category } = data || {}

    return (
        <Layout>
            <div className="category-container mb-5">
                <h1 className="category-name">
                    {category.name} <mark className="count">({category.count})</mark>
                </h1>
            </div>
            <Products products={category.products.nodes} />            
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    let { slug } = params;

    const { data } = await client.query({
        query: CATEGORY_QUERY,
        variables: { slug }
    });

    return {
        props: {
            data: {
                category: data?.productCategory
            }
        }
    };
}

export async function getStaticPaths() {

    const { data } = await client.query({
        query: CATEGORY_SLUGS
    });

    const pathsData = [];
    data.productCategories.nodes.map((product) => {
        console.log(product);
        pathsData.push({ params: { slug: `${product.slug}` } });
    });

    return {
        paths: pathsData,
        fallback: true
    };
}

export default Category;
