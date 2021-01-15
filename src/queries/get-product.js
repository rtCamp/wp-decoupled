import gql from 'graphql-tag';
import ProductFragment from './fragments/product';

export default gql`
    query Product($slug: ID!) {
        product(id: $slug, idType: SLUG) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`;