// External.
import { gql } from '@apollo/client';

// Internal.
import ProductFragment from './fragments/product';

export default gql`
    query Product($slug: ID!) {
        product(id: $slug, idType: SLUG) {
            ...ProductFragment
        }
    }
    ${ProductFragment}
`;
