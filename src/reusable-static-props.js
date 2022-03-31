import client from './apollo/ApolloClient';
import { PRODUCTS_QUERY, READING_SETTINGS } from './queries';

const DEFAULT_PER_PAGE = 10;

export async function getProductPageStaticProps(context) {
    const { data: readingSettingsData } = await client.query({
        query: READING_SETTINGS
    });

    let page = parseInt(context?.params?.page);
    page = isNaN(page) || !page ? 1 : page;

    // Size needs to be perPage + 1
    const size = (readingSettingsData?.postsPerPage || DEFAULT_PER_PAGE) + 1;
    const offset = (size - 1) * (page - 1);

    const { data } = await client.query({
        query: PRODUCTS_QUERY,
        variables: {
            size,
            offset
        }
    });

    const pageInfo = data?.products?.pageInfo?.offsetPagination;
    pageInfo.perPage = parseInt(readingSettingsData?.postsPerPage);

    if (isNaN(pageInfo.perPage) || !pageInfo.perPage) {
        pageInfo.perPage = DEFAULT_PER_PAGE;
    }

    return {
        props: {
            products: data?.products?.nodes,
            pageInfo
        },
        revalidate: 1
    };
}
