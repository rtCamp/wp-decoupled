import client from './apollo/ApolloClient';
import { PRODUCTS_QUERY, READING_SETTINGS } from './queries';

export async function getProductPageStaticProps(context) {
    const { data: readingSettingsData } = await client.query({
        query: READING_SETTINGS
    });

    let page = parseInt(context?.params?.page);
    page = isNaN(page) || !page ? 1 : page;

    // Size needs to be perPage + 1
    const size = (readingSettingsData?.postsPerPage || 10) + 1;
    const offset = (size - 1) * (page - 1);

    const { data } = await client.query({
        query: PRODUCTS_QUERY,
        variables: {
            size,
            offset
        }
    });

    return {
        props: {
            products: data?.products?.nodes,
            pageInfo: data?.products?.pageInfo?.offsetPagination
        },
        revalidate: 1
    };
}
