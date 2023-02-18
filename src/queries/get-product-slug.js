// External.
import { gql } from '@apollo/client';

// Internal.
import ProductFragment from './fragments/product';

export default gql`
    query GET_PRODUCT_SLUGS {
        products: products {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
    }
    ${ProductFragment}
`;
