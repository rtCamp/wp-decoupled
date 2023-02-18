// External.
import { gql } from '@apollo/client';

// Internal.
import ProductFragment from './fragments/product';

export default gql`
    query {
        products(first: 50) {
            nodes {
                ...ProductFragment
            }
        }
    }
    ${ProductFragment}
`;
